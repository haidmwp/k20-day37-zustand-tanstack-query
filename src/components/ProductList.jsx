import { useQuery } from '@tanstack/react-query'
import { fetchProductsByCategory } from '../api/products'
import { useCartStore } from '../store/useCartStore'

function ProductList({ selectedCategory }) {
  const addToCart = useCartStore((state) => state.addToCart)

  const productsQuery = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => fetchProductsByCategory(selectedCategory),
    enabled: Boolean(selectedCategory),
    staleTime: 2 * 60 * 1000,
  })

  let content

  if (!selectedCategory) {
    content = <p className="status">Vui lòng chọn danh mục</p>
  } else if (productsQuery.isPending) {
    content = <p className="status">Đang tải...</p>
  } else if (productsQuery.isError) {
    content = <p className="status error">{productsQuery.error.message}</p>
  } else if (productsQuery.data.products.length === 0) {
    content = <p className="status">Không có sản phẩm trong danh mục này.</p>
  } else {
    content = (
      <div className="product-grid">
        {productsQuery.data.products.map((product) => (
          <article className="product-card" key={product.id}>
            <img src={product.thumbnail} alt={`Ảnh ${product.title}`} />
            <div className="product-card__body">
              <p className="product-category">{selectedCategory}</p>
              <h3>{product.title}</h3>
              <p className="price">${Number(product.price).toFixed(2)}</p>
              <button type="button" onClick={() => addToCart(product)}>
                Thêm vào giỏ
              </button>
            </div>
          </article>
        ))}
      </div>
    )
  }

  return (
    <section className="panel products-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Server state</p>
          <h2>
            Sản phẩm
            {selectedCategory ? <span> · {selectedCategory}</span> : null}
          </h2>
        </div>
      </div>
      {content}
    </section>
  )
}

export default ProductList
