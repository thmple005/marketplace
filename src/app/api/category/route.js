import con from "../../../utils/Connection"
import { NextResponse } from "next/server"
import { categorySchema } from "@/validator/auth"

export const POST = async (req) => {

  const current_time = new Date()
  
  const time = Math.floor(current_time.getTime() / 1000)

  const insertCategoryQuery = `INSERT INTO category (category, category_type, category_created_at) VALUES (?, ?, ?)`

  const findCategoryQuery = "SELECT * FROM category WHERE category = ?"

  const findCategoryQueryById = "SELECT * FROM category WHERE category_id = ?"

  const body = await req.json()
  const parsed = categorySchema.safeParse(body)

  try {
    if (!parsed.success) {
      const err = parsed.error.flatten()
      return NextResponse.json(
        { error: "Some of the fields are missing", fieldError: err.fieldErrors, status: 0 },
        { status: 400 }
      )
    }

    const { category, category_type } = parsed.data


    const [findCategoryExecute] = await con.query(findCategoryQuery, [category])

    if (findCategoryExecute.length > 0) {
      return NextResponse.json(
        { error: "Category already exists", message: "Category already exists", status: 0 },
        { status: 409 }
      )
    }

    const [insertCategoryExecute] = await con.query(insertCategoryQuery, [category, category_type, time])

    const [newCategory] = await con.query(findCategoryQueryById, [insertCategoryExecute.insertId])

    return NextResponse.json(
      { data: newCategory[0], message: "Category added successfully", status: 1 },
      { status: 201 }
    )

  } catch (error) {
    console.error('error', error);
    return NextResponse.json({ error: "Something went wrong", details: error.message }, { status: 400 })
  }
}
