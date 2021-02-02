export const OrderStatus = (status) => {
  switch (status) {
    case 0:
      return 'Giỏ hàng'
    case 1: 
      return 'Đang chờ xử lý'
    case 2:
      return 'Chờ thanh toán'
    case 3:
      return 'Đã thanh toán'
    case 4:
      return 'Chờ giao hàng'
    case 5: 
      return 'Đang giao hàng'
    case 6:
      return 'Hoàn thành đơn hàng'
    case 7:
      return 'Từ chối đơn hàng'
    case 8:
      return 'Đã hủy'
    case 9:
      return 'Others'
    default:
      return ''
  }
}