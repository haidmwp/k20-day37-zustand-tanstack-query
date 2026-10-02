import { useState } from 'react'
import Header from './components/Header'
import CategoryMenu from './components/CategoryMenu'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import './App.css'

function App() {
  const [selectedCategory, setSelectedCategory] = useState('')

  return (
    <div className="app-shell">
      <Header />

      <main className="layout">
        <div className="catalog-column">
          <CategoryMenu
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <ProductList selectedCategory={selectedCategory} />
        </div>
        <Cart />
      </main>
    </div>
  )
}

export default App
