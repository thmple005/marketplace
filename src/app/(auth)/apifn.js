import { http } from "../../utils";

export function getCategories() {
    return http.get('/api/project/category/list')
  }