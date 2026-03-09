# Dấu Di Sản

Dấu Di Sản là một web app mobile-first chạy ngay trong trình duyệt, được kích hoạt bằng QR code tại bảo tàng. Người tham quan scan mã, đi qua hành trình kể chuyện tại từng khu trưng bày, trả lời câu hỏi ngắn, và nhận huy hiệu số khi hoàn thành.

---

## Tính năng đã triển khai

- **Loading screen** — nền đỏ gạch ấn tượng, logo pulse, thanh tiến trình, tải dữ liệu từ `flow.yaml`
- **Curtain Intro** — hiệu ứng màn nhung tách đôi mượt mà khi bắt đầu, nền ảnh với overlay text
- **Story Slides** — vuốt/bấm mũi tên để chuyển slide, ảnh parallax, text kể chuyện serif, audio tự động phát theo từng khu
- **Audio Toggle** — nút bật/tắt âm thanh với icon SVG inline, đồng bộ với trạng thái audio
- **Challenge Screen** — màn hình chờ trước quiz, cùng phong cách Curtain Intro
- **Quiz Overlay** — giao diện trượt lên từ dưới đè lên nền blur, thanh tiến trình, popup giải thích đáp án
- **Micro-interactions** — nút bấm glow/breathe, rung (haptic) + chớp đỏ khi sai, confetti + âm thanh khi đúng
- **Badge Assembly** — animation hai mảnh ghép bay vào từ hai bên, hội tụ, lóe sáng, nảy bounce thành huy hiệu hoàn chỉnh
- **End Screen** — ảnh polaroid bay vào từ hai phía, điểm số, tiêu đề kết thúc, nút share và replay
- **Chia sẻ Facebook** — Web Share API (mobile) với fallback sao chép liên kết
- **Orientation Guard** — cảnh báo khi xoay ngang, tự động ẩn khi quay về chế độ dọc
- **Offline Toast** — phát hiện mất kết nối và thông báo gracefully
- **QR Display Page** — `qr.html` tách biệt để chiếu trên màn hình lớn tại bảo tàng

---

## Stack kỹ thuật

| Thành phần | Công nghệ |
|---|---|
| Markup | HTML5 semantic |
| Style | CSS3 — Variables, Keyframes, Flexbox, `backdrop-filter` |
| Logic | Vanilla JavaScript ES6+ (không framework) |
| YAML parser | [js-yaml 4.1](https://cdnjs.com/libraries/js-yaml) via CDN |
| Font | Times New Roman (serif) + Segoe UI (sans-serif) |
| Audio | HTML5 Audio API |
| Chia sẻ | Web Share API + Clipboard API fallback |

---

## Triết lý thiết kế

Người dùng đang đứng tại bảo tàng, một tay cầm điện thoại. Mọi quyết định thiết kế đều xuất phát từ điều đó: ít chữ, ít bước, load nhanh, không cần hướng dẫn.

Không gian thị giác lấy cảm hứng từ miền Trung Việt Nam thời trung cận đại - gam màu giấy dó, đồng am, gạch đỏ cung đình - nhưng được trình bày theo phong cách trẻ trung, upbeat, unisex để thu hút Gen Z và Millennials.

---

## Cấu trúc dự án (Open-Closed Principle)

Dự án được thiết kế theo nguyên tắc **tách biệt hoàn toàn nội dung và logic code**.
- **Logic (HTML/CSS/JS):** Đóng (Closed) — không thay đổi khi thêm/bớt khu trưng bày.
- **Nội dung (YAML/Assets):** Mở (Open) — đội nội dung tự chỉnh sửa `flow.yaml` và thư mục `assets/` mà không cần động vào code.

```text
heritage-game/
├── index.html                  # SPA shell
├── qr.html                     # Trang tĩnh hiển thị QR code trên màn hình lớn tại bảo tàng
├── flow.yaml                   # File cấu hình nội dung toàn bộ hành trình
├── css/
│   ├── main.css                # Global styles, CSS variables, theme, mobile-first reset
│   └── components.css          # UI components: curtain, story, quiz overlay, badge, end screen
├── js/
│   ├── app.js                  # State machine chính (loading → intro → story → quiz → end)
│   ├── config.js               # YAML loader (fetch + js-yaml parse)
│   ├── ui.js                   # DOM rendering, curtain transition, swipe/parallax, audio
│   ├── game.js                 # Quiz engine: câu hỏi, chấm điểm, confetti, badge animation
│   └── share.js                # Web Share API + clipboard fallback
├── assets/
│   ├── audio/
│   │   ├── zone-01-story.mp3   # Audio kể chuyện từng khu
│   │   ├── zone-02-story.mp3
│   │   ├── zone-03-story.mp3
│   │   ├── correct.mp3         # SFX đúng
│   │   ├── incorrect.mp3       # SFX sai
│   │   └── fanfare.mp3         # SFX kết thúc
│   ├── icons/
│   ├── images/
│   │   ├── qr-code.png         # Ảnh QR hiển thị trên qr.html
│   │   ├── zone-01-thumb.jpg   # Thumbnail từng khu
│   │   ├── zone-02-thumb.jpg
│   │   ├── zone-03-thumb.jpg
│   │   ├── polaroid-01.png     # Ảnh polaroid trang kết thúc
│   │   ├── polaroid-02.png
│   │   └── polaroid-03.png
│   └── slides/                 # Ảnh minh hoạ từng slide (thêm theo flow.yaml)
├── scripts/
│   ├── download_images.py            # Tải ảnh placeholder từ nguồn mở
│   ├── download_endscreen_assets.py  #
│   ├── generate_content_assets.py    # Tạo asset nội dung tự động
│   └── generate_logo.py              # Tạo logo SVG
├── flow.md                     # Mô tả luồng trải nghiệm dạng văn bản
├── kickoff.md                  # Bối cảnh, insight và phạm vi dự án
├── AGENTS.md                   # Hướng dẫn cho AI Agent
└── README.md                   # Tài liệu này
```

---

## Cách chạy & triển khai

### Chạy local

Vì `flow.yaml` được tải qua `fetch()`, trình duyệt cần một HTTP server — **không mở trực tiếp file `index.html` bằng `file://`**.

**Cách đơn giản nhất (Python):**
```bash
# Trong thư mục heritage-game/
python -m http.server 8080
# Mở: http://localhost:8080
```

**Hoặc dùng VS Code Live Server** (extension `ritwickdey.LiveServer`):
- Nhấp chuột phải vào `index.html` → *Open with Live Server*

---

### Triển khai lên GitHub Pages

GitHub Pages phục vụ tĩnh hoàn toàn — không cần cấu hình server, không cần build step.

**Bước 1 — Push code lên GitHub:**
```bash
git init
git add .
git commit -m "feat: initial prototype"
git remote add origin https://github.com/<username>/<repo-name>.git
git push -u origin main
```

**Bước 2 — Bật GitHub Pages:**
1. Vào repo trên GitHub → **Settings** → **Pages**
2. Mục *Source*: chọn **Deploy from a branch**
3. Branch: `main` / Folder: `/ (root)` → **Save**

**Bước 3 — Truy cập:**
```
https://<username>.github.io/<repo-name>/
```

> **Lưu ý QR code:** Sau khi có URL GitHub Pages, cập nhật `assets/images/qr-code.png` (hoặc giá trị `qr_screen.qr_image` trong `flow.yaml`) thành QR trỏ đúng URL đó. Trang `qr.html` sẽ hiển thị mã này trên màn hình lớn tại bảo tàng.

---

## Tuỳ chỉnh nội dung

Mọi nội dung — tên khu, text kể chuyện, câu hỏi quiz, đáp án, huy hiệu, âm thanh — đều được cấu hình trong **`flow.yaml`**. Không cần chỉnh sửa HTML hoặc JS.

Ví dụ thêm một khu trưng bày mới:
```yaml
zones:
  - id: "zone-04"
    order: 4
    name: "Khu Lăng Tẩm"
    thumbnail: "assets/images/zone-04-thumb.jpg"
    slides:
      - image: "assets/slides/slide-04.jpg"
        text: "Hệ thống lăng tẩm của các vua Nguyễn..."
        audio: "assets/audio/zone-04-story.mp3"
```

Tương ứng thêm câu hỏi trong `quiz_game.questions` và đặt file audio + ảnh vào thư mục `assets/`.

---