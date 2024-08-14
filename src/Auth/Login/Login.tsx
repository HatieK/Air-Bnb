import { Button, Col, Form, Input, Row, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { ERROR_MESSAGE, maxLength, minLength } from "../../constants/general";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { userApi } from "../../apis/user.api";
import { CurrentUser, UserLoginRequest } from "../../interfaces/user.interface";
import { setLocalStorage } from "../../util";
import { useAppDispatch } from "../../redux/slices/hook";
import { setUser } from "../../redux/slices/userSlice";

interface FormValues {
  email: string;
  password: string;
}
const schema = yup.object({
  email: yup
    .string()
    .trim()
    .required(ERROR_MESSAGE.email.required)
    .matches(ERROR_MESSAGE.email.regex, ERROR_MESSAGE.email.errorRegex),
  password: yup
    .string()
    .trim()
    .notRequired()
    .required(ERROR_MESSAGE.password.required)
    .matches(ERROR_MESSAGE.password.regex, ERROR_MESSAGE.password.errorRegex),
});

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });

  const dispatch = useAppDispatch();

  const { mutate: handleLogin } = useMutation({
    mutationFn: (payload: UserLoginRequest) => userApi.login(payload),
    onSuccess: (currentUser) => {
      setLocalStorage<CurrentUser>("user", currentUser);

      dispatch(setUser(currentUser));
    },
    onError: (error: any) => {
      console.log("🚀error---->", error);
    },
  });

  const onSubmit = (values: FormValues) => {
    handleLogin(values);
  };

  return (
    <div className="w-[400px]">
      <div className="my-4 text-center">
        <Typography className="text-3xl font-bold">Đăng nhập</Typography>
        <Typography className="mt-2">Hi, Chào mừng bạn quay lại 👋</Typography>
      </div>

      <Form onFinish={handleSubmit(onSubmit)}>
        <Row gutter={[48, 16]}>
          <Col span={24}>
            <label className="text-xs text-[#6A7280]">*Tài khoản</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="text"
                    size="large"
                    className="mt-1"
                    placeholder="Vui lòng nhập tài khoản..."
                    status={errors.email ? "error" : ""}
                  />
                );
              }}
            />
            {errors?.email && (
              <>
                <p className="text-xs text-red-600">
                  {(errors.email as any).message}
                </p>
              </>
            )}
          </Col>
          <Col span={24}>
            <label className="text-xs text-[#6A7280]">*Mật khẩu</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="password"
                    size="large"
                    className="mt-1"
                    placeholder="Vui lòng nhập mật khẩu..."
                    status={errors.password ? "error" : ""}
                  />
                );
              }}
            />
            {errors?.password && (
              <p className="text-xs text-red-600">{errors.password.message}</p>
            )}
          </Col>

          <Col span={24}>
            <Button type="primary" htmlType="submit" size="large" block>
              Đăng nhập
            </Button>
          </Col>
        </Row>
      </Form>

      <Typography className="mt-8 text-center">
        Chưa có tài khoản?{" "}
        <span className="cursor-pointer font-medium text-blue-700">
          Tạo tài khoản
        </span>
      </Typography>
    </div>
  );
};

export default Login;
