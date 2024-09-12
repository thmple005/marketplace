import con from "../../../utils/Connection";
import { NextResponse } from "next/server";
import otpGenerator from "otp-generator";
import { forgotPasswordSchema } from "@/validator/auth";
import { resetPasswordConfirmation } from "@/utils/sendEmail";

export const POST = async (req) => {
  const findUserQuery = "SELECT user_email,user_name FROM user WHERE user_email = ?";
  const updateUserQuery = `UPDATE user SET user_forgot_password_otp=? WHERE user_email=?`;
  const body = await req.json();

  const otp = otpGenerator.generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  try {
    const parsed = forgotPasswordSchema.safeParse(body);
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
    const { user_email} = parsed.data;
    const [findUserExecute] = await con.query(findUserQuery, [user_email]);

    if (findUserExecute.length === 0) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }
      await con.query(updateUserQuery, [otp, user_email]);
     const response=await resetPasswordConfirmation(findUserExecute[0].user_name,user_email,otp)
     console.log('response',response);
      const [findUpdatedUserExecute] = await con.query(findUserQuery, [
        user_email,
      ]);
      return NextResponse.json(
        { data: findUpdatedUserExecute, message: "Success", status: 1 },
        { status: 200 }
      );
    
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
};
