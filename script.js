/* ============================================================
   SCRIPT.JS — Portfolio SPA
   Router + Markdown Renderer + GSAP Animations + Lenis
   ============================================================ */

'use strict';

// ──────────────────────────────────────────────────────────────
// PROJECT METADATA (synced with content/projects/*.md)
// ──────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 'bai-1',
    num: '01',
    tag: 'BÀI TẬP 01',
    title: 'Máy tính và các thiết bị ngoại vi',
    subtitle: 'Bài 1 — Phần cứng máy tính',
    excerpt: 'Tìm hiểu cấu trúc máy tính và hệ sinh thái thiết bị ngoại vi — nền tảng để sử dụng hiệu quả các công cụ số trong học tập và làm việc kinh doanh hiện đại.',
    objective: 'Nắm vững cấu trúc và vai trò từng thành phần phần cứng; lựa chọn thiết bị phù hợp với nhu cầu công việc.',
    process: 'Nghiên cứu lý thuyết, khảo sát thực tế, phân tích tiêu chí chọn thiết bị văn phòng cho sinh viên kinh doanh.',
    deliverables: ['Báo cáo PDF', 'Bảng so sánh thiết bị', 'Slide thuyết trình'],
    thumb: 'assets/images/bai1-thumb.png',
  },
  {
    id: 'bai-2',
    num: '02',
    tag: 'BÀI TẬP 02',
    title: 'Khai thác dữ liệu và thông tin',
    subtitle: 'Bài 2 — Thông tin số',
    excerpt: 'Xây dựng kỹ năng tìm kiếm, đánh giá và tổ chức thông tin số — kỹ năng then chốt trong nghiên cứu thị trường, phân tích đối thủ và ra quyết định kinh doanh.',
    objective: 'Thành thạo kỹ thuật tìm kiếm nâng cao; đánh giá độ tin cậy nguồn thông tin theo SIFT Method.',
    process: 'Thực hành tìm kiếm trên Google Scholar, Statista, VCCI; phân tích mini case study thị trường digital marketing.',
    deliverables: ['Báo cáo PDF', 'SIFT Checklist', 'Mini Research Report'],
    thumb: 'assets/images/bai2-thumb.png',
  },
  {
    id: 'bai-3',
    num: '03',
    tag: 'BÀI TẬP 03',
    title: 'Tổng quan về trí tuệ nhân tạo',
    subtitle: 'Bài 3 — Trí tuệ nhân tạo',
    excerpt: 'Khám phá cách AI đang định hình lại kinh doanh toàn cầu — từ phân tích hành vi khách hàng, tự động hóa quy trình đến dự báo xu hướng thị trường.',
    objective: 'Hiểu AI từ góc độ quản trị kinh doanh; phân tích cơ hội và rủi ro AI mang lại cho từng ngành.',
    process: 'Nghiên cứu báo cáo McKinsey, WEF; thực hành dùng ChatGPT và Gemini cho phân tích SWOT và tóm tắt tài liệu.',
    deliverables: ['Báo cáo PDF', 'Mind map AI trong kinh doanh', 'Slide thuyết trình'],
    thumb: 'assets/images/bai3-thumb.png',
  },
  {
    id: 'bai-4',
    num: '04',
    tag: 'BÀI TẬP 04',
    title: 'Giao tiếp và hợp tác trong môi trường số',
    subtitle: 'Bài 4 — Cộng tác số',
    excerpt: 'Thực hành các kỹ năng giao tiếp chuyên nghiệp và cộng tác nhóm qua các nền tảng số — kỹ năng cốt lõi trong môi trường làm việc hybrid của doanh nghiệp hiện đại.',
    objective: 'Thành thạo Google Workspace, Teams; nắm nguyên tắc email chuyên nghiệp và xây dựng LinkedIn profile.',
    process: 'Dự án nhóm 4 người thực hiện hoàn toàn online: họp, phân công, cộng tác tài liệu và trình bày qua Google Meet.',
    deliverables: ['Báo cáo PDF', 'Email Guide', 'Mini Case Study F&B'],
    thumb: 'assets/images/bai4-thumb.png',
  },
  {
    id: 'bai-5',
    num: '05',
    tag: 'BÀI TẬP 05',
    title: 'Sáng tạo nội dung số',
    subtitle: 'Bài 5 — Nội dung sáng tạo',
    excerpt: 'Thực hành sản xuất nội dung số đa định dạng phục vụ truyền thông và marketing — từ bài viết, infographic đến video ngắn — áp dụng tư duy storytelling kinh doanh.',
    objective: 'Nắm vững content strategy; thực hành 3 định dạng: LinkedIn article, infographic Canva, video TikTok/Reels.',
    process: 'Lên kế hoạch nội dung, brainstorm với AI, sản xuất và phân tích hiệu quả theo content production workflow.',
    deliverables: ['LinkedIn Article', 'Infographic PNG', 'Video 45 giây'],
    thumb: 'assets/images/bai5-thumb.png',
  },
  {
    id: 'bai-6',
    num: '06',
    tag: 'BÀI TẬP 06',
    title: 'An toàn và liêm chính học thuật trong môi trường số',
    subtitle: 'Bài 6 — An toàn số',
    excerpt: 'Nghiên cứu bảo mật thông tin cá nhân và liêm chính học thuật trong thời đại AI — xây dựng nền tảng đạo đức số cho người học và người làm kinh doanh.',
    objective: 'Thực hiện Personal Security Audit; xây dựng framework sử dụng AI có đạo đức trong học tập và công việc.',
    process: 'Kiểm tra và nâng cấp toàn bộ thói quen bảo mật cá nhân; nghiên cứu case study phishing, deepfake trong kinh doanh.',
    deliverables: ['Báo cáo PDF', 'Security Audit Checklist', 'AI Ethics Framework'],
    thumb: 'assets/images/bai6-thumb.png',
  },
];

// ──────────────────────────────────────────────────────────────
// INLINE CONTENT MAP — avoids HTTP fetch (works on GitHub Pages)
// ──────────────────────────────────────────────────────────────
const CONTENT_MAP = {
  'bai-1': `## Mục tiêu bài tập

Với tư cách là sinh viên Quản trị Kinh doanh, bài tập này giúp tôi **hiểu rõ nền tảng phần cứng máy tính** — điều kiện tiên quyết để sử dụng hiệu quả các công cụ số phục vụ học tập và công việc. Mục tiêu cụ thể:

- Nắm được cấu trúc cơ bản của máy tính và vai trò từng thành phần
- Phân biệt và lựa chọn thiết bị ngoại vi phù hợp với từng nhu cầu công việc văn phòng
- Hiểu cách các thiết bị ảnh hưởng đến năng suất làm việc
- Biết cách bảo trì và sử dụng thiết bị bền lâu, tiết kiệm chi phí

---

## Quá trình thực hiện

### 1. Tìm hiểu cấu trúc máy tính

Tôi bắt đầu bằng cách tìm hiểu các thành phần chính của một máy tính cá nhân, nhìn từ góc độ người dùng trong kinh doanh:

| Thành phần | Chức năng | Ảnh hưởng đến công việc |
|------------|-----------|------------------------|
| **CPU** | Xử lý mọi tính toán | Quyết định tốc độ mở phần mềm, xử lý báo cáo |
| **RAM** | Bộ nhớ tạm thời | Xác định số lượng tab/ứng dụng mở cùng lúc |
| **SSD** | Lưu trữ dữ liệu | Tốc độ khởi động và truy cập file |
| **Màn hình** | Hiển thị | Độ phân giải ảnh hưởng chất lượng thuyết trình |
| **Pin (laptop)** | Nguồn điện | Thời gian làm việc di động |

### 2. Phân loại thiết bị ngoại vi theo nhu cầu văn phòng

Thay vì liệt kê tất cả thiết bị, tôi tập trung vào những gì thực sự cần thiết cho sinh viên kinh doanh:

**Nhóm thiết bị nhập liệu cần thiết:**
- **Bàn phím cơ học** — gõ văn bản nhanh, phù hợp viết báo cáo dài
- **Chuột không dây** — linh hoạt trong thuyết trình, làm việc di động
- **Bút cảm ứng + máy tính bảng** — ghi chú trong cuộc họp, ký hợp đồng số

**Nhóm thiết bị xuất cần thiết:**
- **Màn hình ngoài** — mở rộng không gian làm việc, tăng năng suất đến 40%
- **Máy chiếu / màn hình thuyết trình** — cần thiết cho báo cáo trực tiếp
- **Tai nghe chống ồn** — làm việc tập trung, họp online chất lượng cao

**Thiết bị lưu trữ dự phòng:**
- **USB 3.0 / SSD di động** — chia sẻ file lớn nhanh chóng
- **Cloud storage** (Google Drive, OneDrive) — truy cập từ mọi nơi, an toàn hơn

### 3. Bài học ứng dụng: Chọn máy tính cho sinh viên kinh doanh

Sau khi nghiên cứu, tôi tổng hợp được tiêu chí chọn laptop phù hợp cho sinh viên quản trị:

1. **Pin** ≥ 8 tiếng thực tế → làm việc cả ngày không lo sạc
2. **RAM** ≥ 16GB → chạy đồng thời Excel, PowerPoint, Chrome nhiều tab
3. **SSD** ≥ 512GB → lưu trữ đủ tài liệu, presentation, video khóa học
4. **Trọng lượng** ≤ 1.5kg → dễ mang đến lớp, thư viện, gặp khách hàng
5. **Màn hình** 14-15.6 inch, IPS → màu sắc chính xác khi thiết kế tài liệu

> "Máy tính là công cụ kiếm sống. Hiểu nó để đầu tư đúng — không phải mua đắt nhất, mà mua phù hợp nhất với công việc của mình."

---

## Sản phẩm đính kèm

- 📄 [Báo cáo - BaoCao\\_Bai1\\_MayTinh.pdf](#) *(Đang cập nhật)*
- 📊 [Bảng so sánh thiết bị văn phòng - SoSanh\\_ThietBi.xlsx](#) *(Đang cập nhật)*
`,

  'bai-2': `## Mục tiêu bài tập

Trong kinh doanh, **thông tin là tài sản**. Người ra quyết định nhanh hơn, chính xác hơn thường là người nắm thông tin tốt hơn. Bài tập này giúp tôi xây dựng kỹ năng khai thác thông tin số một cách hệ thống và có phê phán. Mục tiêu:

- Nắm vững các kỹ thuật tìm kiếm nâng cao để nghiên cứu thị trường hiệu quả
- Biết đánh giá độ tin cậy của nguồn thông tin — quan trọng khi phân tích ngành
- Hiểu cách tổ chức và quản lý thông tin thu thập được
- Ứng dụng vào bài toán thực tế: phân tích một xu hướng kinh doanh

---

## Quá trình thực hiện

### 1. Tại sao thông tin quan trọng với người học kinh doanh?

Trước đây tôi nghĩ Google là đủ. Nhưng sau bài học này, tôi nhận ra sự khác biệt cơ bản:

| | Người tìm kiếm thông thường | Người tìm kiếm có kỹ năng |
|--|--|--|
| **Kết quả** | Top 10 trang phổ biến nhất | Đúng nguồn cần thiết, kể cả học thuật |
| **Độ tin cậy** | Chưa kiểm chứng | Đã đánh giá tác giả, ngày đăng, mục đích |
| **Tốc độ** | Nhiều thời gian lọc nhiễu | Tìm đúng ngay từ đầu |
| **Ứng dụng** | Đọc xong bỏ đó | Lưu trữ có hệ thống, dễ trích dẫn |

### 2. Kỹ thuật tìm kiếm nâng cao cho nghiên cứu kinh doanh

Tôi đã thực hành các operator chuyên dụng trên Google:

\`\`\`
"Thương mại điện tử Việt Nam 2024" → tìm cụm từ chính xác
site:gso.gov.vn doanh thu bán lẻ  → dữ liệu từ Tổng cục Thống kê
filetype:pdf báo cáo thị trường F&B → tải báo cáo ngành
"digital marketing" -facebook -tiktok → loại bỏ platform cụ thể
after:2023-01-01 e-commerce trends  → chỉ lấy thông tin mới nhất
\`\`\`

**Ngoài Google, tôi còn khám phá:**
- **Google Scholar** — bài báo học thuật về kinh tế, quản trị
- **Statista** — số liệu thị trường toàn cầu
- **Nielsen, Kantar** — báo cáo hành vi người tiêu dùng
- **VCCI, VECOM** — số liệu kinh doanh tại Việt Nam

### 3. Đánh giá nguồn thông tin bằng SIFT Method

Tôi học được phương pháp **SIFT** (cập nhật hơn CRAAP Test) để đánh giá nhanh nguồn tin:

- **S — Stop** (Dừng lại): Trước khi đọc, hỏi bản thân "Tôi có biết gì về nguồn này?"
- **I — Investigate the source** (Điều tra nguồn): Tìm thông tin về tổ chức/tác giả
- **F — Find better coverage** (Tìm nguồn tốt hơn): So sánh với nhiều nguồn khác
- **T — Trace claims** (Truy xuất nguồn gốc): Kiểm tra tuyên bố có dữ liệu gốc không

### 4. Thực hành: Phân tích xu hướng Digital Marketing tại Việt Nam

Tôi áp dụng kỹ năng vào nghiên cứu một chủ đề kinh doanh thực tế. Kết quả tóm tắt:

**Nguồn đáng tin cậy tìm được:**
- Báo cáo "Vietnam Digital Marketing 2024" — Adsota & Nielsen
- Số liệu Tổng cục Thống kê về thương mại điện tử
- Bài nghiên cứu từ tạp chí Journal of Business Research

**Kết quả phân tích ngắn:**
> Thị trường digital marketing Việt Nam tăng trưởng 18%/năm (2022-2024). Video short-form (TikTok, Reels) đang chiếm 67% ngân sách quảng cáo số của doanh nghiệp vừa và nhỏ.

> "Trong kinh doanh, người có thông tin tốt hơn sẽ ra quyết định tốt hơn. Kỹ năng khai thác thông tin chính là lợi thế cạnh tranh vô hình."

---

## Sản phẩm đính kèm

- 📄 [Báo cáo - BaoCao\\_Bai2\\_KhaiThacTT.pdf](#) *(Đang cập nhật)*
- 📋 [Bảng đánh giá nguồn thông tin - SIFT\\_Checklist.pdf](#) *(Đang cập nhật)*
- 📊 [Mini Research: Digital Marketing VN 2024 - Research\\_DMK.pdf](#) *(Đang cập nhật)*
`,

  'bai-3': `## Mục tiêu bài tập

AI không còn là chuyện của tương lai — nó đang thay đổi từng ngành kinh doanh ngay lúc này. Bài tập này giúp tôi **hiểu AI từ góc nhìn của người quản trị kinh doanh** — không phải để lập trình, mà để chiến lược và ra quyết định thông minh hơn. Mục tiêu:

- Hiểu các khái niệm AI cốt lõi mà nhà quản trị cần biết
- Phân tích cách AI đang disrupting (gián đoạn) từng ngành kinh doanh
- Nhận biết cơ hội và rủi ro của AI với người học kinh doanh
- Hình thành quan điểm về cách ứng dụng AI có trách nhiệm

---

## Quá trình thực hiện

### 1. AI nhìn từ góc độ kinh doanh

Tôi không cần biết AI hoạt động như thế nào về mặt kỹ thuật — điều quan trọng hơn là hiểu **AI có thể làm gì cho doanh nghiệp**:

\`\`\`
Artificial Intelligence (AI) ứng dụng trong kinh doanh
├── Tự động hóa (Automation)
│   ├── RPA — tự động nhập liệu, xử lý hóa đơn
│   └── Chatbot — chăm sóc khách hàng 24/7
├── Phân tích & Dự báo (Analytics)
│   ├── Phân tích hành vi khách hàng
│   ├── Dự báo nhu cầu tồn kho
│   └── Credit scoring trong tài chính
├── Cá nhân hóa (Personalization)
│   ├── Recommendation engine (Netflix, Shopee, Tiki)
│   └── Dynamic pricing (Grab, khách sạn, hàng không)
└── Sáng tạo (Generative AI)
    ├── Tạo nội dung marketing (GPT-4, Claude)
    ├── Thiết kế hình ảnh (Midjourney, DALL-E)
    └── Phân tích hợp đồng, tài liệu pháp lý
\`\`\`

### 2. AI đang thay đổi các ngành kinh doanh như thế nào?

| Ngành | AI đang làm gì | Cơ hội cho người quản trị |
|-------|---------------|--------------------------|
| **Bán lẻ** | Phân tích giỏ hàng, dự báo xu hướng | Tối ưu assortment, pricing strategy |
| **Marketing** | Tạo content, target audience chính xác | Giảm chi phí/lead, tăng conversion |
| **Tài chính** | Phát hiện gian lận, phân tích rủi ro | Quyết định cho vay nhanh hơn, an toàn hơn |
| **HR** | Sàng lọc CV, phân tích hiệu suất | Tuyển dụng hiệu quả, giảm thiên kiến |
| **Supply Chain** | Dự báo nhu cầu, tối ưu logistics | Giảm tồn kho dư, tiết kiệm chi phí |

### 3. Thực hành: Dùng AI trong học tập kinh doanh

Tôi đã thực hành sử dụng ChatGPT và Gemini cho các task học tập thực tế:

**Task 1: Phân tích SWOT bằng AI**
Tôi yêu cầu AI phân tích SWOT cho một mô hình kinh doanh cụ thể, sau đó tự verify và bổ sung. Nhận xét: AI cho framework tốt, nhưng thiếu insight thị trường địa phương → cần kết hợp với nghiên cứu thực tế.

**Task 2: Viết Executive Summary**
AI tạo bản nháp trong 30 giây. Tôi mất 15 phút tinh chỉnh để phù hợp ngữ cảnh. Tổng thời gian: 20 phút thay vì 1.5 giờ.

**Task 3: Tóm tắt báo cáo dài**
Upload PDF báo cáo 40 trang, yêu cầu AI tóm tắt 5 điểm chính. Kết quả chính xác 80%, cần đọc lại để kiểm tra.

### 4. Góc nhìn về tương lai: AI và nghề nghiệp

**Công việc quản trị kinh doanh nào sẽ thay đổi:**
- Phân tích dữ liệu cơ bản → AI làm tốt hơn
- Viết báo cáo template → AI hỗ trợ đáng kể
- Chăm sóc khách hàng cơ bản → Chatbot xử lý

**Công việc nào con người vẫn không thể thay thế:**
- Xây dựng quan hệ và đàm phán → cần EQ cao
- Quyết định chiến lược trong tình huống không chắc chắn
- Lãnh đạo và truyền cảm hứng cho đội nhóm
- Sáng tạo giải pháp kinh doanh chưa từng có

> "Không phải AI thay thế nhà quản trị — AI thay thế nhà quản trị không biết dùng AI. Thế hệ chúng tôi phải trở thành người *cộng tác với AI* chứ không phải *cạnh tranh với AI*."

---

## Sản phẩm đính kèm

- 📄 [Báo cáo - BaoCao\\_Bai3\\_TongQuanAI.pdf](#) *(Đang cập nhật)*
- 🗺️ [Mind map AI trong kinh doanh - MindMap\\_AI\\_Kinh\\_Doanh.pdf](#) *(Đang cập nhật)*
- 📊 [Slide thuyết trình - Slide\\_AI\\_Business.pptx](#) *(Đang cập nhật)*
`,

  'bai-4': `## Mục tiêu bài tập

Kỹ năng giao tiếp và hợp tác là **năng lực số 1 mà nhà tuyển dụng tìm kiếm** ở sinh viên mới ra trường. Trong thời đại hybrid work, kỹ năng này đòi hỏi phải thành thạo cả môi trường số lẫn trực tiếp. Mục tiêu:

- Thành thạo các công cụ cộng tác số phổ biến nhất trong môi trường doanh nghiệp
- Nắm vững nguyên tắc giao tiếp chuyên nghiệp qua email, video call
- Biết quản lý dự án nhóm hiệu quả trong môi trường phân tán
- Xây dựng digital presence chuyên nghiệp phù hợp với ngành kinh doanh

---

## Quá trình thực hiện

### 1. Bản đồ công cụ cộng tác số trong doanh nghiệp

**Communication (Giao tiếp):**
- **Email** — vẫn là kênh chính thức số 1
- **Slack / Microsoft Teams** — nhắn tin nội bộ, cộng tác dự án
- **Zalo** — phổ biến tại Việt Nam, cả cá nhân lẫn doanh nghiệp

**Video Meetings:**
- **Google Meet** — phổ biến, miễn phí, tích hợp Calendar
- **Zoom** — chất lượng tốt, nhiều tính năng enterprise
- **Microsoft Teams** — all-in-one cho doanh nghiệp dùng M365

**Project Management (Quản lý dự án):**
- **Trello** — Kanban đơn giản, phù hợp nhóm nhỏ
- **Notion** — workspace linh hoạt nhất: docs + tasks + database
- **Asana / Monday.com** — dành cho team lớn, nhiều dự án song song

### 2. Thực hành: Dự án nhóm hoàn toàn online

Trong bài tập này, nhóm 4 người của tôi thực hiện một mini case study về phân tích thị trường F&B hoàn toàn trực tuyến.

**Tuần 1 — Kick-off:**
- Họp trên Google Meet 30 phút → phân công nhiệm vụ rõ ràng
- Tạo Trello board với cột: Backlog / In Progress / Review / Done

**Tuần 2-3 — Execution:**
- Cộng tác trên Google Docs (nhiều người edit cùng lúc)
- Check-in hàng ngày qua nhóm chat Messenger (5 phút/ngày)

**Tuần 4 — Finalization:**
- Review tổng thể qua Google Meet
- Trình bày qua Google Slides — share screen live

> Điều khó nhất không phải công việc — mà là duy trì giao tiếp đều đặn khi không gặp mặt trực tiếp.

### 3. Nguyên tắc giao tiếp email chuyên nghiệp

\`\`\`
Tiêu đề: [Rõ ràng] [Có hành động nếu cần]
Ví dụ: "Xin ý kiến về đề cương báo cáo — cần phản hồi trước 15/7"

Thân:
1. Opening: Nêu lý do liên hệ (1-2 câu)
2. Body: Thông tin chính, dùng bullet points
3. Ask: Yêu cầu cụ thể (làm gì, deadline khi nào)
4. Closing: Lịch sự, đề xuất bước tiếp theo
\`\`\`

**Email đến giảng viên, đối tác:**
- Luôn dùng kính ngữ phù hợp (Thưa Thầy/Cô, Kính gửi Anh/Chị)
- Đính kèm file trước khi gửi (kiểm tra lại tên file)
- Trả lời trong vòng 24 giờ — đây là chuẩn professional

> "Trong kinh doanh, cách bạn giao tiếp quan trọng không kém nội dung bạn truyền đạt."

---

## Sản phẩm đính kèm

- 📄 [Báo cáo - BaoCao\\_Bai4\\_GiaoTiepSo.pdf](#) *(Đang cập nhật)*
- 📋 [Hướng dẫn email chuyên nghiệp - Email\\_Guide.pdf](#) *(Đang cập nhật)*
- 🖼️ [Mini Case Study F&B - CaseStudy\\_FnB.pdf](#) *(Đang cập nhật)*
`,

  'bai-5': `## Mục tiêu bài tập

**Content is King** — câu này đã cũ nhưng chưa bao giờ đúng hơn trong thời đại mạng xã hội. Với sinh viên kinh doanh, khả năng tạo nội dung số là lợi thế cạnh tranh cực lớn. Mục tiêu:

- Hiểu quy trình sản xuất nội dung từ ý tưởng đến xuất bản
- Thực hành các định dạng: bài viết, infographic, video ngắn
- Ứng dụng tư duy marketing vào nội dung số
- Học cách đo lường và tối ưu hiệu quả nội dung

---

## Quá trình thực hiện

### 1. Content Strategy cho sinh viên kinh doanh

**Câu hỏi cốt lõi trước khi tạo content:**
1. **Ai là audience?** → Sinh viên cùng ngành, nhà tuyển dụng, hay khách hàng tiềm năng?
2. **Họ muốn gì?** → Thông tin hữu ích, giải trí, hay cảm hứng?
3. **Mình muốn gì?** → Xây dựng brand cá nhân, bán hàng, hay chỉ chia sẻ kiến thức?
4. **Kênh nào phù hợp?** → LinkedIn (B2B professional), TikTok (viral rộng), Instagram (visual storytelling)?
5. **Đo lường bằng gì?** → Views, engagement rate, leads generated?

### 2. Quy trình sản xuất nội dung

\`\`\`
IDEATE → PLAN → CREATE → REVIEW → PUBLISH → ANALYZE → OPTIMIZE
\`\`\`

**Tôi thực hành quy trình này với chủ đề "Xu hướng kinh doanh 2024 cho Gen Z":**

**Bước 1 — Ideate:** Brainstorm 20 ý tưởng trong 10 phút (không lọc), sau đó chọn 3 tốt nhất

**Bước 2 — Plan:** Xác định format (LinkedIn article), cấu trúc (5 xu hướng, mỗi xu hướng 200 chữ)

**Bước 3 — Create:** Viết draft đầu tiên không cần hoàn hảo, dùng AI hỗ trợ outline

### 3. Thực hành: 3 định dạng content

**📝 LinkedIn Article: "5 Kỹ năng số sinh viên kinh doanh cần học ngay hôm nay"**

Tôi viết bài 800 chữ với cấu trúc:
- Hook mạnh: số liệu gây bất ngờ về thị trường lao động
- 5 kỹ năng: Data literacy, AI literacy, Digital communication, Content creation, Cybersecurity

**🖼️ Infographic: "Bản đồ công cụ AI cho sinh viên kinh doanh"**

Tạo bằng Canva theo nguyên tắc:

| Yếu tố | Nguyên tắc áp dụng |
|--------|-------------------|
| Layout | Z-pattern (đọc từ trái sang phải, trên xuống dưới) |
| Màu sắc | 3 màu chủ đạo, tỷ lệ 60-30-10 |
| Typography | 2 font (serif cho tiêu đề, sans-serif cho body) |
| Whitespace | Đủ khoảng trống để "thở" |

**🎬 TikTok/Reels: "Học kinh doanh bằng xem phim"**

Video 45 giây format: Hook (5s) → Main content (30s) → CTA (10s)

### 4. AI trong content creation

| Công cụ | Task | Đánh giá |
|---------|------|-----------|
| ChatGPT | Outline, brainstorm, draft | ★★★★☆ — Cần customize nhiều |
| Canva AI | Magic Write, Design suggestions | ★★★☆☆ — Tốt cho template |
| CapCut | Auto subtitle, auto cut | ★★★★★ — Tiết kiệm thời gian nhất |
| Midjourney | Hình ảnh cho infographic | ★★★★☆ — Đẹp nhưng cần prompt kỹ |

> "Nội dung tốt nhất không phải nội dung hoàn hảo — mà là nội dung *đúng người, đúng thời điểm, đúng cảm xúc*."

---

## Sản phẩm đính kèm

- 📄 [Báo cáo - BaoCao\\_Bai5\\_SangTaoNoiDung.pdf](#) *(Đang cập nhật)*
- 🖼️ [Infographic "AI Tools Map" - Infographic\\_AITools.png](#) *(Đang cập nhật)*
- 🎥 [Video 45s - Video\\_HocKinhDoanh.mp4](#) *(Đang cập nhật)*
`,

  'bai-6': `## Mục tiêu bài tập

Trong thế giới kinh doanh, **uy tín là tài sản quý giá nhất** — và uy tín đó có thể bị phá hủy trong vài giờ bởi một vi phạm an toàn thông tin hay một scandal học thuật. Mục tiêu:

- Hiểu và tự bảo vệ thông tin cá nhân trong môi trường số
- Nắm rõ ranh giới giữa hỗ trợ AI và gian lận học thuật
- Xây dựng thói quen bảo mật thông tin chuyên nghiệp
- Hiểu trách nhiệm pháp lý và đạo đức của người dùng internet

---

## Quá trình thực hiện

### 1. Tại sao an toàn số quan trọng đặc biệt với sinh viên kinh doanh?

Sinh viên kinh doanh có nguy cơ cao hơn nhiều ngành khác vì:

- **Tiếp xúc với dữ liệu nhạy cảm**: Báo cáo thị trường, thông tin khách hàng, chiến lược kinh doanh
- **Mạng lưới quan hệ rộng**: LinkedIn, email với đối tác, nhà tuyển dụng
- **Thường xuyên dùng Wi-Fi công cộng**: Thư viện, quán cà phê, co-working space
- **Tài khoản tài chính**: Internet banking, ví điện tử, thanh toán trực tuyến

> Theo báo cáo của Kaspersky 2023, 67% sinh viên Việt Nam chưa từng sử dụng mật khẩu khác nhau cho các tài khoản quan trọng.

### 2. Kiểm tra và cải thiện bảo mật cá nhân

**Trước khi học bài này:**

| Hành vi bảo mật | Tình trạng của tôi |
|----------------|-------------------|
| Mật khẩu riêng cho từng tài khoản | ❌ Dùng 2-3 mật khẩu cho tất cả |
| Bật xác thực 2 yếu tố (2FA) | ❌ Chỉ Gmail |
| Kiểm tra link trước khi click | ❌ Thỉnh thoảng mới kiểm tra |
| Backup dữ liệu quan trọng | ❌ Chưa làm |

**Sau khi học và thực hành:**

| Hành vi bảo mật | Thay đổi |
|----------------|---------|
| Mật khẩu | ✅ Dùng **Bitwarden** (password manager miễn phí) |
| 2FA | ✅ Bật cho Gmail, Facebook, TikTok, Tài khoản ngân hàng |
| Backup | ✅ Tự động sync Google Drive hàng ngày |

### 3. Liêm chính học thuật trong thời đại AI

\`\`\`
MỨC 1 — Hoàn toàn được phép:
  • Dùng AI giải thích khái niệm khó hiểu
  • Brainstorm ý tưởng ban đầu
  • Kiểm tra ngữ pháp, cách diễn đạt

MỨC 2 — Được phép nếu khai báo:
  • AI viết outline, mình viết lại theo ý hiểu
  • AI tạo bản nháp, mình chỉnh sửa đáng kể (>50%)

MỨC 3 — Vi phạm liêm chính:
  • Nộp bài do AI viết 100% mà không chỉnh sửa
  • Bịa đặt trích dẫn (AI có thể hallucinate nguồn)
  • Copy từ AI mà không hiểu nội dung mình nộp
\`\`\`

> "Tôi có thể giải thích *mọi* nội dung trong bài nộp của mình không? Nếu không — tôi chưa thực sự học, dù điểm có cao đến đâu."

---

## Sản phẩm đính kèm

- 📄 [Báo cáo - BaoCao\\_Bai6\\_AnToanSo.pdf](#) *(Đang cập nhật)*
- 🛡️ [Personal Security Audit Checklist - SecurityAudit.pdf](#) *(Đang cập nhật)*
- 📋 [Framework sử dụng AI có đạo đức - AI\\_Ethics\\_Student.pdf](#) *(Đang cập nhật)*
`,
};


let lenis = null;
let currentView = 'home';
let isTransitioning = false;

// Detect reduced-motion preference for accessibility & performance
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Detect mobile device by screen size only — DO NOT use maxTouchPoints because
// many Windows laptops with touch screens return maxTouchPoints > 0 while still
// being used with a mouse/keyboard, which would incorrectly disable animations.
const isMobileViewport = window.innerWidth < 768;
// useHeavyFX: only skip heavy effects on actual small screens or if user prefers reduced motion
const useHeavyFX = !prefersReducedMotion && !isMobileViewport;

// ──────────────────────────────────────────────────────────────
// INIT
// ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initCursor();
  initSplitting();
  initHeroAnimations();
  initScrollAnimations();
  buildProjectCards();
  initRouter();
  initNavigation();
  initHoverEffects();
});

// ──────────────────────────────────────────────────────────────
// LENIS SMOOTH SCROLL
// ──────────────────────────────────────────────────────────────
function initLenis() {
  lenis = new Lenis({
    duration: 1.0,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 1.5,
  });

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Use single RAF loop for Lenis
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Link scroll to ScrollTrigger updates
  lenis.on('scroll', ScrollTrigger.update);
}

// ──────────────────────────────────────────────────────────────
// CUSTOM CURSOR
// ──────────────────────────────────────────────────────────────
function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  // Disable custom cursor only on real touch/mobile devices or small viewports.
  // We intentionally do NOT check navigator.maxTouchPoints here because many
  // Windows touchscreen laptops report maxTouchPoints > 0 even when used
  // with a mouse — hiding the cursor incorrectly for those users.
  // 'ontouchstart' in window is a more reliable indicator of a real touch-primary device.
  const isRealTouchDevice = ('ontouchstart' in window) || window.innerWidth <= 900;
  if (isRealTouchDevice) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    document.body.classList.remove('cursor-hover');
    return;
  }

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.set(cursor, { x: mouseX, y: mouseY });
  });

  // Follower with lag
  (function followCursor() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    gsap.set(follower, { x: followerX, y: followerY });
    requestAnimationFrame(followCursor);
  })();

  // Hover effect on interactive elements
  const interactiveSelector = 'a, button, .project-card, .nav-link, .hero__scroll-cta';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.add('cursor-hover');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.remove('cursor-hover');
    }
  });
}

// ──────────────────────────────────────────────────────────────
// SPLITTING.JS TEXT REVEAL
// ──────────────────────────────────────────────────────────────
function initSplitting() {
  if (typeof Splitting !== 'undefined') {
    Splitting();
  }
}

// ──────────────────────────────────────────────────────────────
// HERO ANIMATIONS
// ──────────────────────────────────────────────────────────────
function initHeroAnimations() {
  if (prefersReducedMotion) {
    // Just show everything instantly
    gsap.set(['#hero-title .char', '.hero__pill', '.hero__scroll-cta'], { opacity: 1, y: 0 });
    gsap.set('#hero-title .char', { transform: 'none' });
    return;
  }

  const tl = gsap.timeline({ delay: 0.2 });

  // Hero title chars stagger
  const heroChars = document.querySelectorAll('#hero-title .char');
  if (heroChars.length) {
    tl.to(heroChars, {
      y: '0%',
      stagger: 0.03,
      duration: 1,
      ease: 'power4.out',
    });
  }

  // Rules fade in
  tl.from('.hero__rule', {
    scaleX: 0,
    transformOrigin: 'center',
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.15,
  }, '-=0.6');

  // Pills + CTA
  tl.to('.hero__pill', {
    opacity: 1, y: 0,
    stagger: 0.1, duration: 0.7, ease: 'power3.out'
  }, '-=0.4')
  .to('.hero__scroll-cta', {
    opacity: 1, y: 0,
    duration: 0.7, ease: 'power3.out'
  }, '-=0.4');

  // Decorative circles gentle pulse — CSS handles via animation
  // No scroll-based parallax on hero (removed for performance)
}

// ──────────────────────────────────────────────────────────────
// SCROLL ANIMATIONS (About Section)
// ──────────────────────────────────────────────────────────────
function initScrollAnimations() {
  // The elements below start at opacity:0 via .js CSS guard.
  // If reduced motion is preferred we must reveal them immediately,
  // otherwise they'll remain permanently invisible.
  const aboutAnims = ['.about__lead', '.about__body', '.about__goals', '.about__image-col'];
  if (prefersReducedMotion) {
    aboutAnims.forEach(sel => {
      const el = document.querySelector(sel);
      if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
    });
    // Also reveal title chars if Splitting ran
    document.querySelectorAll('.about__title .char').forEach(c => { c.style.transform = 'none'; });
    return;
  }

  // About title chars
  const aboutChars = document.querySelectorAll('.about__title .char');
  if (aboutChars.length) {
    gsap.to(aboutChars, {
      y: '0%',
      stagger: 0.02,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.about__title',
        start: 'top 85%',
      }
    });
  }

  // About text blocks — simple fade+slide, no parallax
  ['.about__lead', '.about__body', '.about__goals', '.about__image-col'].forEach((sel, i) => {
    gsap.to(sel, {
      opacity: 1, y: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: i * 0.08,
      scrollTrigger: {
        trigger: sel,
        start: 'top 88%',
      }
    });
  });

  // Portrait subtle scale — only on non-mobile
  if (useHeavyFX) {
    gsap.to('#about-portrait', {
      y: '-6%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.about__image-frame',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      }
    });
  }

  // Home timeline items reveal via CSS class toggle on scroll
  const timelineItems = document.querySelectorAll('.timeline__item');
  if (timelineItems.length) {
    timelineItems.forEach((item) => {
      // Toggle reveal class (handles fade-in/slide animations via CSS)
      ScrollTrigger.create({
        trigger: item,
        start: 'top 88%',
        onEnter: () => item.classList.add('reveal'),
        // Keep visible once revealed for standard UX, or toggle if preferred
      });

      // Toggle active class (handles dot highlight color on pass)
      ScrollTrigger.create({
        trigger: item,
        start: 'top 65%',
        end: 'bottom 65%',
        onEnter: () => item.classList.add('active'),
        onLeaveBack: () => item.classList.remove('active'),
        onEnterBack: () => item.classList.add('active'),
      });
    });
  }

  // Home nav preview cards — staggered fade in
  document.querySelectorAll('.home-nav__card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      delay: i * 0.15,
      scrollTrigger: {
        trigger: '.home-nav__grid',
        start: 'top 85%',
      }
    });
  });
}

// ──────────────────────────────────────────────────────────────
// REFLECTIONS ANIMATIONS
// ──────────────────────────────────────────────────────────────
function initReflectionsAnimations() {
  // Title character slide up
  const refChars = document.querySelectorAll('.reflections__title .char');
  if (refChars.length) {
    gsap.to(refChars, {
      y: '0%',
      stagger: 0.02,
      duration: 1.1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.reflections__title',
        start: 'top 85%',
      }
    });
  }

  // Stat Counters (counting up on enter)
  const stats = document.querySelectorAll('.reflections__stat-num[data-val]');
  stats.forEach(stat => {
    const targetVal = parseInt(stat.getAttribute('data-val'), 10);
    if (isNaN(targetVal)) return;

    gsap.fromTo(stat, 
      { textContent: '0' },
      {
        textContent: targetVal,
        duration: 1.8,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: stat,
          start: 'top 92%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // Skills Progress Bar Animation
  const fills = document.querySelectorAll('.skill-progress__fill');
  fills.forEach(fill => {
    const progress = fill.getAttribute('data-progress');
    gsap.to(fill, {
      width: progress,
      duration: 1.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: fill,
        start: 'top 95%',
        toggleActions: 'play none none none',
      }
    });
  });

  // Reveal sections on scroll via CSS reveal class toggle
  document.querySelectorAll('.reflections__section').forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 88%',
      onEnter: () => section.classList.add('reveal'),
    });
  });
}

// ──────────────────────────────────────────────────────────────
// BUILD PROJECT BLOCKS (editorial collage layout)
// ──────────────────────────────────────────────────────────────
function buildProjectCards() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = '';

  PROJECTS.forEach((proj, idx) => {
    const isOdd = idx % 2 !== 0; // odd index = flipped layout

    const block = document.createElement('article');
    block.className = `project-block ${isOdd ? 'project-block--odd' : 'project-block--even'}`;
    block.setAttribute('data-id', proj.id);
    block.id = `block-${proj.id}`;

    const deliverablesList = (proj.deliverables || [])
      .map(d => `<li>${d}</li>`).join('');

    block.innerHTML = `
      <!-- Content side -->
      <div class="project-block__content">
        <div class="project-block__tag">${proj.tag}</div>
        <h2 class="project-block__title">${proj.title}</h2>
        <p class="project-block__excerpt">${proj.excerpt}</p>

        <div class="project-block__specs">
          <div class="project-block__spec">
            <span class="project-block__spec-label">Objective</span>
            <p>${proj.objective || ''}</p>
          </div>
          <div class="project-block__spec">
            <span class="project-block__spec-label">Process</span>
            <p>${proj.process || ''}</p>
          </div>
          <div class="project-block__spec">
            <span class="project-block__spec-label">Final Deliverables</span>
            <ul>${deliverablesList}</ul>
          </div>
        </div>

        <button class="project-block__cta" data-id="${proj.id}" id="cta-${proj.id}">
          <span class="project-block__cta-label">Xem chi tiết</span>
          <span class="project-block__cta-arrow" aria-hidden="true">→</span>
        </button>
      </div>

      <!-- Collage image side -->
      <div class="project-block__collage">
        <div class="project-block__img-wrap">
          <div class="project-block__img-frame project-block__img-frame--a">
            <img src="${proj.thumb}" alt="${proj.title}" loading="lazy" />
          </div>
          <div class="project-block__img-frame project-block__img-frame--b">
            <img src="${proj.thumb}" alt="" loading="lazy" aria-hidden="true" />
          </div>
          <div class="project-block__num-badge">${proj.num}</div>
        </div>
        <div class="project-block__dots" aria-hidden="true">●●●</div>
      </div>
    `;

    // Click CTA → navigate to detail
    block.querySelector('.project-block__cta').addEventListener('click', (e) => {
      e.stopPropagation();
      navigateTo(`project/${proj.id}`);
    });

    grid.appendChild(block);
  });
}

// ──────────────────────────────────────────────────────────────
// ANIMATE PROJECT BLOCKS
// ──────────────────────────────────────────────────────────────
function animateProjectCards() {
  if (prefersReducedMotion) {
    document.querySelectorAll('.project-block').forEach(b => {
      gsap.set(b, { opacity: 1, y: 0 });
    });
    return;
  }

  document.querySelectorAll('.project-block').forEach((block) => {
    const content  = block.querySelector('.project-block__content');
    const tag      = block.querySelector('.project-block__tag');
    const title    = block.querySelector('.project-block__title');
    const excerpt  = block.querySelector('.project-block__excerpt');
    const specs    = block.querySelector('.project-block__specs');
    const cta      = block.querySelector('.project-block__cta');
    const imgA     = block.querySelector('.project-block__img-frame--a');
    const imgB     = block.querySelector('.project-block__img-frame--b');
    const dots     = block.querySelector('.project-block__dots');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: block,
        start: 'top 82%',
      }
    });

    tl.from(tag,    { opacity: 0, y: 12,  duration: 0.5, ease: 'power3.out' })
      .from(title,  { opacity: 0, y: 24,  duration: 0.7, ease: 'power3.out' }, '-=0.3')
      .from(excerpt,{ opacity: 0, y: 16,  duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from(specs,  { opacity: 0, y: 12,  duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from(cta,    { opacity: 0, x: -8,  duration: 0.4, ease: 'power3.out' }, '-=0.3')
      .from(imgA,   { opacity: 0, scale: 0.94, rotate: 0, duration: 0.8, ease: 'power3.out' }, '-=0.7')
      .from(imgB,   { opacity: 0, scale: 0.9,  y: 20,     duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .from(dots,   { opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3');
  });
}



// ──────────────────────────────────────────────────────────────
// HASH-BASED ROUTER
// ──────────────────────────────────────────────────────────────
function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute(); // initial load
}

function handleRoute() {
  const hash = window.location.hash.replace('#', '') || 'home';

  if (hash.startsWith('project/')) {
    const id = hash.split('/')[1];
    showView('detail', () => loadProjectDetail(id));
  } else {
    switch (hash) {
      case 'projects':
        showView('projects', () => {
          ScrollTrigger.refresh();
          animateProjectCards();
        });
        break;
      case 'reflections':
        showView('reflections', () => {
          Splitting();
          ScrollTrigger.refresh();
          initReflectionsAnimations();
        });
        break;
      default:
        showView('home', () => {
          ScrollTrigger.refresh();
        });
        break;
    }
  }
}

// ──────────────────────────────────────────────────────────────
// VIEW SWITCHER WITH GSAP TRANSITION
// ──────────────────────────────────────────────────────────────
const VIEWS = {
  home:        'view-home',
  projects:    'view-projects',
  detail:      'view-detail',
  reflections: 'view-reflections',
};

const DARK_VIEWS = ['projects', 'detail'];

function showView(viewKey, onComplete) {
  if (isTransitioning) return;
  isTransitioning = true;

  const allViews = Object.values(VIEWS);
  const targetId = VIEWS[viewKey];

  // Safety timeout: if GSAP fails for any reason, reset state after 2s
  const safetyTimer = setTimeout(() => {
    isTransitioning = false;
    // Force show target view as fallback
    try {
      allViews.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('hidden', id !== targetId);
      });
      if (onComplete) onComplete();
      updateNavState(viewKey);
      updateDotNav(viewKey);
      updateTheme(viewKey);
      if (lenis) lenis.scrollTo(0, { immediate: true });
    } catch(e) { /* silent */ }
  }, 2000);

  const completeTransition = () => {
    clearTimeout(safetyTimer);
    isTransitioning = false;
    if (onComplete) onComplete();
    updateNavState(viewKey);
    updateDotNav(viewKey);
    updateTheme(viewKey);
    if (lenis) lenis.scrollTo(0, { immediate: true });
  };

  // Transition overlay
  const tl = gsap.timeline({
    onComplete: completeTransition,
    onInterrupt: () => { isTransitioning = false; clearTimeout(safetyTimer); }
  });

  // Fade out current
  tl.to('#app', {
    opacity: 0, y: -20,
    duration: 0.35,
    ease: 'power2.in',
    onComplete: () => {
      // Hide all, show target
      try {
        allViews.forEach(id => {
          const el = document.getElementById(id);
          if (el) el.classList.toggle('hidden', id !== targetId);
        });
      } catch(e) { /* silent */ }
    }
  })
  // Fade in new
  .set('#app', { y: 20 })
  .to('#app', {
    opacity: 1, y: 0,
    duration: 0.55,
    ease: 'power3.out',
  });

  currentView = viewKey;
}

// ──────────────────────────────────────────────────────────────
// THEME SWITCHING (cream / dark burgundy)
// ──────────────────────────────────────────────────────────────
function updateTheme(viewKey) {
  const isDark = DARK_VIEWS.includes(viewKey);
  document.body.classList.toggle('on-dark', isDark);

  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  if (header) header.classList.toggle('dark', isDark);
  if (footer) footer.classList.toggle('dark', isDark);
}

// ──────────────────────────────────────────────────────────────
// NAVIGATION STATE
// ──────────────────────────────────────────────────────────────
function updateNavState(viewKey) {
  document.querySelectorAll('.nav-link').forEach(link => {
    const section = link.getAttribute('data-section');
    const isActive = section === viewKey || (viewKey === 'detail' && section === 'projects');
    link.classList.toggle('active', isActive);
  });
}

function updateDotNav(viewKey) {
  const dotMap = { home: 'dot-home', projects: 'dot-projects', detail: 'dot-projects', reflections: 'dot-reflections' };
  document.querySelectorAll('.dot-nav__item').forEach(dot => dot.classList.remove('active'));
  const activeDot = document.getElementById(dotMap[viewKey]);
  if (activeDot) activeDot.classList.add('active');
}

// ──────────────────────────────────────────────────────────────
// NAVIGATION CLICK HANDLERS
// ──────────────────────────────────────────────────────────────
function initNavigation() {
  // Header nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      navigateTo(section);
    });
  });

  // Dot nav
  document.querySelectorAll('.dot-nav__item').forEach(dot => {
    dot.addEventListener('click', () => {
      const target = dot.getAttribute('data-target');
      navigateTo(target);
    });
  });

  // About → Projects CTA
  const gotoProjects = document.getElementById('goto-projects');
  if (gotoProjects) {
    gotoProjects.addEventListener('click', e => {
      e.preventDefault();
      navigateTo('projects');
    });
  }

  // Hero scroll CTA
  const heroScrollCta = document.getElementById('hero-scroll-cta');
  if (heroScrollCta) {
    heroScrollCta.addEventListener('click', () => {
      const aboutEl = document.getElementById('about');
      if (aboutEl && lenis) lenis.scrollTo(aboutEl, { duration: 1.5 });
    });
  }

  // Back button in detail
  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => navigateTo('projects'));
  }

  // Home nav preview cards CTA buttons
  document.querySelectorAll('.home-nav__card-cta').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      if (target) navigateTo(target);
    });
  });

  // Back to top button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    // Also listen to Lenis scroll for SPA views
    if (lenis) {
      lenis.on('scroll', ({ scroll }) => {
        if (scroll > 400) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      });
    }

    backToTopBtn.addEventListener('click', () => {
      // Scroll the active view container to top
      const activeView = document.querySelector('.view:not(.hidden)');
      if (activeView) {
        activeView.scrollTo({ top: 0, behavior: 'smooth' });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    });
  }
}

function navigateTo(route) {
  window.location.hash = route;
}

// ──────────────────────────────────────────────────────────────
// LOAD & RENDER PROJECT DETAIL
// ──────────────────────────────────────────────────────────────
async function loadProjectDetail(id) {
  const proj = PROJECTS.find(p => p.id === id);
  if (!proj) {
    showDetailError('Không tìm thấy bài tập này.');
    return;
  }

  // Clear any stale inline opacity/transform styles left by previous GSAP animations
  // This prevents content from being permanently invisible on revisit
  ['.detail__back-bar', '.detail__meta', '.detail__title', '.detail__thumb-wrap', '.markdown-content']
    .forEach(sel => {
      const el = document.querySelector(sel);
      if (el) {
        el.style.opacity = '';
        el.style.transform = '';
        el.style.visibility = '';
      }
    });

  // Update static fields immediately
  document.getElementById('detail-pill').textContent  = proj.tag;
  document.getElementById('detail-title').textContent = proj.title;
  document.getElementById('detail-breadcrumb').textContent = `Dự án / ${proj.tag}`;

  const thumb = document.getElementById('detail-thumb');
  const thumbWrap = document.getElementById('detail-thumb-wrap');
  if (thumb && proj.thumb) {
    thumb.src = proj.thumb;
    thumb.alt = proj.title;
    thumbWrap.style.display = 'block';
  }

  const contentEl = document.getElementById('markdown-content');

  // Use inline content map — no fetch needed, works on GitHub Pages
  const inlineContent = CONTENT_MAP[id];
  if (inlineContent && inlineContent.trim()) {
    renderMarkdown(inlineContent, contentEl);
    animateDetailEntry();
  } else {
    showDetailError(`Không tìm thấy nội dung cho bài tập "${id}".`);
  }
}

// ──────────────────────────────────────────────────────────────
// FRONTMATTER PARSER (simple YAML-like)
// ──────────────────────────────────────────────────────────────
function parseFrontmatter(raw) {
  const fmRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match   = raw.match(fmRegex);
  const meta    = {};

  if (match) {
    const fmLines = match[1].split('\n');
    fmLines.forEach(line => {
      const [key, ...val] = line.split(':');
      if (key && val.length) meta[key.trim()] = val.join(':').trim();
    });
    return { meta, content: raw.slice(match[0].length) };
  }

  return { meta, content: raw };
}

// ──────────────────────────────────────────────────────────────
// BUILT-IN FALLBACK MARKDOWN PARSER
// Used when marked.js CDN fails to load (network issues, blocking, etc.)
// ──────────────────────────────────────────────────────────────
function simpleMarkdownParse(md) {
  let html = md
    // Escape HTML entities first
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Code blocks (``` ... ```)
  html = html.replace(/```[\w]*\n?([\s\S]*?)```/g, (_, code) =>
    `<pre><code>${code.trim()}</code></pre>`
  );

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Headings
  html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

  // Horizontal rules
  html = html.replace(/^[-*_]{3,}\s*$/gm, '<hr>');

  // Blockquotes
  html = html.replace(/^&gt;\s?(.+)$/gm, '<blockquote>$1</blockquote>');

  // Bold + italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');

  // Links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Tables (simple GFM style)
  html = html.replace(/((?:^\|.+\|\n)+)/gm, (table) => {
    const lines = table.trim().split('\n');
    let tableHtml = '<table>';
    lines.forEach((line, i) => {
      if (/^\|[-| :]+\|$/.test(line)) return; // separator row
      const cells = line.split('|').filter((_, ci) => ci > 0 && ci < line.split('|').length - 1);
      const tag = i === 0 ? 'th' : 'td';
      tableHtml += '<tr>' + cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('') + '</tr>';
    });
    tableHtml += '</table>';
    return tableHtml;
  });

  // Unordered lists
  html = html.replace(/((?:^[-*+]\s.+\n?)+)/gm, (block) => {
    const items = block.trim().split('\n')
      .map(l => `<li>${l.replace(/^[-*+]\s/, '')}</li>`).join('');
    return `<ul>${items}</ul>`;
  });

  // Ordered lists
  html = html.replace(/((?:^\d+\.\s.+\n?)+)/gm, (block) => {
    const items = block.trim().split('\n')
      .map(l => `<li>${l.replace(/^\d+\.\s/, '')}</li>`).join('');
    return `<ol>${items}</ol>`;
  });

  // Paragraphs — wrap double-newline separated blocks not already wrapped in tags
  html = html.split(/\n{2,}/).map(block => {
    block = block.trim();
    if (!block) return '';
    if (/^<(h[1-6]|ul|ol|li|pre|blockquote|hr|table|tr|th|td)/.test(block)) return block;
    return `<p>${block.replace(/\n/g, '<br>')}</p>`;
  }).join('\n');

  return html;
}

// ──────────────────────────────────────────────────────────────
// RENDER MARKDOWN
// ──────────────────────────────────────────────────────────────
function renderMarkdown(mdText, container) {
  // Hide the loading dots if still visible
  const loadingEl = document.getElementById('detail-loading');
  if (loadingEl) loadingEl.style.display = 'none';

  let html = '';

  if (typeof marked !== 'undefined') {
    try {
      // marked v5+ uses marked.use() instead of marked.setOptions()
      // marked v4 uses marked.setOptions() — handle both APIs
      if (typeof marked.use === 'function') {
        marked.use({ breaks: true, gfm: true });
      } else if (typeof marked.setOptions === 'function') {
        marked.setOptions({ breaks: true, gfm: true });
      }
      html = marked.parse(mdText);
    } catch (e) {
      console.warn('marked.parse() failed, falling back to simple parser:', e);
      html = simpleMarkdownParse(mdText);
    }
  } else {
    // CDN failed — use built-in fallback parser
    console.warn('marked.js not loaded from CDN — using built-in fallback parser');
    html = simpleMarkdownParse(mdText);
  }

  container.innerHTML = html;

  // Make all external links open in new tab
  container.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (!href.startsWith('#')) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    }
  });
}


// ──────────────────────────────────────────────────────────────
// DETAIL PAGE ANIMATION
// ──────────────────────────────────────────────────────────────
function animateDetailEntry() {
  // IMPORTANT: Never use gsap.from() here because it temporarily sets
  // opacity:0 on elements. If GSAP fails mid-animation, content stays
  // permanently invisible. Instead, use fromTo() with explicit end-state
  // or use CSS transitions with a class toggle (safer approach).

  // First ensure everything is visible (safety baseline)
  const els = [
    document.querySelector('.detail__back-bar'),
    document.querySelector('.detail__meta'),
    document.querySelector('.detail__title'),
    document.querySelector('.detail__thumb-wrap'),
    document.querySelector('.markdown-content'),
  ].filter(Boolean);

  // Set everything fully visible immediately as baseline
  els.forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });

  // Only run fancy animation if GSAP is available and no reduced motion
  if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
    // Use fromTo (not from) so end state is always guaranteed
    const tl = gsap.timeline();
    tl.fromTo('.detail__back-bar',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'all' }
    )
    .fromTo('.detail__meta',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'all' }, '-=0.2'
    )
    .fromTo('.detail__title',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', clearProps: 'all' }, '-=0.3'
    )
    .fromTo('.detail__thumb-wrap',
      { opacity: 0, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', clearProps: 'all' }, '-=0.4'
    )
    .fromTo('.markdown-content',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', clearProps: 'all' }, '-=0.3'
    );
  }
}

// ──────────────────────────────────────────────────────────────
// ERROR STATE
// ──────────────────────────────────────────────────────────────
function showDetailError(msg) {
  const el = document.getElementById('markdown-content');
  if (el) {
    el.innerHTML = `
      <div style="padding: 48px 0; opacity: 0.6;">
        <p style="font-size:16px; line-height:1.8;">⚠️ ${msg}</p>
      </div>
    `;
  }
}

// ──────────────────────────────────────────────────────────────
// HOVER EFFECTS (lightweight — removed heavy 3D magnetic effect)
// ──────────────────────────────────────────────────────────────
function initHoverEffects() {
  if (!useHeavyFX) return; // Skip entirely on mobile / reduced-motion

  // Simple subtle lift on project cards (no 3D rotate — was too heavy)
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -4, duration: 0.35, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.4, ease: 'power3.out' });
    });
  });
}

// ──────────────────────────────────────────────────────────────
// SCROLL-BASED HEADER HIGHLIGHT
// ──────────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const aboutEl = document.getElementById('about');
  if (!aboutEl) return;
  const inAbout = aboutEl.getBoundingClientRect().top < window.innerHeight / 2;
  // Additional scroll logic can go here
}, { passive: true });
