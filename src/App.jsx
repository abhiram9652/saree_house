import { useMemo, useState } from 'react';
import {
  Search, Heart, ShoppingBag, Menu, X, ArrowRight, ChevronDown,
  Truck, ShieldCheck, RotateCcw, Instagram, Facebook, Minus, Plus
} from 'lucide-react';

const categories = [
  { name: 'Kanchipuram', subtitle: 'Rich silk classics', image: 'photo-1610030469983-98e550d6193c' },
  { name: 'Banarasi', subtitle: 'Heritage weaves', image: 'photo-1583391733956-6c78276477e4' },
  { name: 'Cotton', subtitle: 'Everyday elegance', image: 'photo-1617627143750-d86bc21e42bb' },
  { name: 'Festive Wear', subtitle: 'Made to celebrate', image: 'photo-1610189012906-4c4e4c16b5b7' },
  { name: 'Linen', subtitle: 'Light & lovely', image: 'photo-1609748340490-5c3e0f7b5b6a' },
  { name: 'New Arrivals', subtitle: 'Fresh from the loom', image: 'photo-1610030469668-8e9f641a9f8b' },
];

const products = [
  { id: 1, name: 'Gulabi Kanchipuram Silk Saree', category: 'Kanchipuram', price: 2499, oldPrice: 3499, tag: 'BESTSELLER', color: 'Rose pink', image: 'photo-1610030469983-98e550d6193c' },
  { id: 2, name: 'Royal Banarasi Brocade Saree', category: 'Banarasi', price: 1899, oldPrice: 2499, tag: 'WOVEN WITH LOVE', color: 'Ruby & gold', image: 'photo-1583391733956-6c78276477e4' },
  { id: 3, name: 'Teal Cotton Silk Saree', category: 'Cotton', price: 1299, oldPrice: 1999, tag: 'EVERYDAY FAVOURITE', color: 'Deep teal', image: 'photo-1617627143750-d86bc21e42bb' },
  { id: 4, name: 'Amethyst Festive Silk Saree', category: 'Festive Wear', price: 2199, oldPrice: 2999, tag: 'FESTIVE EDIT', color: 'Amethyst', image: 'photo-1610189012906-4c4e4c16b5b7' },
  { id: 5, name: 'Sandstone Linen Blend Saree', category: 'Linen', price: 1599, oldPrice: 2199, tag: 'JUST ARRIVED', color: 'Sand beige', image: 'photo-1609748340490-5c3e0f7b5b6a' },
  { id: 6, name: 'Emerald Temple Border Saree', category: 'Kanchipuram', price: 2899, oldPrice: 3899, tag: 'HANDLOOM PICK', color: 'Emerald green', image: 'photo-1610030469668-8e9f641a9f8b' },
  { id: 7, name: 'Maroon Heritage Weave Saree', category: 'Banarasi', price: 1999, oldPrice: 2799, tag: 'LIMITED EDITION', color: 'Maroon', image: 'photo-1610030469983-98e550d6193c' },
  { id: 8, name: 'Sky Blue Soft Cotton Saree', category: 'Cotton', price: 999, oldPrice: 1499, tag: 'UNDER ₹1,000', color: 'Sky blue', image: 'photo-1617627143750-d86bc21e42bb' },
];

const imageUrl = (id, width = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const money = (n) => `₹${n.toLocaleString('en-IN')}`;

function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState('');

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const visibleProducts = useMemo(() => {
    let list = products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category;
      const matchesSearch = `${product.name} ${product.category} ${product.color}`.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, query, sort]);

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      return existing
        ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...product, quantity: 1 }];
    });
    setNotice(`${product.name} added to your bag`);
    window.setTimeout(() => setNotice(''), 2400);
  }

  function changeQuantity(id, amount) {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0));
  }

  function toggleWishlist(id) {
    setWishlist((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function chooseCategory(name) {
    setCategory(name === 'New Arrivals' ? 'All' : name);
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="site-shell">
      <div className="announcement">A little tradition, delivered to your doorstep <span>✦</span> Free shipping on orders above ₹1,999</div>
      <header className="header">
        <button className="icon-button mobile-toggle" aria-label="Open menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
        <a className="brand" href="#home" aria-label="RangVeda home"><span className="brand-mark">Rang<span>Veda</span></span><small>HANDLOOM · HEARTFELT</small></a>
        <nav className={`main-nav ${mobileMenu ? 'open' : ''}`}>
          <a href="#home" onClick={() => setMobileMenu(false)}>Home</a>
          <a href="#shop" onClick={() => { setCategory('All'); setMobileMenu(false); }}>Shop all</a>
          <a href="#categories" onClick={() => setMobileMenu(false)}>Collections</a>
          <a href="#shop" onClick={() => { setCategory('Festive Wear'); setMobileMenu(false); }}>Festive edit</a>
          <a href="#story" onClick={() => setMobileMenu(false)}>Our story</a>
        </nav>
        <div className="header-actions">
          <label className="search-box"><Search size={17} /><input aria-label="Search sarees" placeholder="Search sarees..." value={query} onChange={(e) => { setQuery(e.target.value); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }); }} /></label>
          <button className="icon-button wishlist-shortcut" aria-label="View wishlist" onClick={() => { setNotice(wishlist.length ? `${wishlist.length} item(s) in your wishlist` : 'Your wishlist is waiting for a favourite'); window.setTimeout(() => setNotice(''), 2400); }}><Heart /><span className="action-count">{wishlist.length || ''}</span></button>
          <button className="icon-button bag-button" aria-label="Open shopping bag" onClick={() => setCartOpen(true)}><ShoppingBag /><span className="action-count">{cartCount}</span></button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <img className="hero-image" src={imageUrl('photo-1610030469983-98e550d6193c', 1800)} alt="Traditional silk sarees in rich festive colours" />
          <div className="hero-shade" />
          <div className="hero-copy">
            <p className="eyebrow">WOVEN WITH LOVE, WORN WITH PRIDE</p>
            <h1>Every weave<br />has a <em>story.</em></h1>
            <p className="hero-description">Discover heirloom-worthy sarees and everyday treasures, thoughtfully brought to you from India's weaving traditions.</p>
            <a className="primary-button" href="#shop">Explore the collection <ArrowRight size={17} /></a>
            <div className="hero-footnote"><span className="tiny-flower">✳</span> A celebration of craft, colour and culture</div>
          </div>
          <div className="hero-side-label">THE HANDLOOM EDIT · NO. 01</div>
        </section>

        <section className="trust-strip" aria-label="Store benefits">
          <div><Truck /><span><strong>Free shipping</strong><small>On orders over ₹1,999</small></span></div>
          <div><ShieldCheck /><span><strong>Thoughtfully sourced</strong><small>Craft-led collections</small></span></div>
          <div><RotateCcw /><span><strong>Easy support</strong><small>Here to help you</small></span></div>
          <div className="trust-note">Little details. Lasting memories.</div>
        </section>

        <section className="section category-section" id="categories">
          <div className="section-heading"><div><p className="eyebrow">FIND YOUR FAVOURITE</p><h2>A collection for every <em>you.</em></h2></div><a className="text-link" href="#shop" onClick={() => setCategory('All')}>Explore all <ArrowRight size={16} /></a></div>
          <div className="category-grid">
            {categories.map((item, index) => (
              <button className="category-card" key={item.name} onClick={() => chooseCategory(item.name)}>
                <div className="category-photo"><img src={imageUrl(item.image, 550)} alt={`${item.name} saree collection`} loading="lazy" /><span className="category-number">0{index + 1}</span><span className="category-arrow"><ArrowRight size={18} /></span></div>
                <span className="category-name">{item.name}</span><span className="category-subtitle">{item.subtitle}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="feature-band" id="story">
          <div className="feature-image"><img src={imageUrl('photo-1610030469668-8e9f641a9f8b', 1000)} alt="Colourful handloom fabric detail" loading="lazy" /></div>
          <div className="feature-copy"><p className="eyebrow">MORE THAN JUST A SAREE</p><h2>Made by hands.<br />Kept close to <em>heart.</em></h2><p>Behind every drape is a world of skill, patience and living tradition. We celebrate the makers and the magic in every thread.</p><a href="#shop" className="text-link">Meet your next heirloom <ArrowRight size={16} /></a><span className="feature-decoration">RV</span></div>
        </section>

        <section className="section product-section" id="shop">
          <div className="section-heading product-heading"><div><p className="eyebrow">HANDPICKED FOR YOU</p><h2>{category === 'All' ? 'The latest loves' : category}<em>.</em></h2><p className="section-description">Beautiful finds you'll want to wear on repeat.</p></div>
            <div className="product-controls"><label className="sort-label">Sort by <ChevronDown size={15} /><select aria-label="Sort products" value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div>
          </div>
          <div className="filter-row"><button className={category === 'All' ? 'filter-chip active' : 'filter-chip'} onClick={() => setCategory('All')}>All sarees</button>{['Kanchipuram', 'Banarasi', 'Cotton', 'Festive Wear', 'Linen'].map((item) => <button key={item} className={category === item ? 'filter-chip active' : 'filter-chip'} onClick={() => setCategory(item)}>{item}</button>)}</div>
          {visibleProducts.length ? <div className="product-grid">{visibleProducts.map((product) => {
            const discount = Math.round((1 - product.price / product.oldPrice) * 100);
            const liked = wishlist.includes(product.id);
            return <article className="product-card" key={product.id}>
              <div className="product-image-wrap"><img src={imageUrl(product.image, 800)} alt={product.name} loading="lazy" /><span className="product-tag">{product.tag}</span><span className="discount-badge">{discount}% OFF</span><button className={`heart-button ${liked ? 'liked' : ''}`} onClick={() => toggleWishlist(product.id)} aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}><Heart size={18} fill={liked ? 'currentColor' : 'none'} /></button><button className="quick-add" onClick={() => addToCart(product)}>Add to bag <Plus size={16} /></button></div>
              <div className="product-info"><p className="product-category">{product.category} <span>·</span> {product.color}</p><h3>{product.name}</h3><div className="price-row"><strong>{money(product.price)}</strong><del>{money(product.oldPrice)}</del></div></div>
            </article>;
          })}</div> : <div className="empty-state"><p>No sarees found just yet.</p><button className="primary-button" onClick={() => { setCategory('All'); setQuery(''); }}>Clear filters</button></div>}
          <div className="center-action"><button className="outline-button" onClick={() => { setCategory('All'); setQuery(''); setNotice('You are viewing the full collection'); window.setTimeout(() => setNotice(''), 2400); }}>View the full collection <ArrowRight size={16} /></button></div>
        </section>

        <section className="newsletter"><div><p className="eyebrow">NOTES FROM THE LOOM</p><h2>A little beauty in your <em>inbox.</em></h2><p>New arrivals, styling notes and stories worth sharing.</p></div><NewsletterForm onSuccess={() => { setNotice('Thank you for joining our list!'); window.setTimeout(() => setNotice(''), 2400); }} /></section>
      </main>

      <footer className="footer"><div className="footer-top"><div className="footer-brand"><a className="brand" href="#home"><span className="brand-mark">Rang<span>Veda</span></span><small>HANDLOOM · HEARTFELT</small></a><p>For the everyday moments and the ones you'll remember forever.</p><div className="social-links"><a href="https://instagram.com" aria-label="Instagram"><Instagram size={18} /></a><a href="https://facebook.com" aria-label="Facebook"><Facebook size={18} /></a></div></div><div className="footer-col"><h4>Explore</h4><a href="#shop">Shop all</a><a href="#categories">Our collections</a><a href="#shop" onClick={() => setCategory('Festive Wear')}>Festive edit</a></div><div className="footer-col"><h4>We're here</h4><a href="mailto:hello@example.com">Contact us</a><a href="#story">Our story</a><a href="#home">Shipping & returns</a></div><div className="footer-col footer-signoff"><span>✳</span><p>Rooted in tradition.<br />Made for your story.</p></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} RangVeda. Demo storefront.</span><span>Secure checkout · Crafted with care</span></div></footer>

      {notice && <div className="toast" role="status">{notice}</div>}
      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(e) => e.stopPropagation()}><div className="drawer-header"><div><p className="eyebrow">YOUR LITTLE TREASURES</p><h2>Your bag <span>({cartCount})</span></h2></div><button className="icon-button" aria-label="Close cart" onClick={() => setCartOpen(false)}><X /></button></div>{cart.length ? <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><img src={imageUrl(item.image, 220)} alt={item.name} /><div className="cart-item-details"><h3>{item.name}</h3><strong>{money(item.price)}</strong><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => changeQuantity(item.id, -1)}><Minus size={14} /></button><span>{item.quantity}</span><button aria-label="Increase quantity" onClick={() => changeQuantity(item.id, 1)}><Plus size={14} /></button></div></div><button className="remove-item" onClick={() => changeQuantity(item.id, -item.quantity)}>Remove</button></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>{money(cartTotal)}</strong></div><p>Shipping and taxes calculated at checkout.</p><button className="primary-button checkout-button" onClick={() => setNotice('Demo only — connect a payment provider to accept real orders.')}>Continue to checkout <ArrowRight size={17} /></button></div></> : <div className="empty-cart"><ShoppingBag size={36} /><h3>Your bag is taking a little nap.</h3><p>Add a saree you love and it'll be waiting here.</p><button className="primary-button" onClick={() => setCartOpen(false)}>Explore sarees <ArrowRight size={16} /></button></div>}</aside></div>}
    </div>
  );
}

function NewsletterForm({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail('');
    onSuccess();
  }
  return <form className="newsletter-form" onSubmit={handleSubmit}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" placeholder="Your email address" value={email} onChange={(e) => { setEmail(e.target.value); setSubmitted(false); }} required /><button type="submit" aria-label="Subscribe"><ArrowRight size={19} /></button>{submitted && <span className="newsletter-success">You're on the list!</span>}</form>;
}

export default App;
