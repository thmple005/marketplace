"use client";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../auth.css";
import { UseSignup } from "../api";
import { useRouter } from "next/navigation";
import { message } from "antd";

const SignupSchema = Yup.object().shape({
  user_display_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  user_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  user_email: Yup.string().email("Invalid email").required("Required"),
  user_password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});
export default function Page() {
  const router = useRouter();

  const { mutate, isLoading } = UseSignup();
  async function onSubmit(values) {
    const userRole = localStorage.getItem("userRole");
    
    if(!userRole){
      message.error('Please select role first.')
      router.push('/select-role')
    }

    const payload = { ...values, user_role: userRole };
    mutate(payload);
  }

  return (
    <>
      <section className="our-register">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 m-auto wow fadeInUp"
              data-wow-delay="300ms"
            >
              <div className="main-title text-center">
                <h2 className="title">Register</h2>
                <p className="paragraph">
                  Give your visitor a smooth online experience with a solid UX
                  design
                </p>
              </div>
            </div>
          </div>
          <div className="row wow fadeInRight" data-wow-delay="300ms">
            <div className="col-xl-6 mx-auto">
              <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                <div className="mb30">
                  <h4>Let's create your account!</h4>
                  <p className="text mt20">
                    Already have an account?{" "}
                    <Link href="/login" className="text-thm">
                      Log In!
                    </Link>
                  </p>
                </div>
                <Formik
                  initialValues={{
                    user_display_name: "",
                    user_name: "",
                    user_email: "",
                    user_password: "",
                  }}
                  validationSchema={SignupSchema}
                  onSubmit={onSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="mb25">
                        <label className="form-label fw500 dark-color">
                          Display Name
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          placeholder="ali"
                          name="user_display_name"
                        />
                        {errors.user_display_name &&
                        touched.user_display_name ? (
                          <div className="display-error">
                            {errors.user_display_name}
                          </div>
                        ) : null}
                      </div>

                      <div className="mb25">
                        <label className="form-label fw500 dark-color">
                          Username
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          placeholder="alitf"
                          name="user_name"
                        />
                        {errors.user_name && touched.user_name ? (
                          <div className="display-error">
                            {errors.user_name}
                          </div>
                        ) : null}
                      </div>
                      <div className="mb25">
                        <label className="form-label fw500 dark-color">
                          Email
                        </label>
                        <Field
                          type="email"
                          className="form-control"
                          placeholder="alitfn58@gmail.com"
                          name="user_email"
                        />
                        {errors.user_email && touched.user_email ? (
                          <div className="display-error">
                            {errors.user_email}
                          </div>
                        ) : null}
                      </div>
                      <div className="mb15">
                        <label className="form-label fw500 dark-color">
                          Password
                        </label>
                        <Field
                          type="password"
                          className="form-control"
                          placeholder="*******"
                          name="user_password"
                        />
                        {errors.user_password && touched.user_password ? (
                          <div className="display-error">
                            {errors.user_password}
                          </div>
                        ) : null}
                      </div>
                      <div className="d-grid mb20">
                        <button
                          className="ud-btn btn-thm default-box-shadow2"
                          type="submit"
                          disabled={isLoading}
                        >
                          Creat Account{" "}
                          <i className="fal fa-arrow-right-long" />
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
                <div className="hr_content mb20">
                  <hr />
                  <span className="hr_top_text">OR</span>
                </div>
                <div className="d-md-flex justify-content-between">
                  <button
                    className="ud-btn btn-fb fz14 fw400 mb-2 mb-md-0"
                    type="button"
                  >
                    <i className="fab fa-facebook-f pr10" /> Continue Facebook
                  </button>
                  <button
                    className="ud-btn btn-google fz14 fw400 mb-2 mb-md-0"
                    type="button"
                  >
                    <i className="fab fa-google" /> Continue Google
                  </button>
                  <button className="ud-btn btn-apple fz14 fw400" type="button">
                    <i className="fab fa-apple" /> Continue Apple
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
