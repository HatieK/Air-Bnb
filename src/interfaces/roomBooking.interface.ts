export interface RoomBookingList {
  statusCode: number;
  content: RoomBooking[];
}

export interface RoomBooking {
  id: number;
  maPhong: number;
  ngayDen: Date;
  ngayDi: Date;
  soLuongKhach: number;
  maNguoiDung: number;
}
