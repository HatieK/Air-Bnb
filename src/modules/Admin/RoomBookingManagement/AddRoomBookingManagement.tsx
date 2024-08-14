import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Typography,
} from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  ERROR_MESSAGE_ADMIN,
  maxLengthAdmin,
  minLengthAdmin,
} from "../../../constants/general";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { roomBookingApi } from "../../../apis/roomBooking.api";

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
}

interface FormValues {
  id: string;
  maPhong: string;
  ngayDen: string;
  ngayDi: string;
  soLuongKhach: string;
  maNguoiDung: string;
}

const schema = yup.object({
  id: yup
    .string()
    .required(ERROR_MESSAGE_ADMIN.id.required)
    .min(minLengthAdmin, ERROR_MESSAGE_ADMIN.id.minLength)
    .max(maxLengthAdmin, ERROR_MESSAGE_ADMIN.id.maxLength),
  maPhong: yup
    .string()
    .trim()
    .required(ERROR_MESSAGE_ADMIN.maPhong.required)
    .min(minLengthAdmin, ERROR_MESSAGE_ADMIN.id.minLength)
    .max(maxLengthAdmin, ERROR_MESSAGE_ADMIN.id.maxLength),
  ngayDen: yup.string().trim().required(ERROR_MESSAGE_ADMIN.ngayDen.required),
  ngayDi: yup.string().trim().required(ERROR_MESSAGE_ADMIN.ngayDi.required),
  soLuongKhach: yup
    .string()
    .trim()
    .required(ERROR_MESSAGE_ADMIN.soLuongKhach.required),
  maNguoiDung: yup
    .string()
    .trim()
    .required(ERROR_MESSAGE_ADMIN.maPhong.required)
    .min(minLengthAdmin, ERROR_MESSAGE_ADMIN.id.minLength)
    .max(maxLengthAdmin, ERROR_MESSAGE_ADMIN.id.maxLength),
});

const AddRoomBookingManagement: React.FC<ModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  // REACT-HOOK-FORM
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      id: "",
      maPhong: "",
      ngayDen: "",
      ngayDi: "",
      soLuongKhach: "",
      maNguoiDung: "",
    },
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });

  // MODAL START

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // MODAL END

  // API START
  const { mutate: handleAddRoomBooking, isPending: addBookingRoomLoading } =
    useMutation({
      mutationFn: (payload: any) => roomBookingApi.addRoomBooking(payload),
      onSuccess: (data) => {
        console.log("🚀data---->", data);
      },
      onError: (error) => {
        console.log("🚀error---->", error);
      },
    });

  const onSubmit = (formValue: FormValues) => {
    const formData = new FormData();
    formData.append("id", formValue.id);
    formData.append("maPhong", formValue.maPhong);
    formData.append("ngayDen", formValue.ngayDen);
    formData.append("ngayDi", formValue.ngayDi);
    formData.append("soLuongKhach", formValue.soLuongKhach);
    formData.append("maNguoiDung", formValue.maNguoiDung);
    handleAddRoomBooking(formData);
  };

  return (
    <div>
      <>
        <Modal
          title={
            <Typography className="text-2xl font-bold">Room Code</Typography>
          }
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
        >
          <Form className="m-w-[550px] mt-4" onFinish={handleSubmit(onSubmit)}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <label className="text-xs">
                  <span className="text-red-600">*</span>Id
                </label>
                <Controller
                  name="id"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        size="large"
                        placeholder="Id"
                        className="mt-1"
                        status={errors.id ? "error" : ""}
                      />
                    );
                  }}
                />
                {errors?.id && (
                  <>
                    <p className="text-xs text-red-600">
                      {(errors.id as any).message}
                    </p>
                  </>
                )}
              </Col>
              <Col span={24}>
                <label className="text-xs">
                  <span className="text-red-600">*</span> Code User
                </label>
                <Controller
                  name="maNguoiDung"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        size="large"
                        placeholder="Code User"
                        className="mt-1"
                        status={errors.maNguoiDung ? "error" : ""}
                      />
                    );
                  }}
                />
                {errors?.maNguoiDung && (
                  <>
                    <p className="text-xs text-red-600">
                      {(errors.maNguoiDung as any).message}
                    </p>
                  </>
                )}
              </Col>
              <Col span={24}>
                <label className="text-xs">
                  <span className="text-red-600">*</span> Room Code
                </label>
                <Controller
                  name="maPhong"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        size="large"
                        placeholder="Room Code"
                        className="mt-1"
                        status={errors.maPhong ? "error" : ""}
                      />
                    );
                  }}
                />
                {errors?.maPhong && (
                  <>
                    <p className="text-xs text-red-600">
                      {(errors.maPhong as any).message}
                    </p>
                  </>
                )}
              </Col>
              <Col span={24}>
                <label className="text-xs">
                  <span className="text-red-600">*</span> Coming Date
                </label>
                <Controller
                  name="ngayDen"
                  control={control}
                  render={({ field }) => {
                    return (
                      <DatePicker
                        {...field}
                        size="large"
                        className="mt-1 w-full"
                        placeholder="DD/MM/YYYY"
                        format={"DD/MM/YYYY"}
                        status={errors.ngayDen ? "error" : ""}
                      />
                    );
                  }}
                />
                {errors?.ngayDen && (
                  <>
                    <p className="text-xs text-red-600">
                      {(errors.ngayDen as any).message}
                    </p>
                  </>
                )}
              </Col>
              <Col span={24}>
                <label className="text-xs">
                  <span className="text-red-600">*</span> Leave Date
                </label>
                <Controller
                  name="ngayDi"
                  control={control}
                  render={({ field }) => {
                    return (
                      <DatePicker
                        {...field}
                        size="large"
                        className="mt-1 w-full"
                        placeholder="DD/MM/YYYY"
                        format={"DD/MM/YYYY"}
                        status={errors.ngayDi ? "error" : ""}
                      />
                    );
                  }}
                />
                {errors?.ngayDi && (
                  <>
                    <p className="text-xs text-red-600">
                      {(errors.ngayDi as any).message}
                    </p>
                  </>
                )}
              </Col>
              <Col span={24}>
                <label className="text-xs">
                  <span className="text-red-600">*</span> Number Guest
                </label>
                <Controller
                  name="soLuongKhach"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        size="large"
                        placeholder="Number Guest"
                        className="mt-1"
                        status={errors.soLuongKhach ? "error" : ""}
                      />
                    );
                  }}
                />
                {errors?.soLuongKhach && (
                  <>
                    <p className="text-xs text-red-600">
                      {(errors.soLuongKhach as any).message}
                    </p>
                  </>
                )}
              </Col>
              <Col span={24} className="flex justify-between">
                <Button size="large" type="primary" danger>
                  Cancel
                </Button>
                <Button htmlType="submit" size="large" type="primary">
                  Add Booking Room
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal>
      </>
    </div>
  );
};

export default AddRoomBookingManagement;
