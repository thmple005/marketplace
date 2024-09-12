"use client";
import "../auth.css";
import { UseNewPassword } from "../api";
import { Field, Formik,Form } from "formik";
import * as Yup from "yup";
import OtpInput from "react-otp-input";
import { useState } from "react";

const ForgotSchema = Yup.object().shape({
  user_password: Yup.string()
  .required('Password is required').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  ),
  confirm_password: Yup.string().oneOf([Yup.ref('user_password'), null], 'Passwords must match')
  .required('Confirm Password is required'),
});

export default function Page() {
  const { mutate, isLoading } = UseNewPassword();
  const [otp, setOtp] = useState("");

  return (
    <section className="our-login">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto wow fadeInUp" data-wow-delay="300ms">
            <div className="main-title text-center">
              <h2 className="title">New Password</h2>
              <p className="paragraph">
                Give your visitor a smooth online experience with a solid UX
                design
              </p>
            </div>
          </div>

          <div className="row wow fadeInRight" data-wow-delay="300ms">
            <div className="col-xl-6 mx-auto">
              <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                <div className="mb30">
                  <h4>We're glad to see you again!</h4>
                </div>

                <div>
                  <label className="form-label fw500 dark-color">Otp</label>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={"form-control enter-otp"}
                    containerStyle={"otp-container"}
                  />
                </div>

                <div>
                  <Formik
                    initialValues={{
                      user_password: "",
                      confirm_password: "",
                    }}
                    validationSchema={ForgotSchema}
                    onSubmit={(values) => {
                      const userEmail = localStorage.getItem("userEmail");
                      const payload = {
                        user_email: userEmail,
                        user_otp: otp,
                        new_password: values.user_password,
                      };
                      mutate(payload);
                    }}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <div className="mb25">
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

                        <div className="mb15">
                          <label className="form-label fw500 dark-color">
                            Confirm Password
                          </label>
                          <Field
                            type="password"
                            className="form-control"
                            placeholder="*******"
                            name="confirm_password"
                          />
                          {errors.confirm_password && touched.confirm_password ? (
                            <div className="display-error">
                              {errors.confirm_password}
                            </div>
                          ) : null}
                        </div>

                        <div className="d-grid mb20">
                          <button
                            className="ud-btn btn-thm"
                            type="submit"
                            disabled={isLoading}
                          >
                            Submit <i className="fal fa-arrow-right-long" />
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
