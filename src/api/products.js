const API_URL = 'https://dummyjson.com/products'

export async function fetchCategories() {
  const response = await fetch(`${API_URL}/category-list`)

  if (!response.ok) {
    throw new Error(`Không thể tải danh mục (HTTP ${response.status})`)
  }

  return response.json()
}

export async function fetchProductsByCategory(categoryName) {
  const response = await fetch(
    `${API_URL}/category/${encodeURIComponent(categoryName)}`,
  )

  if (!response.ok) {
    throw new Error(
      `Không thể tải sản phẩm của danh mục "${categoryName}" (HTTP ${response.status})`,
    )
  }

  return response.json()
}
