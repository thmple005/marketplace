"use client";
import Link from "next/link";
import React from 'react'
import "../auth.css";
import { IoBriefcaseOutline } from "react-icons/io5";
import { FaLaptop } from "react-icons/fa6";

const Category = () => {
    const [selectedOption, setSelectedOption] = React.useState("");

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        localStorage.setItem("userRole",e.target.value)
    };

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
                                <h2 className="title">Join as a Seller or Buyer</h2>
                                {/* <p className="paragraph">
                  Give your visitor a smooth online experience with a solid UX
                  design
                </p> */}
                            </div>
                        </div>
                    </div>
                    <div className="row wow fadeInRight" data-wow-delay="300ms">
                        <div className="col-xl-6 mx-auto">
                            <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">

                                <div className="category-container justify-content-between flex-wrap mb40">
                                    <div className="box-container">
                                        <label className={`btn-box ${selectedOption === 'Seller' ? 'is-active' : ''}`}>
                                            <div className="btn-box-work">
                                                <div>
                                                    <IoBriefcaseOutline />
                                                </div>
                                                <input
                                                    type="radio"
                                                    name="SellerOrBuyer"
                                                    value="Seller"
                                                    checked={selectedOption === 'Seller'}
                                                    onChange={handleOptionChange}
                                                    className="btn-box-input"
                                                />
                                            </div>
                                            <div className="btn-box-label">
                                                <h4>I’m a Seller</h4>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="box-container">
                                        <label className={`btn-box ${selectedOption === 'Buyer' ? 'is-active' : ''}`}>
                                            <div className="btn-box-work">
                                                <div>
                                                    <FaLaptop />
                                                </div>
                                                <input
                                                    type="radio"
                                                    name="SellerOrBuyer"
                                                    value="Buyer"
                                                    checked={selectedOption === 'Buyer'}
                                                    onChange={handleOptionChange}
                                                    className="btn-box-input"
                                                />
                                            </div>
                                            <div className="btn-box-label">
                                                <h4>I’m a Buyer</h4>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <Link href="/register">
                                    <div className="d-grid mb20">
                                        <button
                                            className="ud-btn btn-thm default-box-shadow2"
                                            type="submit"
                                        >
                                            Creat Account{" "}
                                            <i className="fal fa-arrow-right-long" />
                                        </button>
                                    </div>
                                </Link>


                                <div className="mb30">
                                    {/* <h4>Let's create your account!</h4> */}
                                    <p className="text mt20">
                                        Already have an account?{" "}
                                        <Link href="/login" className="text-thm">
                                            Log In!
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Category