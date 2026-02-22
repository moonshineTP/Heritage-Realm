# Dấu Di Sản

## 1. Bối cảnh nghiên cứu & Vấn đề cốt lõi

Có một sự "lệch pha" lớn giữa cách các di sản đang kể chuyện và cách người trẻ (Gen Z/Millennials) kỳ vọng được trải nghiệm. Người trẻ không chán lịch sử, họ chỉ chán cách truyền tải cũ: tuyến tính, thụ động, và phân mảnh.

Nghiên cứu thực tế chỉ ra hai vấn đề lớn:
- **Với người tham quan (B2C):** Họ đi tự túc, lướt nhanh, ghét đọc bảng thông tin dài. Họ dễ lạc đường và thường rời đi với cảm giác "chỉ đến chụp ảnh rồi về" mà không đọng lại gì.
- **Với ban quản lý di sản (B2B):** Họ phụ thuộc nặng nề vào hướng dẫn viên con người, thiếu dữ liệu hành vi khách hàng (không biết khách đi đâu, dừng ở đâu lâu), và chịu áp lực phải "chuyển đổi số" nhưng thiếu nguồn lực.

---

## 2. Giải pháp: Dấu Di Sản

**Dấu Di Sản** ra đời như một lớp trải nghiệm số đặt lên trên không gian vật lý của bảo tàng/khu di sản. 

Đây không phải là một ứng dụng cần tải về. Người tham quan chỉ cần scan QR tại chỗ, và từ đó được dẫn qua một hành trình: nghe câu chuyện của từng khu, trả lời một câu hỏi nhỏ, và nhận huy hiệu khi hoàn thành.

- **Giá trị cho B2C:** Biến một chuyến tham quan tự túc thành một hành trình có cấu trúc, dẫn dắt bằng câu chuyện (audio/video), tạo ra sự thấu hiểu và kết nối cảm xúc.
- **Giá trị cho B2B:** Cung cấp một công cụ kể chuyện kỹ thuật số dễ triển khai, giúp tăng sự hài lòng của khách và thu thập dữ liệu hành vi (analytics) mà không đòi hỏi hạ tầng phức tạp.

Mục tiêu không phải là thay thế trải nghiệm thực tế tại bảo tàng — mà là làm cho nó đáng nhớ hơn.

---

## 3. Cần truyền tải được gì?

Dự án phải trả lời được ba câu hỏi trong đầu người dùng, theo thứ tự:

1. **"Đây là gì, tôi có nên tham gia không?"** — Intro phải đủ hấp dẫn và đủ ngắn để người đứng giữa bảo tàng không bỏ qua.
2. **"Tôi phải làm gì tiếp theo?"** — Flow phải rõ ràng đến mức không cần đọc hướng dẫn.
3. **"Tôi đã làm được gì?"** — Kết thúc phải có cảm giác hoàn thành, đủ để muốn chia sẻ.

Ngoài ra, toàn bộ trải nghiệm phải cảm thấy **nhẹ** — ít chữ, ít bước, ít ma sát. Người dùng đang đứng, một tay cầm điện thoại, giữa một không gian ồn ào.

---

## 4. Người dùng là ai và họ đang ở đâu?

Người dùng đang đứng tại bảo tàng, vừa scan QR xong. Họ:

- **Không có context trước** về ứng dụng này
- **Có thể đang vội**, hoặc đi cùng người khác
- **Dùng điện thoại cá nhân** (chủ yếu iPhone/Android tầm trung, màn hình 5–6 inch)
- **Không có headphone** (audio phải có fallback bằng text/caption)
- **Kết nối mạng không ổn định** (museum Wi-Fi hoặc 4G yếu)

Đây là lý do tại sao: load nhanh không phải nice-to-have, mà là điều kiện tối thiểu để dự án tồn tại.

---

## 5. Giới hạn và phạm vi

**Dự án này là một trải nghiệm tuyến tính, một lần, không cần tài khoản.**
Không phải app, không phải platform, không phải hệ thống quản lý nội dung.

| Trong phạm vi | Ngoài phạm vi |
|---|---|
| Hành trình từ QR → huy hiệu → share | Lưu tiến trình giữa các lần visit |
| Một bảo tàng, một sự kiện | Hệ thống đa bảo tàng hay đa ngôn ngữ |
| Câu hỏi ngắn tại chỗ | Bảng xếp hạng hay tính năng cộng đồng |
| Share Facebook | Đăng nhập mạng xã hội hay tích hợp sâu |

---

## 6. Phạm vi của lần làm việc này

Dự án không chỉ dừng ở việc vẽ giao diện cho developer, mà là thiết kế một hệ thống hoàn chỉnh từ góc nhìn trải nghiệm đến cách vận hành. Đầu ra của giai đoạn này bao gồm 3 phần:

1. **User Flow & UX Concept (Dành cho khách hàng):**
   - Sơ đồ luồng đi chi tiết từ lúc scan QR đến khi nhận huy hiệu và share Facebook.
   - Định hình các tương tác chính (curtain transition, left swipe) và triết lý UX (ít chữ, trực quan, thao tác một tay).
   - Giúp khách hàng hình dung trọn vẹn trải nghiệm cuối cùng.

2. **Wireframe Mobile:**
   - Khung giao diện thực tế trên màn hình điện thoại.
   - Đảm bảo tính khả thi về mặt hiển thị và tương tác trước khi đổ thiết kế chi tiết (UI).

3. **Cấu trúc Config YAML (Dành cho Dev / AI Agent):**
   - Thiết kế file cấu hình (`flow.yaml`) để tách biệt hoàn toàn nội dung khỏi code.
   - Khách hàng/Đội nội dung chỉ cần điền text, link ảnh/audio vào file YAML.
   - Developer (hoặc AI Agent) dựa vào đó để tự động render giao diện mà không cần hardcode, tuân thủ nguyên tắc Open-Closed.

---

*Dự án: Dấu Di Sản · Giai đoạn: Khởi tạo & Wireframe · Cập nhật: 2026-02-21*
   - Developer (hoặc AI Agent) dựa vào đó để tự động render giao diện mà không cần hardcode, tuân thủ nguyên tắc Open-Closed.

---
