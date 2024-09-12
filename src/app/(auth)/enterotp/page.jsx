"use client";
import { useState } from "react";
import OtpInput from "react-otp-input";
import "../auth.css";
import { UseEnterOtp } from "../api";
import { message } from "antd";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [otp, setOtp] = useState("");

  const { mutate, isLoading } = UseEnterOtp();

  const handleOtpSubmit = () => {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      message.error("Email not found");
      return;
    }

    const payload = { user_email: userEmail, user_otp: otp };

    mutate(payload)
  };

  return (
    <section className="our-login">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto wow fadeInUp" data-wow-delay="300ms">
            <div className="main-title text-center">
              <h2 className="title">Enter Otp</h2>
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
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={"form-control enter-otp"}
                    containerStyle={"otp-container"}
                  />
                </div>
                <div className="d-grid mb20">
                  <button
                    className="ud-btn btn-thm"
                    type="submit"
                    disabled={otp.length < 4 || isLoading}
                    onClick={handleOtpSubmit}
                  >
                    Submit <i className="fal fa-arrow-right-long" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
