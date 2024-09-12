import con from "../../../utils/Connection"
import { NextResponse } from "next/server"
import { subCategorySchema } from "@/validator/auth"

export const POST = async (req) => {

  const current_time = new Date()
  
  const time = Math.floor(current_time.getTime() / 1000)

  const insertSubCategoryQuery = `INSERT INTO sub_category (sub_category, sub_category_type, sub_category_relation_id, sub_category_created_at) VALUES (?, ?, ?, ?)`

  const findSubCategoryQuery = "SELECT * FROM sub_category WHERE sub_category = ?"

  const findSubCategoryQueryById = "SELECT * FROM sub_category WHERE id = ?"

  const body = await req.json()
  const parsed = subCategorySchema.safeParse(body)

  try {
    if (!parsed.success) {
      const err = parsed.error.flatten()
      return NextResponse.json(
        { error: "Some of the fields are missing", fieldError: err.fieldErrors, status: 0 },
        { status: 400 }
      )
    }

    const { sub_category, sub_category_type, sub_category_relation_id } = parsed.data


    const [findSubCategoryExecute] = await con.query(findSubCategoryQuery, [sub_category])

    if (findSubCategoryExecute.length > 0) {
      return NextResponse.json(
        { error: "Sub category already exists", message: "Sub category already exists", status: 0 },
        { status: 409 }
      )
    }

    const [insertSubCategoryExecute] = await con.query(insertSubCategoryQuery, [sub_category, sub_category_type, sub_category_relation_id, time])

    const [newSubCategory] = await con.query(findSubCategoryQueryById, [insertSubCategoryExecute.insertId])

    return NextResponse.json(
      { data: newSubCategory[0], message: "Sub category added successfully", status: 1 },
      { status: 201 }
    )

  } catch (error) {
    console.error('error', error);
    return NextResponse.json({ error: "Something went wrong", details: error.message }, { status: 400 })
  }
}
