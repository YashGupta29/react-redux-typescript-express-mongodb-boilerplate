import React from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "yup-phone";
import "./RegisterContainer.css";

// loader
import { ClipLoader } from "react-spinners";

// hooks
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

// reducers
import { registerUserWithEmailAndPassword } from "../../store/auth/authSlice";
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

const RegisterContainer = () => {
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation() as LocationProps;
  // state
  const [isLoading, setIsLoading] = React.useState(false);
  // form
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required().label("Full Name"),
      email: Yup.string().email().required().label("Email Address"),
      password: Yup.string()
        .required()
        .min(8, "Password should be of minimum 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
          "Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .label("Password"),
    }),
    onSubmit: async (values, { resetForm, setFieldError }) => {
      setIsLoading(true);
      const res = await dispatch(registerUserWithEmailAndPassword(values));
      if (res.type === "auth/registerWithEmailAndPassword/fulfilled") {
        resetForm();
        dispatch(successMessage("Registered successfully"));
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

  return (
    <Layout pageTitle="Register">
      <div className="register-container container-xxl">
        <div className="register-form-wrapper">
          <div className="register-form-heading">
            <h1 className="register-form-title">Register</h1>
            <p className="register-form-toggle">
              Already have an account?{" "}
              <span onClick={() => navigate("/login")}>Login</span>
            </p>
          </div>
          <form className="register-form" onSubmit={formik.handleSubmit}>
            <Input
              name={"name"}
              type={"text"}
              placeholder={"Full Name"}
              onChange={(value) => formik.setFieldValue("name", value || "")}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={formik.touched.name ? formik.errors.name : ""}
              fullWidth
            />
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
                    Register{" "}
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

export default RegisterContainer;
