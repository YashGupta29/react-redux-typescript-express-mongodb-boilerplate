import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "yup-phone";
import "./ForgotPasswordContainer.css";

// loader
import { ClipLoader } from "react-spinners";

// hooks
import { useAppDispatch } from "../../hooks/hooks";

// reducers
import { forgotPassword } from "../../store/auth/authSlice";
import { successMessage } from "../../store/alert/alertSlice";

// components
import Layout from "../../components/Layout/Layout";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const ForgotPasswordConatiner = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // state
  const [isLoading, setIsLoading] = React.useState(false);
  // form
  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email().required().label("Email Address"),
    }),
    onSubmit: async (values, { resetForm, setFieldError, setFieldTouched }) => {
      setIsLoading(true);
      const res = await dispatch(forgotPassword(values));
      if (res.type === "auth/forgotPassword/fulfilled") {
        resetForm();
        dispatch(successMessage("Reset link successfully sent to email"));
      } else setFieldError("email", res.payload as string);
      setIsLoading(false);
    },
  });

  // function

  return (
    <Layout pageTitle="Forgot Password">
      <div className="forgot-password-container container-xxl">
        <div className="forgot-password-form-wrapper">
          <div className="forgot-password-form-heading">
            <h1 className="forgot-password-form-title">
              Forgot your password?
            </h1>
            <p className="forgot-password-form-toggle">
              Remember password?{" "}
              <span onClick={() => navigate("/login")}>Login</span>
            </p>
          </div>
          <p className="forgot-password-form-toggle p-4">
            Enter the email address associated with your account, and we'll
            email you a link to reset your password.
          </p>
          <form className="forgot-password-form" onSubmit={formik.handleSubmit}>
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
            <div className="p-2">
              <Button
                type={"submit"}
                variant="contained"
                label={
                  <div className="spinner">
                    Send reset link{" "}
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

export default ForgotPasswordConatiner;
