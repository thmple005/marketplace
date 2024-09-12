"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function HeighestRetedCard2({ data, itemClass }) {
  const path = usePathname();

  return (
    <>
      <div
        className={`${
          itemClass
            ? itemClass
            : "freelancer-style1 text-center bdr1 hover-box-shadow mb60"
        } ${path !== "/home-10" ? "at-home7 bdrs4" : ""}`}
      >
        <div className="thumb w90 mb25 mx-auto position-relative rounded-circle">
          <Image
            height={90}
            width={90}
            className="rounded-circle mx-auto object-fit-cover"
            src={data.img}
            alt="avatar"
          />
          <span className="online" />
        </div>
        <div className="details">
          <h5 className="title mb-1">{data.name}</h5>
          <p className="mb-0">{data.skill}</p>
          <div className="review">
            <p>
              <i className="fas fa-star fz10 review-color pr10" />
              <span className="dark-color">{data.rating}</span> ({data.review}{" "}
              reviews)
            </p>
          </div>
          <div className="skill-tags d-flex align-items-center justify-content-center mb5">
            <span className="tag">Figma</span>
            <span className="tag mx10">Sketch</span>
            <span className="tag">HTML5</span>
          </div>
          <hr className="opacity-100 mt20 mb15" />
          <div className="fl-meta d-flex align-items-center justify-content-between">
            <a className="meta fw500 text-start">
              Location
              <br />
              <span className="fz14 fw400">{data.location}</span>
            </a>
            <a className="meta fw500 text-start">
              Rate
              <br />
              <span className="fz14 fw400">${data.hourlyRate} / hr</span>
            </a>
            <a className="meta fw500 text-start">
              Job Success
              <br />
              <span className="fz14 fw400">%{data.jobSuccess}</span>
            </a>
          </div>
          <div className="d-grid mt15">
            <Link
              href={`/freelancer-single/${data.id}`}
              className="ud-btn btn-white2 double-border bdrs4"
            >
              View Profile
              <i className="fal fa-arrow-right-long" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
