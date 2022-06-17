import React from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "yup-phone";
import "./LoginContainer.css";

// loader
import { ClipLoader } from "react-spinners";

// hooks
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

// reducers
import { loginUserWithEmailAndPassword } from "../../store/auth/authSlice";
import { successMessage } from "../../store/alert/alertSlice";

// components
import Layout from "../../components/Layout/Layout";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

// interfaces
interface LocationProps {
  state: {
    from: {
      pathname: string;
    };
  };
}

const LoginContainer = () => {
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation() as LocationProps;
  // state
  const [isLoading, setIsLoading] = React.useState(false);
  // form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email().required().label("Email Address"),
      password: Yup.string().required().label("Password"),
    }),
    onSubmit: async (values, { resetForm, setFieldError, setFieldTouched }) => {
      setIsLoading(true);
      const res = await dispatch(loginUserWithEmailAndPassword(values));
      if (res.type === "auth/loginWithEmailAndPassword/fulfilled") {
        resetForm();
        dispatch(successMessage("Logged in successfully"));
      } else setFieldError("email", res.payload as string);

      setIsLoading(false);
    },
  });

  // function
  React.useEffect(() => {
    if (loggedIn) {
      const from = (location?.state && location?.state?.from?.pathname) || "/";
      navigate(from, { replace: true });
    }
  }, [loggedIn, location, navigate]);

  React.useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);
  React.useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  return (
    <Layout pageTitle="Login">
      <div className="login-container container-xxl">
        <div className="login-form-wrapper">
          <div className="login-form-heading">
            <h1 className="login-form-title">Login</h1>
            <p className="login-form-toggle">
              Don't have an account?{" "}
              <span onClick={() => navigate("/register")}>Register</span>
            </p>
          </div>
          <form className="login-form" onSubmit={formik.handleSubmit}>
            <Input
              name={"email"}
              type={"email"}
              placeholder={"Email Address"}
              onChange={(value) => formik.setFieldValue("email", value || "")}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email ? formik.errors.email : ""}
              fullWidth
            />
            <Input
              name={"password"}
              type={"password"}
              placeholder={"Password"}
              onChange={(value) =>
                formik.setFieldValue("password", value || "")
              }
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password ? formik.errors.password : ""}
              fullWidth
            />
            <div className="p-2">
              <Button
                type={"submit"}
                variant="contained"
                label={
                  <div className="spinner">
                    Login{" "}
                    {isLoading && <ClipLoader loading={isLoading} size={20} />}
                  </div>
                }
                fullWidth
              />
            </div>
            <div
              className="login-form-forget-password p-2 cursor-pointer inline-block hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              Forget Password?
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LoginContainer;
