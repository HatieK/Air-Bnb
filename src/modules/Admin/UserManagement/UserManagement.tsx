import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Breadcrumb,
  Button,
  message,
  Pagination,
  Popconfirm,
  PopconfirmProps,
  Table,
  Tag,
} from "antd";
import { userApi } from "../../../apis/user.api";
import { USER_TYPES_MAPPING } from "../../../constants/general";
import { User } from "../../../interfaces/user.interface";

const UserManagement = () => {
  const queryClient = useQueryClient();

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    return;
  };

  const { data: dataUser, isLoading: dataUserLoading } = useQuery({
    queryKey: ["list-users"],
    queryFn: () => userApi.getListUser(),
  });

  const { mutate: handleDeleteUser, isPending: isDeleting } = useMutation({
    mutationFn: (userId: number) => userApi.deleteUser(userId),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["list-users"],
        type: "active",
      });
    },
    onError: (error: any) => {
      console.log("🚀error---->", error);
    },
  });

  const userList = dataUser?.slice(0, 50);

  const dataSource = userList || [];

  const columns = [
    { title: "Id", key: "Id", dataIndex: "id" },
    { title: "Username", key: "username", dataIndex: "taiKhoan" },
    { title: "Email", key: "email", dataIndex: "email" },
    { title: "Birthday", key: "birthday", dataIndex: "birthday" },
    { title: "Gender", key: "gender", dataIndex: "gender" },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      render: (_: any, { role }: { role: string }) => {
        return <Tag>{USER_TYPES_MAPPING[role] || ""}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record: User) => {
        return (
          <div className="flex">
            <Button type="primary" className="mr-2">
              Edit
            </Button>
            <Popconfirm
              title="Delete User"
              description="Are you sure to delete this user?"
              onConfirm={() => handleDeleteUser(record.id)}
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

  return (
    <div>
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            {
              title: "DashBoard",
            },
            {
              title: "User Management",
              href: "",
            },
          ]}
        />
        <Button size="large" type="primary">
          ADD USER
        </Button>
      </div>
      <h2 className="mt-4 font-bold">List User</h2>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        loading={dataUserLoading}
      />

      <div className="mt-3 flex justify-end">
        <Pagination total={100} />
      </div>
    </div>
  );
};

export default UserManagement;
