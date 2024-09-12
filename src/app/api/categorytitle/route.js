import con from "../../../utils/Connection"
import { NextResponse } from "next/server"
import { categoryTitleSchema } from "@/validator/auth"

export const POST = async (req) => {

  const current_time = new Date()
  
  const time = Math.floor(current_time.getTime() / 1000)

  const insertCategoryTitleQuery = `INSERT INTO category_title (title, title_type, title_relation_id, title_created_at) VALUES (?, ?, ?, ?)`

  const findCategoryTitleQuery = "SELECT * FROM category_title WHERE title = ?"

  const findCategoryTitleQueryById = "SELECT * FROM category_title WHERE title_id = ?"

  const body = await req.json()
  const parsed = categoryTitleSchema.safeParse(body)

  try {
    if (!parsed.success) {
      const err = parsed.error.flatten()
      return NextResponse.json(
        { error: "Some of the fields are missing", fieldError: err.fieldErrors, status: 0 },
        { status: 400 }
      )
    }

    const { title, title_type, title_relation_id } = parsed.data


    const [findCategoryTitleExecute] = await con.query(findCategoryTitleQuery, [title])

    if (findCategoryTitleExecute.length > 0) {
      return NextResponse.json(
        { error: "Category title already exists", message: "Category title already exists", status: 0 },
        { status: 409 }
      )
    }

    const [insertCategoryTitleExecute] = await con.query(insertCategoryTitleQuery, [title, title_type, title_relation_id, time])

    const [newCategoryTitle] = await con.query(findCategoryTitleQueryById, [insertCategoryTitleExecute.insertId])

    return NextResponse.json(
      { data: newCategoryTitle[0], message: "Category title added successfully", status: 1 },
      { status: 201 }
    )

  } catch (error) {
    console.error('error', error);
    return NextResponse.json({ error: "Something went wrong", details: error.message }, { status: 400 })
  }
}
