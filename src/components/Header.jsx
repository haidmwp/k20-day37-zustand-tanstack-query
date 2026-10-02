import { useCartStore } from '../store/useCartStore'

function Header() {
  const totalQuantity = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  )

  return (
    <header className="site-header">
      <div>
        <p className="eyebrow">K20 · Day 37</p>
        <h1>Zustand & TanStack Query Shop</h1>
      </div>
      <div className="cart-badge" aria-label={`Giỏ hàng có ${totalQuantity} sản phẩm`}>
        🛒 Giỏ hàng <strong>{totalQuantity}</strong>
      </div>
    </header>
  )
}

export default Header
