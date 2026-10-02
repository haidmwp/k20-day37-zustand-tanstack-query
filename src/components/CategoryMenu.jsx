import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from '../api/products'

function CategoryMenu({ selectedCategory, onSelectCategory }) {
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
  })

  return (
    <section className="panel category-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Bài 2</p>
          <h2>Danh mục sản phẩm</h2>
        </div>
      </div>

      {categoriesQuery.isPending && <p className="status">Đang tải...</p>}

      {categoriesQuery.isError && (
        <p className="status error">{categoriesQuery.error.message}</p>
      )}

      {categoriesQuery.isSuccess && categoriesQuery.data.length === 0 && (
        <p className="status">Không có danh mục.</p>
      )}

      {categoriesQuery.isSuccess && categoriesQuery.data.length > 0 && (
        <div className="category-list" role="list" aria-label="Danh mục sản phẩm">
          {categoriesQuery.data.map((category) => (
            <button
              key={category}
              type="button"
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </section>
  )
}

export default CategoryMenu
