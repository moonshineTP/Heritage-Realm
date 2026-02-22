// Handles DOM manipulation, screen switching, and transitions
const UI = {
    switchScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    },
    
    curtainTransition(callback) {
        const curtain = document.createElement('div');
        curtain.className = 'curtain';
        document.body.appendChild(curtain);
        
        // Trigger animation
        setTimeout(() => curtain.classList.add('active'), 10);
        
        setTimeout(() => {
            callback();
            curtain.classList.remove('active');
            setTimeout(() => curtain.remove(), 500);
        }, 500);
    }
};
