import con from "../../../utils/Connection"
import { NextResponse } from "next/server"

const isValEmptyArray = (array) => {
  return array.map(item => {
    return Object.fromEntries(Object.entries(item).filter(([_, value]) => value !== null))
  })
}

export const GET = async () => {

  const subCategoryQuery = `SELECT * FROM sub_category `

  try {

    const [subCategoryExecute] = await con.query(subCategoryQuery)

    if (subCategoryExecute.length === 0) {
      return NextResponse.json({ message: "No sub categories found", status: 0 }, { status: 404 })
    }

    const removeNullValues = isValEmptyArray(subCategoryExecute)

    return NextResponse.json({ data: removeNullValues, message: "Success", status: 1 }, { status: 200 })

  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Something went wrong", details: error.message, status: 0 }, { status: 500 })
  }
}