"use client";
import "../auth.css";
import { UseForgotPassword } from "../api";
import { Field, Formik,Form } from "formik";
import * as Yup from "yup";

const ForgotSchema = Yup.object().shape({
  user_email: Yup.string().email("Invalid email").required("Required"),
});
export default function Page() {
  const { mutate, isLoading } = UseForgotPassword();

  return (
    <section className="our-login">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto wow fadeInUp" data-wow-delay="300ms">
            <div className="main-title text-center">
              <h2 className="title">Forgot Password</h2>
              <p className="paragraph">
                Give your visitor a smooth online experience with a solid UX
                design
              </p>
            </div>
          </div>

          <div className="row wow fadeInRight" data-wow-delay="300ms">
            <div className="col-xl-6 mx-auto">
              <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                {/* <div className="mb30">
                  <h4>We're glad to see you again!</h4>
                </div> */}
                <div>
                  <Formik
                    initialValues={{
                      user_email: "",
                    }}
                    validationSchema={ForgotSchema}
                    onSubmit={(values) => {
                      console.log('values');
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
                        <div className="d-grid mb20">
                          <button
                            className="ud-btn btn-thm"
                            type="submit"
                            // disabled={isLoading}
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
