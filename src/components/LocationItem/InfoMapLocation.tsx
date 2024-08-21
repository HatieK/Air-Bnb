import React from "react";
import { useAppSelector } from "../../redux/slices/hook";

const MAP_LIST = [
  // HỒ CHÍ MINH
  {
    id: 1,
    srcMap:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.921097856838!2d106.36624167772696!3d11.11925426082015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310b3aa315cf1aef%3A0xe1692a2d87ab757a!2zSOG7kyBDaMOtIE1pbmgsIFTDonkgTmluaCwgVmlldG5hbQ!5e0!3m2!1sen!2sus!4v1724148223558!5m2!1sen!2sus",
  },
  //CẦN THƠ
  {
    id: 2,
    srcMap:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251767.79165421275!2d105.40813801369596!3d10.045161015017306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a08842a774ff3f%3A0xc8b1df0c8cf33a70!2zQ2jhu6MgVMOibiBUaMOhbmggQ8ahbiBUaMO0LCBDw6BuIFRo4buHLCBWaeG7h3Q!5e0!3m2!1sen!2s!4v1664304969543!5m2!1sen!2s",
  },
  //NHA TRANG
  {
    id: 3,
    srcMap:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62862.3202446765!2d109.16696933888291!3d12.245259388135314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317067615dc135df%3A0x9866c2723a2c2fa5!2sNha%20Trang%2C%20Khanh%20Hoa%20Province%2C%20Vietnam!5e0!3m2!1sen!2s!4v1664305038167!5m2!1sen!2s",
  },
  //HÀ NỘI
  {
    id: 4,
    srcMap:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.243392173092!2d105.84117091534629!3d21.028511993313467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abfdc5b9b5ed%3A0x2f7a65c9364d5e5e!2zSOG6o2kgTmjDoCBOaMOibiwgSOG6o2kgTmjDoCwgVGjDoW5oIFRo4buLIFThu7EgTmjDoQ!5e0!3m2!1sen!2s!4v1664304918353!5m2!1sen!2s",
  },
  //PHÚ QUỐC
  {
    id: 5,
    srcMap:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50405.40367616258!2d103.95544959073267!3d10.289584220040804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a7d7ea32423863%3A0x800fd05e49b08a25!2sPhu%20Quoc%2C%20Kien%20Giang%2C%20Vietnam!5e0!3m2!1sen!2s!4v1664305093548!5m2!1sen!2s",
  },
  //ĐÀ NẶNG
  {
    id: 6,
    srcMap:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8224179062566!2d108.22096581530968!3d16.047079288894503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219b450f213bf%3A0xbd08ed97c829d524!2sDa%20Nang%2C%20Vietnam!5e0!3m2!1sen!2s!4v1664305134182!5m2!1sen!2s",
  },
  //ĐÀ LẠT
  {
    id: 7,
    srcMap:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8224179062566!2d108.22096581530968!3d16.047079288894503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219b450f213bf%3A0xbd08ed97c829d524!2sDa%20Nang%2C%20Vietnam!5e0!3m2!1sen!2s!4v1664305134182!5m2!1sen!2s",
  },
  //PHAN THIẾT
  {
    id: 8,
    srcMap:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.681144768832!2d108.10783351531518!3d10.933273792208944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3176678e4a08f3f1%3A0x56b3ac943f96c0df!2sPhan%20Thiet%2C%20Binh%20Thuan%20Province%2C%20Vietnam!5e0!3m2!1sen!2s!4v1664305215876!5m2!1sen!2s",
  },
];

const InfoMapLocation = () => {
  const { infoLocation } = useAppSelector((state) => state.roomBasedLocation);

  const srcMapLocation = MAP_LIST.find((map) => {
    return map.id === infoLocation?.id;
  });

  return (
    <>
      <p>Map Location</p>
      <p className="mb-2">
        Bản đồ hiện tại ở{" "}
        <span className="font-bold text-rose-700">{`${infoLocation?.tinhThanh}`}</span>
      </p>
      <div style={{ width: `100%`, height: `100%` }}>
        <iframe
          src={srcMapLocation?.srcMap}
          width={`100%`}
          height={`550px`}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  );
};

export default InfoMapLocation;
