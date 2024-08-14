import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { useAppSelector } from "../redux/slices/hook";
import { PATH } from "./path";
import { Login } from "../Auth/Login";
import { AuthLayout } from "../layouts/AuthLayout";
import { Register } from "../Auth/Register";
import { AdminLayout } from "../layouts/AdminLayout";
import { UserManagement } from "../modules/Admin/UserManagement";
import { LocalManagement } from "../modules/Admin/LocationManagement";
import { RoomManagement } from "../modules/Admin/RoomManagement";
import { RoomBookingManagement } from "../modules/Admin/RoomBookingManagement";
import HomePage from "../pages/HomePage";
import { UserLayout } from "../layouts/UserLayout";
import DetailLocation from "../pages/DetailLocation/DetailLocation";

const RejectedRouter = () => {
  const { currentUser } = useAppSelector((state) => state.userAuthentication);
  console.log("🚀currentUser---->", currentUser);

  if (currentUser === null) {
    return <Outlet />;
  }
  return currentUser.role === "ADMIN" ? (
    <Navigate to={PATH.ADMIN} />
  ) : (
    <Navigate to={PATH.HOME} />
  );
};

const ProtectedRouter = () => {
  const { currentUser } = useAppSelector((state) => state.userAuthentication);
  console.log("🚀currentUser---->", currentUser);

  if (currentUser === null) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return currentUser.role === "ADMIN" ? (
    <Outlet />
  ) : (
    <Navigate to={PATH.HOME} />
  );
};

const useRouterElement = () => {
  const routes = useRoutes([
    {
      path: "auth",
      element: <RejectedRouter />,
      children: [
        {
          path: PATH.LOGIN,
          element: (
            <AuthLayout>
              <Login />
            </AuthLayout>
          ),
        },
        {
          path: PATH.REGISTER,
          element: (
            <AuthLayout>
              <Register />
            </AuthLayout>
          ),
        },
      ],
    },
    {
      path: PATH.ADMIN,
      element: <ProtectedRouter />,
      children: [
        {
          index: true,
          element: <Navigate to={PATH.ADMIN_USER} />,
        },
        {
          path: PATH.ADMIN_USER,
          element: (
            <AdminLayout>
              <UserManagement />
            </AdminLayout>
          ),
        },
        {
          path: PATH.ADMIN_LOCATION,
          element: (
            <AdminLayout>
              <LocalManagement />
            </AdminLayout>
          ),
        },
        {
          path: PATH.ADMIN_ROOM,
          element: (
            <AdminLayout>
              <RoomManagement />
            </AdminLayout>
          ),
        },
        {
          path: PATH.ADMIN_ROOM_BOOKING,
          element: (
            <AdminLayout>
              <RoomBookingManagement />
            </AdminLayout>
          ),
        },
      ],
    },
    {
      path: PATH.HOME,
      element: (
        <UserLayout>
          <HomePage />
        </UserLayout>
      ),
    },
    {
      path: PATH.LOCATION_DETAIL,
      element: (
        <UserLayout>
          <DetailLocation />
        </UserLayout>
      ),
    },
  ]);

  return routes;
};

export default useRouterElement;
