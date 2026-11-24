import { useMemo, useState } from 'react'
import { Crown, Search, ShoppingCart, UserRound, ArrowRight, Truck, ShieldCheck, CreditCard, Headphones, Menu, X, Plus, Minus, Trash2, Instagram } from 'lucide-react'

type Product = { id: number; name: string; category: string; price: number; oldPrice?: number; badge?: string; image: string }
type CartItem = { product: Product; quantity: number }

const products: Product[] = [
  { id: 1, name: 'Camiseta Stussy Style', category: 'Camisetas', price: 99.9, badge: 'Novo', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85' },
  { id: 2, name: 'Camiseta Essential White', category: 'Camisetas', price: 79.9, oldPrice: 99.9, badge: '-20%', image: 'https://images.unsplash.com/photo-1581659812371-6b6f7f9b5c87?auto=format&fit=crop&w=800&q=85' },
  { id: 3, name: 'Moletom Urban Black', category: 'Moletons', price: 254.9, oldPrice: 299.9, badge: '-15%', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85' },
  { id: 4, name: 'Calça Cargo Street', category: 'Calças', price: 179.9, image: 'https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?auto=format&fit=crop&w=800&q=85' },
  { id: 5, name: 'Boné Classic Black', category: 'Acessórios', price: 129.9, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=85' },
  { id: 6, name: 'Camiseta Oversized', category: 'Camisetas', price: 119.9, image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=85' },
  { id: 7, name: 'Moletom College', category: 'Moletons', price: 229.9, image: 'https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=800&q=85' },
  { id: 8, name: 'Shoulder Bag', category: 'Acessórios', price: 89.9, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85' },
]
const money = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function App() {
  const [category, setCategory] = useState('Todos')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [notice, setNotice] = useState('')

  const filtered = useMemo(() => products.filter(p => (category === 'Todos' || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase())), [category, search])
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  function addToCart(product: Product) {
    setCart(current => {
      const found = current.find(item => item.product.id === product.id)
      return found ? current.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { product, quantity: 1 }]
    })
    setNotice(`${product.name} adicionado à sacola`)
    window.setTimeout(() => setNotice(''), 2300)
  }
  function changeQuantity(id: number, amount: number) {
    setCart(current => current.map(item => item.product.id === id ? { ...item, quantity: item.quantity + amount } : item).filter(item => item.quantity > 0))
  }

  return <div className="site-shell">
    <header className="header">
      <a className="brand" href="#inicio" aria-label="StreetWear início"><Crown size={35} strokeWidth={2.4}/><span>Street<span>Wear</span></span></a>
      <button className="mobile-toggle icon-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Abrir menu">{mobileMenu ? <X/> : <Menu/>}</button>
      <nav className={mobileMenu ? 'nav nav-open' : 'nav'}>
        <a className="active" href="#inicio" onClick={() => setMobileMenu(false)}>Início</a><a href="#produtos" onClick={() => setMobileMenu(false)}>Produtos</a>
        <a href="#categorias" onClick={() => setMobileMenu(false)}>Categorias</a><a href="#sobre" onClick={() => setMobileMenu(false)}>Sobre</a><a href="#contato" onClick={() => setMobileMenu(false)}>Contato</a>
      </nav>
      <div className="header-actions"><label className="search-box"><input value={search} onChange={e => { setSearch(e.target.value); document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' }) }} placeholder="Buscar produtos..."/><Search size={21}/></label><button className="icon-button user-button" aria-label="Minha conta" onClick={() => setNotice('Área do cliente em breve!')}><UserRound/></button><button className="icon-button cart-trigger" onClick={() => setCartOpen(true)} aria-label="Abrir sacola"><ShoppingCart/><span className="cart-count">{count}</span></button></div>
    </header>

    <main>
      <section className="hero" id="inicio">
        <div className="hero-grain"/><div className="hero-copy"><span className="eyebrow">ESTILO QUE VESTE ATITUDE</span><h1>Streetwear de<br/><em>verdade.</em></h1><p>Vista o que te faz único. Estilo, conforto e<br className="desktop-only"/> qualidade em um só lugar.</p><div className="hero-buttons"><a className="btn btn-red" href="#produtos">Explorar coleção <ArrowRight size={17}/></a><a className="btn btn-outline" href="#sobre">Saiba mais</a></div></div>
        <div className="hero-art"><div className="hero-orbit"/><div className="hero-tag">STREET<br/>CULTURE<br/><b>2026</b></div><div className="hero-model model-one"><img src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=90" alt="Modelo com look streetwear"/></div><div className="hero-model model-two"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=90" alt="Modelo com visual urbano"/></div><span className="hero-stamp">NO<br/>RULES</span></div>
        <div className="hero-bottom"><span>01 / 03</span><div><i/><i/><i/></div><span>DROP 2026</span></div>
      </section>

      <section className="products-section section-wrap" id="produtos"><div className="section-heading"><div><p className="kicker">SELEÇÃO EXCLUSIVA</p><h2>Nossos <em>Produtos</em></h2><p className="section-subtitle">Peças que carregam atitude. Escolha seu próximo visual.</p></div><a href="#categorias" className="see-all">Ver categorias <ArrowRight size={16}/></a></div>
        <div className="category-row" id="categorias">{['Todos', 'Camisetas', 'Moletons', 'Calças', 'Acessórios'].map(item => <button key={item} className={category === item ? 'category-chip selected' : 'category-chip'} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <div className="product-grid">{filtered.map(product => <article className="product-card" key={product.id}><div className="product-image"><img src={product.image} alt={product.name}/>{product.badge && <span className="badge">{product.badge}</span>}<button className="quick-add" onClick={() => addToCart(product)} aria-label={`Adicionar ${product.name}`}><Plus size={20}/></button></div><div className="product-info"><div><h3>{product.name}</h3><span className="product-category">{product.category}</span></div><div className="price-row">{product.oldPrice && <del>{money(product.oldPrice)}</del>}<strong>{money(product.price)}</strong></div></div></article>)}</div>
        {filtered.length === 0 && <div className="empty-search">Nenhum produto encontrado. Tente outra busca.</div>}
      </section>

      <section className="manifesto" id="sobre"><div className="manifesto-mark">SW<span>.</span></div><div><p className="kicker">MAIS QUE ROUPA. IDENTIDADE.</p><h2>Vista sua<br/><em>própria regra.</em></h2><p className="manifesto-text">A rua é nossa passarela. Criamos peças para quem não espera permissão para ser quem é. Seu estilo, suas regras.</p><a className="text-link" href="#produtos">Descubra a coleção <ArrowRight size={17}/></a></div><div className="manifesto-side">BE<br/>BOLD<br/><span>★</span></div></section>

      <section className="benefits" id="contato"><div className="benefit"><Truck/><div><b>Entrega para todo o Brasil</b><span>Frete calculado no checkout</span></div></div><div className="benefit"><ShieldCheck/><div><b>Compra segura</b><span>Seus dados protegidos</span></div></div><div className="benefit"><CreditCard/><div><b>Pagamento facilitado</b><span>Em até 12x no cartão</span></div></div><div className="benefit"><Headphones/><div><b>Suporte especializado</b><span>Atendimento de verdade</span></div></div></section>
    </main>
    <footer className="footer"><a className="brand" href="#inicio"><Crown size={27}/><span>Street<span>Wear</span></span></a><p>Vista o que te faz único. © 2026 StreetWear.</p><a className="social" href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={19}/> Instagram</a></footer>

    {notice && <div className="toast">{notice}</div>}
    {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={e => e.stopPropagation()}><div className="drawer-head"><div><p className="kicker">SEU ESTILO, SUA ESCOLHA</p><h2>Sacola <em>({count})</em></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Fechar sacola"><X/></button></div>{cart.length === 0 ? <div className="cart-empty"><ShoppingCart size={42}/><h3>Sua sacola está vazia</h3><p>Encontre peças que combinam com você.</p><button className="btn btn-red" onClick={() => setCartOpen(false)}>Continuar comprando</button></div> : <><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.product.id}><img src={item.product.image} alt={item.product.name}/><div className="cart-item-info"><b>{item.product.name}</b><strong>{money(item.product.price)}</strong><div className="quantity"><button onClick={() => changeQuantity(item.product.id, -1)} aria-label="Diminuir"><Minus size={14}/></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.product.id, 1)} aria-label="Aumentar"><Plus size={14}/></button></div></div><button className="remove" onClick={() => setCart(current => current.filter(i => i.product.id !== item.product.id))} aria-label="Remover item"><Trash2 size={17}/></button></div>)}</div><div className="cart-total"><div><span>Subtotal</span><strong>{money(total)}</strong></div><small>Frete calculado na próxima etapa.</small><button className="btn btn-red checkout" onClick={() => setNotice('Checkout demonstrativo — conecte um meio de pagamento para vender de verdade.')}>Finalizar compra <ArrowRight size={17}/></button></div></>}</aside></div>}
  </div>
}
