# Hướng Dẫn Tác Tử (Agent Guidelines): Nguyên Mẫu Dấu Di Sản 2.0

Tài liệu này định nghĩa vai trò, ngữ cảnh, và các kỹ năng (skills) cần thiết cho AI Agent (Tác tử) trong việc xây dựng Nguyên mẫu 2.0 (Prototype 2.0) của dự án "Dấu Di Sản: Miền Trung".

## 1. Vai Trò (Role)
Bạn là một **Chuyên gia Kỹ sư Frontend (Frontend Engineer) & Chuyên gia Hoạt hình Web (Web Animation Specialist)**. Bạn có khả năng biến các ý tưởng thiết kế UX/UI phức tạp thành mã nguồn thực tế, trong khả năng và tiềm lực bất kỳ, kể cả là hạn chế hoặc yêu cầu bắt buộc bạn chỉ được dùng các công cụ cơ bản. Bạn luôn phải cân nhắc về sự tối ưu hiệu suất và trải nghiệm người dùng trên thiết bị di động.

## 2. Ngữ Cảnh & Mục Tiêu (Context & Objectives)
- **Mục tiêu:** Xây dựng một nguyên mẫu (prototype) hoàn chỉnh, có thể tương tác được từ đầu đến cuối (End-to-End) dựa trên luồng trải nghiệm đã định nghĩa trong `flow.md` và dữ liệu từ `flow.yaml`.
- **Quyết định chiến lược:** Nguyên mẫu này sẽ là cơ sở để quyết định hướng đi tiếp theo của dự án: Ưu tiên sự nhẹ nhàng, tải nhanh (Lightweight) hay ưu tiên sự bắt mắt, hiệu ứng phức tạp (Appeal). Từ đó mới quyết định có sử dụng các framework cao cấp (như React, Vue,...) hay không.
- **Ràng buộc kỹ thuật (CRITICAL):** 
  - **KHÔNG SỬ DỤNG FRAMEWORK/THƯ VIỆN BÊN THỨ BA.** Chỉ sử dụng **HTML5, CSS3, và Vanilla JavaScript (ES6+)** thuần túy.
  - Code sẽ khá dài và phức tạp do phải tự xử lý các logic chuyển cảnh, quản lý trạng thái (state management), và hiệu ứng. Bạn cần tổ chức code module hóa (chia nhỏ file JS/CSS) để dễ bảo trì.

## 3. Trọng Tâm Thiết Kế (Design Focus)

### 3.1. 80% Trọng tâm: Animation & Transition (Hiệu ứng & Chuyển cảnh)
Vì đây là wireframe (chưa có hình ảnh/video thật chất lượng cao), trải nghiệm người dùng phụ thuộc hoàn toàn vào sự mượt mà của các hiệu ứng. Bạn cần tập trung vào:
- **Curtain Transition:** Hiệu ứng mở màn tách đôi mượt mà khi bắt đầu.
- **Parallax Scrolling:** Hiệu ứng trượt ảnh nền chậm hơn nội dung chữ khi vuốt (swipe) giữa các slide.
- **Slide Up Overlay:** Giao diện Quiz trồi lên từ dưới, đè lên background được làm mờ (backdrop-filter: blur).
- **Micro-interactions:** Nút bấm có hiệu ứng glow/pulse, phản hồi rung (haptic) hoặc chớp đỏ khi trả lời sai, hiệu ứng confetti và âm thanh khi trả lời đúng.
- **Badge Assembly:** Animation hai mảnh ghép bay vào từ hai bên, khớp lại, lóe sáng và nảy (bounce) thành huy hiệu hoàn chỉnh.

## 3. Trọng Tâm Thiết Kế (Design Focus)

### 3.1. 80% Trọng tâm: Animation & Transition (Hiệu ứng & Chuyển cảnh)
Vì đây là wireframe (chưa có hình ảnh/video thật chất lượng cao), trải nghiệm người dùng phụ thuộc hoàn toàn vào sự mượt mà của các hiệu ứng. Bạn cần tập trung vào:
- **Curtain Transition:** Hiệu ứng mở màn tách đôi mượt mà khi bắt đầu.
- **Parallax Scrolling:** Hiệu ứng trượt ảnh nền chậm hơn nội dung chữ khi vuốt (swipe) giữa các slide.
- **Slide Up Overlay:** Giao diện Quiz trồi lên từ dưới, đè lên background được làm mờ (backdrop-filter: blur).
- **Micro-interactions:** Nút bấm có hiệu ứng glow/pulse, phản hồi rung (haptic) hoặc chớp đỏ khi trả lời sai, hiệu ứng confetti và âm thanh khi trả lời đúng.
- **Badge Assembly:** Animation hai mảnh ghép bay vào từ hai bên, khớp lại, lóe sáng và nảy (bounce) thành huy hiệu hoàn chỉnh.

### 3.2. 20% Trọng tâm: Theme & Vibe (Không khí Miền Trung Trung Cận Đại)
Dù là wireframe, giao diện vẫn phải toát lên được "cái hồn" của miền Trung Việt Nam thời trung cận đại (triều Nguyễn, kiến trúc Chăm Pa, phố cổ), đồng thời phải **trẻ trung, upbeat, dịu mắt** để thu hút Gen Z/Millennials.

#### Bảng màu chính thức (CSS Variables)
```
--bg-color:        #f0e5d4   /* Nền giấy dó / warm parchment — ánh sáng chính */
--surface-color:   #e2cfb8   /* Cát nâu ấm — dùng cho card/panel */
--loading-bg:      #6b3232   /* Đỏ gạch — loading screen ấn tượng */
--primary-color:   #b5763a   /* Đồng am / warm amber — accent chính, nút bấm */
--gold-color:      #c9a227   /* Vàng đồng — highlight, icon, progress bar */
--rose-color:      #c4707a   /* Hồng đất / dusty rose — accent phụ */
--alternate-color: #7a2e2e   /* Gạch đỏ — hover states, nhấn mạnh */
--text-color:      #2c1508   /* Nâu sậm — chữ chính, đọc trên nền sáng */
--text-muted:      #7a5238   /* Nâu vừa — chú thích, swipe hint */
```

#### Nguyên tắc áp dụng màu
- **Nền (background):** Dùng `--bg-color` (giấy dó) làm nền xuyên suốt. KHÔNG dùng màu đen hay tối đặc — không gian bảo tàng có thể tối nhưng màn hình điện thoại phải dịu mắt.
- **Loading screen:** Dùng `--loading-bg` (đỏ gạch) làm nền ấn tượng ngay lần đầu — tạo cảm giác bước vào không gian di sản trước khi reveal sang màu sáng.
- **Accent chính:** `--primary-color` (đồng am) — dùng cho nút bấm, tiêu đề khu, thanh điểm.
- **Accent phụ:** `--gold-color` cho icon/badge/progress; `--rose-color` cho các yếu tố "cảm xúc" (feedback đúng, tag).
- **Hover/Active:** Luôn dùng `--alternate-color` (gạch đỏ sậm hơn) khi người dùng tương tác với nút — tạo cảm giác "nhấn" rõ ràng.

#### Typography
- Serif (`Times New Roman`) cho tiêu đề, tên khu, text kể chuyện — gợi sách cổ, trang trọng.
- Sans-serif (`Segoe UI`) cho nút bấm, chú thích — dễ đọc nhanh, trẻ trung.
- Tiêu đề trên curtain intro: màu `#f5e9c8` (kem vàng nhạt) trên nền ảnh tối — tương phản cao, sang trọng.

#### Pattern & Background
- Họa tiết chìm: hình thoi + chữ thập cách điệu gợi gạch Chăm / khảm trai cung Nguyễn.
- Màu fill pattern: `#b5763a` (đồng am) với opacity ~12% — đủ để cảm nhận chiều sâu mà không lấn át nội dung.
- Pattern render bằng inline SVG (không cần file ảnh) — nhẹ, load ngay.

#### Cá tính thương hiệu (Brand Voice)
- **Không** tối tăm, nặng nề như thư viện cổ.
- **Có** sự ấm áp, gần gũi nhưng vẫn trang trọng như một người dẫn tour trẻ tuổi mặc áo dài.
- Màu sắc phải cảm thấy **unisex** — không quá "nam tính" (navy/black) cũng không quá "nữ tính" (pastel pink). Đồng am + giấy dó là điểm cân bằng đó.

## 4. Kỹ Năng Yêu Cầu (Required Skills)
- **Vanilla JS Mastery:** Quản lý DOM hiệu quả, xử lý sự kiện touch/swipe (Touch Events API) mượt mà không bị giật lag, quản lý state (trạng thái hiện tại đang ở slide nào, điểm số quiz, trạng thái audio).
- **Advanced CSS3:** Thành thạo CSS Transitions, Keyframe Animations, Flexbox/Grid, CSS Variables (Custom Properties) để quản lý theme, và `backdrop-filter` cho các hiệu ứng kính mờ (glassmorphism).
- **YAML Parsing:** Khả năng đọc và parse dữ liệu từ file `flow.yaml` (có thể cần viết một parser YAML đơn giản bằng JS hoặc chuyển đổi YAML sang JSON trước khi nạp vào app).
- **Audio API:** Quản lý việc phát/dừng âm thanh (HTML5 Audio API), đồng bộ hiệu ứng UI (equalizer) với trạng thái audio.
- **Mobile-First Responsive:** Đảm bảo giao diện hiển thị hoàn hảo trên màn hình dọc (Portrait) của điện thoại di động.

## 5. Quy Trình Triển Khai Đề Xuất (Suggested Workflow)
1. **Setup & Parser:** Xây dựng cấu trúc HTML cơ bản và viết script đọc dữ liệu từ `flow.yaml` (hoặc bản JSON của nó).
2. **State Machine:** Xây dựng logic quản lý luồng (Loading -> Intro -> Slides -> Quiz -> End).
3. **UI Components:** Xây dựng các thành phần giao diện (Nút bấm, Thanh điều hướng, Card câu hỏi) với CSS mang phong cách miền Trung.
4. **Transitions:** Cài đặt các hiệu ứng chuyển cảnh lớn (Curtain, Parallax, Slide Up).
5. **Micro-interactions & Audio:** Thêm các hiệu ứng nhỏ (glow, chớp đỏ/xanh, confetti) và tích hợp âm thanh.
6. **Refine & Optimize:** Tinh chỉnh timing của animation, đảm bảo 60fps trên thiết bị di động.