import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Button, Empty, Pagination, Popconfirm, Table } from "antd";
import { locationApi } from "../../../apis/location.api";
import { Location } from "../../../interfaces/location.interface";

const LocationManagement = () => {
  const queryClient = useQueryClient();

  //GET LOCATION
  const {
    data: dataLocation,
    isLoading: dataLocationLoading,
    error: locationError,
  } = useQuery({
    queryKey: ["list-location"],
    queryFn: () => locationApi.getLocationList(),
  });

  //DELETE LOCATION
  const { mutate: handleDeleteLocation, isPending: isDeleting } = useMutation({
    mutationFn: (locationId: string) => locationApi.deleteLocation(locationId),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["list-location"],
        type: "active",
      });
    },
    onError: (error: any) => {
      console.log("🚀error---->", error);
    },
  });

  const dataSource: any = dataLocation || [];

  const columns = [
    { title: "Id", key: "Id", dataIndex: "id" },
    { title: "Name Location", key: "tenViTri", dataIndex: "tenViTri" },
    { title: "Nation", key: "quocGia", dataIndex: "quocGia" },
    {
      title: "Image",
      key: "hinhAnh",
      render: (record: Location) => {
        return (
          <img
            src={record.hinhAnh}
            alt={record.hinhAnh}
            className="h-[120px] w-[100px] rounded-sm object-cover"
          />
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record: Location) => {
        return (
          <div className="flex">
            <Button type="primary" className="mr-2">
              Edit
            </Button>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => handleDeleteLocation(record.id.toString())}
              // onCancel={cancel}
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

  if (!dataLocationLoading && locationError) {
    return <Empty description="Không Có Dữ Liệu" />;
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <Breadcrumb
          items={[
            {
              title: "DashBoard",
            },
            {
              title: "Location Management",
              href: "",
            },
          ]}
        />
        <Button size="large" type="primary">
          ADD LOCATION
        </Button>
      </div>
      <h2 className="m-4 font-bold">List Location</h2>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        loading={dataLocationLoading}
      />

      <div className="mt-3 flex justify-end">
        {/* <Pagination total={100} /> */}
      </div>
    </div>
  );
};

export default LocationManagement;
