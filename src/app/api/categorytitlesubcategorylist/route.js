import con from "../../../utils/Connection"
import { NextResponse } from "next/server"

export const GET = async () => {

  const categoryQuery = `
      SELECT c.category_id, c.category, c.category_type, c.category_image as image, 
             ct.title, ct.title_id, ct.title_type, 
             sc.id as sub_category_id, sc.sub_category
      FROM category c
      LEFT JOIN category_title ct ON ct.title_relation_id = c.category_id
      LEFT JOIN sub_category sc ON sc.sub_category_relation_id = ct.title_id`

  try {
    const [categories] = await con.query(categoryQuery)

    console.log('Title Id ==>', categories)

    if (categories.length === 0) {
      return NextResponse.json({ message: "No categories found", status: 0 }, { status: 404 })
    }

    const categoryMap = {}

    categories.forEach(row => {

      const { category_id, category, title_id, title, sub_category_id, sub_category } = row

      if (!categoryMap[category_id]) {
        categoryMap[category_id] = {
          category_id,
          category,
          titles: []
        }
      }

      let titles = categoryMap[category_id].titles.find(t => t.title_id === title_id)

      if (!titles) {
        titles = {
          title_id,
          title,
          sub_categories: []
        }
        categoryMap[category_id].titles.push(titles)
      }

      if (sub_category_id) {
        titles.sub_categories.push({
          id: sub_category_id,
          sub_category
        })
      }
    })

    Object.values(categoryMap).forEach(category => {

      category.titles.sort((a, b) => a.title_id - b.title_id)

      category.titles.forEach(title => {

        title.sub_categories.sort((a, b) => a.id - b.id)
      })
    })

    const result = Object.values(categoryMap)

    return NextResponse.json({ data: result, message: "Success", status: 1 }, { status: 200 })

  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Something went wrong", details: error.message, status: 0 }, { status: 500 })
  }
}
