// ─── Game Engine: Quiz Logic, Scoring, Transitions ──────────────────────────
// Timeline per question:
//   t=0s   — User taps answer, effects play (bounce/shake, confetti, sound)
//   t=0.5s — Popup slides down from top
//   t=3s   — Question fades out and next question slides in underneath popup
//   t=4s   — Popup auto-slides back up

const GameEngine = {
    currentQuestion: null,
    score: 0,
    isProcessing: false,
    _popupTimer: null,
    _audioPaths: null,
    _audioPool: {},   // pre-created Audio elements keyed by name

    init(config) {
        this.config = config;
        this.score = 0;
        this.currentQuestionIndex = 0;
        this.isProcessing = false;
        // Cache audio paths (nested under project.global_audio in YAML)
        this._audioPaths = config.project?.global_audio || {};
        // Pre-create & unlock Audio objects so they work outside user-gesture
        this._audioPool = {};
        for (const [key, src] of Object.entries(this._audioPaths)) {
            if (src) {
                const a = new Audio(src);
                a.preload = 'auto';
                a.volume = 1;
                // "Unlock" on iOS/Android: play a silent blip from user gesture context
                a.play().then(() => a.pause()).catch(() => {});
                a.currentTime = 0;
                this._audioPool[key] = a;
            }
        }
    },

    startQuiz() {
        if (!this.config || !this.config.quiz_game) return;
        Screens.quiz.classList.add('active');
        this.loadQuestion(0);
    },

    // ── Render a question into the DOM ────────────────────────────────────────
    loadQuestion(index) {
        const questions = this.config.quiz_game.questions;
        if (index >= questions.length) { this.endQuiz(); return; }

        const q = questions[index];
        this.currentQuestion = q;
        this.currentQuestionIndex = index;
        this.isProcessing = false;

        document.getElementById('ui-quiz-question').textContent = q.question;

        const box = document.getElementById('ui-quiz-options');
        box.innerHTML = '';
        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'btn-option';
            btn.textContent = opt;
            btn.addEventListener('click', () => this.handleAnswer(idx, btn));
            box.appendChild(btn);
        });

        // Progress bar
        const pct = ((index + 1) / questions.length) * 100;
        document.getElementById('ui-quiz-progress').style.width = pct + '%';
    },

    // ── User taps an answer ───────────────────────────────────────────────────
    handleAnswer(selectedIndex, btnEl) {
        if (this.isProcessing) return;
        this.isProcessing = true;

        const q    = this.currentQuestion;
        const ok   = selectedIndex === q.correct_index;
        const opts = document.getElementById('ui-quiz-options');
        const btns = opts.querySelectorAll('.btn-option');

        // Lock all buttons
        btns.forEach(b => (b.disabled = true));

        // ── Immediate feedback ────────────────────────────────────────────────
        if (ok) {
            this.score++;
            btnEl.classList.add('correct');
            this.playAudio('correct_sfx');
            this.createConfetti();
        } else {
            btnEl.classList.add('incorrect');
            this.playAudio('incorrect_sfx');
            if (navigator.vibrate) navigator.vibrate(200);
            // Reveal correct answer after a beat
            setTimeout(() => btns[q.correct_index].classList.add('correct'), 400);
        }

        // ── t ≈ 0.5 s → popup slides down ───────────────────────────────────────
        setTimeout(() => this.showPopup(ok), 500);

        // ── t ≈ 3 s → swap to next question underneath ───────────────────────
        setTimeout(() => this.swapQuestion(), 3000);

        // ── t ≈ 4 s → popup slides back up ───────────────────────────────────
        if (this._popupTimer) clearTimeout(this._popupTimer);
        this._popupTimer = setTimeout(() => this.hidePopup(), 4000);
    },

    // ── Popup (slides from top of viewport) ──────────────────────────────────
    showPopup(isCorrect) {
        const popup = document.getElementById('quiz-popup');
        const title = document.getElementById('ui-popup-title');
        const msg   = document.getElementById('ui-popup-message');
        const expl  = document.getElementById('ui-popup-explanation');

        title.textContent = isCorrect ? 'Chính xác!' : 'Rất tiếc!';
        msg.textContent   = isCorrect
            ? this.currentQuestion.success_message
            : this.currentQuestion.error_message;
        expl.textContent  = this.currentQuestion.explanation || '';

        if (isCorrect) this.playAudio('chime_sfx');

        // Reset to hidden state, force reflow, then animate in
        popup.className = 'quiz-popup ' + (isCorrect ? 'correct' : 'incorrect');
        void popup.offsetHeight;   // ← commit hidden position
        popup.classList.add('show');
    },

    hidePopup() {
        document.getElementById('quiz-popup').classList.remove('show');
    },

    // ── Swap question with fade-out → slide-in ───────────────────────────────
    swapQuestion() {
        const main  = document.querySelector('.quiz-main');
        const next  = this.currentQuestionIndex + 1;

        main.classList.add('fade-out');

        setTimeout(() => {
            main.classList.remove('fade-out');

            if (next >= this.config.quiz_game.questions.length) {
                this.hidePopup();
                this.endQuiz();
                return;
            }

            this.loadQuestion(next);
            main.classList.add('slide-in');
            setTimeout(() => main.classList.remove('slide-in'), 400);
        }, 400);
    },

    // ── Audio helper ─────────────────────────────────────────────────────────
    playAudio(key) {
        try {
            if (isMuted) return;
            const a = this._audioPool[key];
            if (!a) return;
            a.currentTime = 0;
            a.play().catch(() => {});
        } catch (e) { /* never crash */ }
    },

    // ── Confetti ─────────────────────────────────────────────────────────────
    createConfetti() {
        const colors = ['#d4af37', '#8b0000', '#c4707a', '#b5763a'];
        for (let i = 0; i < 30; i++) {
            const el = document.createElement('div');
            el.className = 'confetti';
            el.style.left = Math.random() * 100 + 'vw';
            el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            const dur = 1 + Math.random();
            const del = Math.random() * 0.5;
            el.style.animation = `fall ${dur}s ${del}s linear forwards`;
            document.body.appendChild(el);
            setTimeout(() => el.remove(), (dur + del) * 1000);
        }
    },

    // ── End quiz ─────────────────────────────────────────────────────────────
    endQuiz() {
        this.hidePopup();

        // Step 1: Quiz slides back DOWN to bottom (~0.5s)
        Screens.quiz.classList.remove('active');            // triggers CSS translateY(100%)

        setTimeout(() => {
            // Step 2: Prep end screen content while quiz is sliding down
            this.renderEndScreen();

            // Step 3: End screen slides UP from bottom (~1s per flow.md)
            Screens.end.classList.add('active');

            // Step 4: Badge animation after end screen has mostly arrived
            setTimeout(() => this.runBadgeAnimation(), 800);
        }, 600);
    },

    // ── End screen rendering ───────────────────────────────────────────────────
    renderEndScreen() {
        const es = this.config.endscreen;
        const total = this.config.quiz_game.questions.length;

        document.getElementById('ui-end-title').textContent   = es.title;
        document.getElementById('ui-end-message').textContent = es.message;
        document.getElementById('ui-end-score').textContent   = `${this.score} / ${total} câu đúng`;

        const btnShare   = document.getElementById('btn-share');
        const btnReplay  = document.getElementById('btn-replay');
        const shareLabelEl = document.getElementById('btn-share-text');
        if (shareLabelEl) shareLabelEl.textContent = es.share_button;
        btnReplay.textContent = es.replay_button;

        // Share — 3-tier fallback:
        //  1. navigator.share  (native OS share sheet, requires HTTPS)
        //  2. Facebook sharer URL (works on any protocol, any device)
        //  3. clipboard copy (last resort)
        const shareUrl  = location.href;
        const shareMsg  = es.share_text || es.title;
        const fbUrl     = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareMsg)}`;

        btnShare.onclick = () => {
            if (navigator.share) {
                navigator.share({ title: es.title, text: shareMsg, url: shareUrl })
                    .catch(() => window.open(fbUrl, '_blank', 'noopener'));
            } else {
                const popup = window.open(fbUrl, 'fb-share', 'width=580,height=400,noopener');
                if (!popup) {
                    navigator.clipboard.writeText(shareUrl)
                        .then(() => this.showToast(es.share_fallback_button || 'Đã sao chép liên kết!'))
                        .catch(() => {});
                }
            }
        };

        // Replay — reload page
        btnReplay.onclick = () => location.reload();

        // Prepare badge images (use first badge SVG as the unified badge)
        const badgeSrc = this.config.quiz_game.questions[0]?.badge || 'assets/icons/badge-01.svg';
        const makeImg = () => { const i = new Image(); i.src = badgeSrc; return i; };

        document.getElementById('badge-left').innerHTML  = '';
        document.getElementById('badge-right').innerHTML = '';
        document.getElementById('badge-full').innerHTML  = '';
        document.getElementById('badge-left').appendChild(makeImg());
        document.getElementById('badge-right').appendChild(makeImg());
        document.getElementById('badge-full').appendChild(makeImg());
    },

    // ── Badge assembly sequence ───────────────────────────────────────────────
    runBadgeAnimation() {
        const left   = document.getElementById('badge-left');
        const right  = document.getElementById('badge-right');
        const full   = document.getElementById('badge-full');
        const glow   = document.getElementById('badge-glow');
        const wreath = document.querySelector('.wreath-bg');

        // Step 0: Wreath spins in behind
        if (wreath) wreath.classList.add('animate');

        // Step 1: Halves fly in from edges
        left.classList.add('animate');
        right.classList.add('animate');

        // Step 2: Merge → glow + full badge bounce
        setTimeout(() => {
            glow.classList.add('animate');
            left.style.opacity = '0';
            right.style.opacity = '0';
            full.classList.add('animate');
            this.playAudio('chime_sfx');
            this.createConfetti();
        }, 650);

        // Step 3: Polaroids drop in staggered
        document.querySelectorAll('.polaroid').forEach(p => p.classList.add('animate'));
    },

    showToast(msg) {
        let t = document.querySelector('.toast');
        if (!t) {
            t = document.createElement('div');
            t.className = 'toast';
            document.body.appendChild(t);
        }
        t.textContent = msg;
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 2500);
    }
};
