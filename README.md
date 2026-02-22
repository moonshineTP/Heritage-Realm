# Dấu Di Sản

**Trải nghiệm di sản tương tác — scan QR, không cần cài app.**

Dấu Di Sản là một web app mobile-first chạy ngay trong trình duyệt, được kích hoạt bằng QR code tại bảo tàng. Người tham quan scan mã, theo dõi hành trình kể chuyện tại từng khu trưng bày, trả lời câu hỏi ngắn, và nhận huy hiệu số khi hoàn thành.

> Một lần scan. Chỉ cần điện thoại.

---

## Tính năng

- **QR entry** — truy cập tức thì từ mã QR đặt tại bảo tàng
- **Hành trình có dẫn dắt** — bản đồ các khu + thứ tự tham quan gợi ý
- **Story tại từng điểm** — audio, video, và text tại mỗi khu trưng bày
- **Mini game** — câu hỏi ngắn sau mỗi điểm tham quan
- **Huy hiệu số** — phần thưởng khi hoàn thành hành trình
- **Chia sẻ Facebook** — share kết quả trực tiếp từ trang kết thúc

---

## Triết lý thiết kế

Người dùng đang đứng tại bảo tàng, một tay cầm điện thoại. Mọi quyết định thiết kế đều xuất phát từ điều đó: ít chữ, ít bước, load nhanh, không cần hướng dẫn.

Dự án không cố trở thành platform. Nó làm tốt một việc duy nhất — biến một lần tham quan thành một trải nghiệm có bắt đầu, có kết thúc, và đáng nhớ.

---

## Cấu trúc dự án (Open-Closed Principle)

Dự án được thiết kế theo nguyên tắc **tách biệt hoàn toàn nội dung và logic code**. 
- **Logic (HTML/CSS/JS):** Đóng (Closed) - Không thay đổi khi thêm/bớt khu trưng bày.
- **Nội dung (YAML/Assets):** Mở (Open) - Khách hàng tự do chỉnh sửa file `flow.yaml` và thư mục `assets/` mà không cần biết code.

```text
heritage-game/
├── qr.html             # Trang tĩnh hiển thị QR code trên màn hình lớn tại bảo tàng
├── index.html          # Entry point duy nhất cho mobile (SPA shell)
├── flow.yaml           # File cấu hình nội dung toàn bộ hành trình (CLIENT EDITS HERE)
├── css/
│   ├── main.css        # Global styles, variables (mobile-first)
│   └── components.css  # Styles cho UI components (curtain, cards, quiz)
├── js/
│   ├── app.js          # Main initialization & state management
│   ├── config.js       # YAML parser & data loader
│   ├── ui.js           # DOM manipulation & transitions (curtain, swipe)
│   ├── game.js         # Quiz logic engine
│   └── share.js        # Facebook Share API integration
├── assets/             # Thư mục chứa media (CLIENT UPLOADS HERE)
│   ├── audio/          # File âm thanh kể chuyện (.mp3)
│   ├── icons/          # SVG icons, huy hiệu số
│   ├── images/         # Ảnh thumbnail các khu, background
│   └── slides/         # Ảnh bản đồ/sơ đồ tham quan
├── README.md           # Tài liệu giới thiệu dự án
├── kickoff.md          # Bối cảnh, insight và phạm vi dự án
└── AGENTS.md           # Hướng dẫn cho AI Agent
```

---

## Trạng thái

Dự án đang ở giai đoạn **wireframe**. Xem [kickoff.md](kickoff.md) để biết thêm bối cảnh và định hướng.
