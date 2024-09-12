import con from "../../../utils/Connection";
import { generateIdFromEntropySize } from "lucia";
import { NextResponse } from "next/server";
import { hash } from "@node-rs/argon2";
import otpGenerator from "otp-generator";
import { signupSchema } from "@/validator/auth";
import { signupConfirmation } from "@/utils/sendEmail";
import { stat } from "@babel/core/lib/gensync-utils/fs";
// import { signupConfirmation } from "@/utils/sendEmail";

export const POST = async (req) => {
  console.log('req',req);
  const findUserQuery = "SELECT * FROM user WHERE user_email = ?";
  const insertQuery=`INSERT INTO user (id,user_email,user_display_name,user_name,user_role,user_password,user_verification_otp) VALUES (?,?,?,?,?,?,?)`
  const body = await req.json();

  const otp = otpGenerator.generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  try{
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      const err = parsed.error.flatten();
      return NextResponse.json({ error: "Some of the fields are missing",fieldError:err.fieldErrors,status:0 }, { status: 400 })
    }
    const { user_email, user_password,user_name,user_display_name,user_role } = parsed.data;
    const [findUserExecute] = await con.query(findUserQuery, [user_email]);
  
    if (findUserExecute.length>0) {
      return NextResponse.json({ error: "User already existed with this email",message:'User already existed with this email',status:0 }, { status: 409 })
    }
  
    const passwordHash = await hash(user_password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1
    });

    const userId = generateIdFromEntropySize(10);
    await con.query(insertQuery, [userId,user_email,user_display_name,user_name,user_role,passwordHash,otp]);
    const response=await signupConfirmation(user_name,user_email,otp)
    console.log('response',response);
    const [findUpdatedUserExecute] = await con.query(findUserQuery, [user_email]);
    return NextResponse.json({ data: findUpdatedUserExecute[0],message:'Success',status:1 }, { status: 201 })

  }
  catch(error){
   console.log('error',error);
   return NextResponse.json({ error: error }, { status: 400 })
  }
	
};
