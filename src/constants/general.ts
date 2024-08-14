export const minLength = 5;
export const maxLength = 10;
export const minLengthAdmin = 2;
export const maxLengthAdmin = 4;

export const PAGE_SIZE = 10;
export const USER_TYPES_MAPPING: Record<string, string> = {
  ADMIN: "Admin",
  USER: "User",
};
export const ERROR_MESSAGE = {
  name: {
    required: "Tên không được để trống",
    minLength: `Tên tối thiểu ${minLength} ký tự`,
    maxLength: `Tên tối đa ${maxLength} ký tự`,
  },
  email: {
    required: "Email không được để trống",
    regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    errorRegex: "Vui Lòng Nhập Đúng Định Dạng Email",
  },
  phone: {
    required: "Số Điện Thoại không được để trống",
    regex: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
    errorRegex: "Vui Lòng Nhập Đúng Định Dạng Phone",
  },
  password: {
    required: "Mật khẩu không được để trống",
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    errorRegex:
      "Password tối thiễu 8 ký tự, 1 số, 1 ký tự in hoa và 1 ký tự in thường",
  },
  confirmPassword: {
    required: "Xác Nhận Mật Khẩu Không Được Để Trống",
    errorRegex: "Mật Khẩu không trùng khớp",
  },
};

export const ERROR_MESSAGE_ADMIN = {
  id: {
    required: "ID không được để trống",
    minLength: "ID tối thiểu 2 số",
    maxLength: "ID tối đa 4 số",
  },
  maPhong: {
    required: "Mã phòng không được để trống",
    minLength: "maPhong tối thiểu 2 số",
    maxLength: "maPhong tối đa 4 số",
  },
  ngayDen: {
    required: "Ngày đến không được để trống",
  },
  ngayDi: {
    required: "Ngày đến không được để trống",
  },
  soLuongKhach: {
    required: "Số lượng khách không để trống",
  },
  maNguoiDung: {
    required: "Mã người dùng không được để trống",
    minLength: "ID tối thiểu 2 số",
    maxLength: "ID tối đa 4 số",
  },
};

export const GROUP_CODE = "GP03";
