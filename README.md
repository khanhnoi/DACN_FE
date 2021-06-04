## DACN HTTT

Lưu ý: Nếu gặp lỗi CORS error khi call API

cmd gõ >

```
"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp

```

Tiến trình Làm DATN

- Srs, họp, dưng mockDesign ( trước tháng 3)
- Dành time để stra build UI, setup folder, thư viện (9/3->16/3)
- Chờ API từ Ngân bên BE (chưa update)
- Chờ App từ Thanh, Đạt (chưa update)

## Srs

E'DAY Fashion (Shop quần áo online)

-SRS:
+Admin (-CRUD Product): Ngân
+CRUD PRODUCT: Khánh(Ngân support) + APP :
THANH: - Cart - Payment - Detail : + Product
ĐẠT: - Singup /Singin - List product - Detail : + User - Chat

## Bản nháp họp vs nhau:

- Đề tài: Hệ thống bán quần áo online.
- WEB: BE: JAVA APPENGINE (Ngân)
  FE: JAVA, REACT JS ( Khánh)
  -APP: FLUTTER (Thanh, Đạt)
  -DB: POSTGRES

---

-WEB ADMIN: + Login/logout + CRUD user + CRUD contact + CRUD product + CRUD kho : SỐ LƯỢNG, LỢI NHUẬN + Đăng bán
-APP CUSTOMER: + Singup /Login/Logout + List product + Detail : + Product + User + Cart + Payment + Chat + Hướng dẫn (Nếu dư time)

## Phân chia

- VỀ PHÂN QUYỀN:
  - Hệ thống cũ hiện chỉ có 3 quyền gồm : Admin(Chủ shop), Manager(quản lý) và user(khách hàng)
  - THẦY YÊU CẦU THÊM 1 ROLE LÀ NHÂN VIÊN .
- VỀ CHỨC NĂNG:
  - Phần App: _ Có thêm chức năng chấm công
    _ Khi bán 1 sản phẩm , đồng thời ghi nhận nhân viên đã bán sản phẩm đó để có thể xét thưởng /tăng lương khi đạt 1 doanh số nhất định
  - Phần Web: _ Ở kho cần xuất file excel thống kê, filter doanh số theo tháng/sản phẩm/quý....
    _ Thêm thống kê ngày công của nhân viên -> mở rộng ra thành chức năng quản lý lương nhân viên \* Thống kê được số lượng/tổng tiền đã mua của khách hàng trong khoảng thời gian cụ thể -> mở rộng cho chức năng khuyến mãi/khách hàng thân thiết
    -> từ đó có thể giảm giá (% giảm giá cho các hoá đơn của khách tính theo công thức tuỳ chọn) khi khách mua hàng ở những lần sau khi là khách hàng thân thiết.

---

Vì yêu cầu đồ án cần thêm ERP nên chức năng bán hàng chỉ làm nền cho chức năng quản lý
( theo ý thầy thì tập trung chức năng quản lý nhiều hơn)

---

Chia công việc SRS:
Những phần trước ai chưa làm xong thì tiếp tục làm .
Usecase : Ngân hoàn thiện .
Phần App: + Đạt : chức năng chấm công + Thanh: phát triển thêm chỗ khi thanh toán (đồng thời ghi nhân viên xuất hoá đơn cho đơn hàng)
Phần WEB: + Ngân: chức năng quản lý công + Khánh : thêm design ở màn hình kho , chức năng quản lý khách hàng thân thiết.
DEALINE: TRƯỚC NGÀY 28 TẾT.(LẦN NÀY YÊU CẦU MỌI NGƯỜI TẬP TRUNG LÀM, KHÔNG CLEAN THÌ PING TRÊN NHÓM ĐỂ AI HIỂU THÌ GIẢI THÍCH, AI TRỄ DEALINE THÌ CHỊU TRÁCH NHIỆM VỚI THẦY ).

---

Thiết kế database:
Sau Tết sẽ họp để triển khai sau (Nếu hết dịch ^^)
