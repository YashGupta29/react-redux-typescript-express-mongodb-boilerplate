import React from "react";
import { useFormik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { isExpired } from "react-jwt";
import "yup-phone";
import "./ResetPasswordContainer.css";

// loader
import { ClipLoader } from "react-spinners";

// hooks
import { useAppDispatch } from "../../hooks/hooks";

// reducers
import { resetPassword } from "../../store/auth/authSlice";

// components
import Layout from "../../components/Layout/Layout";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const ResetPasswordConatiner = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // state
  const [isLoading, setIsLoading] = React.useState(false);
  // form
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      password: Yup.string()
        .required()
        .min(8, "Password should be of minimum 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
          "Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .label("Password"),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password")], "Password must match")
        .label("Confirm Password"),
    }),
    onSubmit: async (values, { resetForm, setFieldError }) => {
      setIsLoading(true);
      const res = await dispatch(
        resetPassword({
          password: values.password,
          token: searchParams.get("token"),
        })
      );
      if (res.type === "auth/resetPassword/fulfilled") {
        resetForm();
        navigate("/login");
      }
      setIsLoading(false);
    },
  });

  // function
  const verifyToken = () => {
    const token = searchParams.get("token");
    if (token) {
      const isTokenExpired = isExpired(token);
      if (isTokenExpired) {
        navigate("/forgot-password");
        alert("This link is expired please generate a new link");
      }
    }
  };

  React.useEffect(() => {
    verifyToken();
  }, []);

  return (
    <Layout pageTitle="Reset Password">
      <div className="reset-password-container container-xxl">
        <div className="reset-password-form-wrapper">
          <div className="reset-password-form-heading">
            <h1 className="Reset-password-form-title">Reset your password</h1>
          </div>
          <form className="reset-password-form" onSubmit={formik.handleSubmit}>
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
            <Input
              name={"confirmPassword"}
              type={"password"}
              placeholder={"Confirm Password"}
              onChange={(value) =>
                formik.setFieldValue("confirmPassword", value || "")
              }
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              error={
                formik.touched.confirmPassword
                  ? formik.errors.confirmPassword
                  : ""
              }
              fullWidth
            />
            <div className="p-2">
              <Button
                type={"submit"}
                variant="contained"
                label={
                  <div className="spinner">
                    Reset Password{" "}
                    {isLoading && <ClipLoader loading={isLoading} size={20} />}
                  </div>
                }
                fullWidth
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPasswordConatiner;
