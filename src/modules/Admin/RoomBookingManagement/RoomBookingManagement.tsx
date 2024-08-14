import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Breadcrumb,
  Button,
  Pagination,
  Popconfirm,
  PopconfirmProps,
  Table,
  Typography,
} from "antd";
import { roomBookingApi } from "../../../apis/roomBooking.api";
import moment from "moment";
import { RoomBooking } from "../../../interfaces/roomBooking.interface";
import { useState } from "react";
import AddRoomBookingManagement from "./AddRoomBookingManagement";
import EditRoomBookingManagement from "./EditRoomBookingManagement";
const RoomBookingManagement = () => {
  const queryClient = useQueryClient();

  // EDIT FORM
  const [dataEdit, setDataEdit] = useState<RoomBooking | null>(null);

  // MODAL OPEN
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // CLOSE MODAL
  const cancel: PopconfirmProps["onCancel"] = () => {
    return;
  };

  //GET BOOKING ROOM
  const { data: dataBookingRoom, isLoading: dataBookingLoading } = useQuery({
    queryKey: ["list-bookingRoom"],
    queryFn: () => roomBookingApi.getListRoomBooking(),
  });

  const bookingRoomList = Array.isArray(dataBookingRoom)
    ? dataBookingRoom.slice(0, 50)
    : [];

  //DELETE BOOKING ROOM
  const { mutate: handleDeleteRoomBooking, isPending: isDeleting } =
    useMutation({
      mutationFn: (roomId: string) => roomBookingApi.deleteRoomBooking(roomId),
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ["list-bookingRoom"],
          type: "active",
        });
      },
      onError: (error: any) => {
        console.log("🚀error---->", error);
      },
    });

  const columns = [
    { title: "Id", key: "Id", dataIndex: "id" },
    { title: "Room Code", key: "maPhong", dataIndex: "maPhong" },
    {
      title: "Coming Date",
      key: "ngayDen",
      dataIndex: "ngayDen",
      render: (date: string) => {
        return <Typography>{moment(date).format("DD/MM/YYYY")}</Typography>;
      },
    },
    {
      title: "Leave Date",
      key: "ngayDi",
      dataIndex: "ngayDi",
      render: (date: string) => {
        return <Typography>{moment(date).format("DD/MM/YYYY")}</Typography>;
      },
    },
    {
      title: "Number Guest",
      key: "soLuongKhach",
      dataIndex: "soLuongKhach",
    },
    {
      title: "Action",
      key: "action",
      render: (record: RoomBooking) => {
        return (
          <div className="flex">
            <Button
              type="primary"
              className="mr-2"
              onClick={() => {
                setIsModalOpen(true);
                setDataEdit(record);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete User"
              description="Are you sure to delete this user?"
              onConfirm={() => handleDeleteRoomBooking(record.id.toString())}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                className="mr-2"
                disabled={isDeleting}
              >
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const dataSource = bookingRoomList || [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            {
              title: "DashBoard",
            },
            {
              title: "ADD BOOKING ROOM",
              href: "",
            },
          ]}
        />
        <Button
          size="large"
          type="primary"
          onClick={() => setIsModalOpen(true)}
        >
          ADD BOOKING ROOM
        </Button>
      </div>
      <h2 className="mt-4 font-bold">Booking Room</h2>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        loading={dataBookingLoading}
      />

      <div className="mt-3 flex justify-end">
        {/* <Pagination total={100} /> */}
      </div>
      <div>
        <AddRoomBookingManagement
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
      <div>
        <EditRoomBookingManagement
          dataEdit={dataEdit}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </div>
  );
};

export default RoomBookingManagement;
