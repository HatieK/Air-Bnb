export interface Location {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: QuocGia;
  hinhAnh: string;
}

export enum QuocGia {
  ViệtNam = "Việt Nam",
}
