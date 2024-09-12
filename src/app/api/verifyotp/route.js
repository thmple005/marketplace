import con from "../../../utils/Connection";
import { NextResponse } from "next/server";
import otpGenerator from "otp-generator";
import { verifyOtpSchema } from "@/validator/auth";

export const POST = async (req) => {
  console.log("req", req);
  const findUserQuery = "SELECT * FROM user WHERE user_email = ?";
  const updateUserQuery = `UPDATE user SET user_verification_otp=?,user_is_verified=1 WHERE user_email=?`;
  const body = await req.json();

  const otp = otpGenerator.generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  try {
    const parsed = verifyOtpSchema.safeParse(body);
    if (!parsed.success) {
      const err = parsed.error.flatten();
      return NextResponse.json(
        {
          error: "Some of the fields are missing",
          fieldError: err.fieldErrors,
        },
        { status: 400 }
      );
    }
    const { user_email, user_otp } = parsed.data;
    const [findUserExecute] = await con.query(findUserQuery, [user_email]);

    if (findUserExecute.length === 0) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }

    if (user_otp === findUserExecute[0].user_verification_otp) {
      await con.query(updateUserQuery, [otp, user_email]);
      const [findUpdatedUserExecute] = await con.query(findUserQuery, [
        user_email,
      ]);
      return NextResponse.json(
        { data: findUpdatedUserExecute[0], message: "Success", status: 1 },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Wrong otp", message: "Wrong otp", status: 0 },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
};
