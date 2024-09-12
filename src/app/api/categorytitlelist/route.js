import con from "../../../utils/Connection"
import { NextResponse } from "next/server"

const isValEmptyArray = (array) => {
  return array.map(item => {
    return Object.fromEntries(Object.entries(item).filter(([_, value]) => value !== null))
  })
}

export const GET = async () => {

  const categoryTitleQuery = `SELECT * FROM category_title `

  try {

    const [categoriesTitleExecute] = await con.query(categoryTitleQuery)

    if (categoriesTitleExecute.length === 0) {
      return NextResponse.json({ message: "No categories title found", status: 0 }, { status: 404 })
    }

    const removeNullValues = isValEmptyArray(categoriesTitleExecute)

    return NextResponse.json({ data: removeNullValues, message: "Success", status: 1 }, { status: 200 })

  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Something went wrong", details: error.message, status: 0 }, { status: 500 })
  }
}


