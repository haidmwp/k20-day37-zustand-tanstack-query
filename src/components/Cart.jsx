import { useCartStore } from '../store/useCartStore'

function Cart() {
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = getTotalPrice()

  return (
    <aside className="panel cart-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Bài 1</p>
          <h2>Giỏ hàng</h2>
        </div>
        <span className="cart-count">{totalQuantity} sản phẩm</span>
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <span>🛒</span>
          <p>Giỏ hàng trống</p>
        </div>
      ) : (
        <div className="cart-items">
          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item__main">
                <strong>{item.title}</strong>
                <span>Đơn giá: ${item.price.toFixed(2)}</span>
                <span>
                  Thành tiền: <b>${(item.price * item.quantity).toFixed(2)}</b>
                </span>
              </div>

              <div className="quantity-control" aria-label={`Số lượng ${item.title}`}>
                <button
                  type="button"
                  aria-label={`Giảm số lượng ${item.title}`}
                  disabled={item.quantity === 1}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  aria-label={`Tăng số lượng ${item.title}`}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="remove-button"
                onClick={() => removeFromCart(item.id)}
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="cart-summary">
        <span>Tổng số lượng</span>
        <strong>{totalQuantity}</strong>
        <span>Tổng thanh toán</span>
        <strong>${totalPrice.toFixed(2)}</strong>
      </div>
    </aside>
  )
}

export default Cart
