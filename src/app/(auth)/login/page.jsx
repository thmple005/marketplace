"use client";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { UseLogin } from "../api.js";

const LoginSchema = Yup.object().shape({
  user_email: Yup.string().email("Invalid email").required("Required"),
  user_password: Yup.string().required("Please Enter your password"),
});

export default function Page() {
  const { mutate, isLoading } = UseLogin();

  return (
    <>
      <section className="our-login">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 m-auto wow fadeInUp"
              data-wow-delay="300ms"
            >
              <div className="main-title text-center">
                <h2 className="title">Log In</h2>
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
                  <h4>We're glad to see you again!</h4>
                  <p className="text">
                    Don't have an account?{" "}
                    <Link href="/user-category" className="text-thm">
                      Sign Up!
                    </Link>
                  </p>
                </div>

                <Formik
                  initialValues={{
                    user_email: "",
                    user_password: "",
                  }}
                  validationSchema={LoginSchema}
                  onSubmit={async (values) => {
                    mutate(values);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
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
                      <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb20">
                        <label className="custom_checkbox fz14 ff-heading">
                          Remember me
                          <input type="checkbox" defaultChecked="checked" />
                          <span className="checkmark" />
                        </label>
                        <Link href='/forgot-password'><span className="fz14 ff-heading">Lost your password?</span></Link>
                      </div>
                      <div className="d-grid mb20">
                        <button
                          className="ud-btn btn-thm"
                          type="submit"
                          disabled={isLoading}
                        >
                          Log In <i className="fal fa-arrow-right-long" />
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
