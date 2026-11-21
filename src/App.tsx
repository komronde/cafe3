import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Clock3, Coffee, Instagram, MapPin, Menu as MenuIcon, Phone, ShoppingBag, X } from "lucide-react";

type Dish = { name: string; category: string; description: string; price: string; image: string; tag?: string };
const dishes: Dish[] = [
  { name: "Signature Cappuccino", category: "Coffee", description: "Ikki karra espresso, ipakdek sut ko‘pigi", price: "32 000", image: "photo-1570968915860-54d5c301fa9f", tag: "Bestseller" },
  { name: "Iced Spanish Latte", category: "Coffee", description: "Espresso, sovuq sut va mayin quyultirilgan sut", price: "36 000", image: "photo-1461023058943-07fcbe16d735" },
  { name: "Pistachio Croissant", category: "Bakery", description: "Sariyog‘li qatlama, pista kremi", price: "39 000", image: "photo-1558642452-9d2a7deb7f62", tag: "New" },
  { name: "Avocado Toast", category: "Food", description: "Qovurilgan sourdough, avokado va ko‘katlar", price: "58 000", image: "photo-1525351484163-7529414344d8" },
  { name: "Berry Cheesecake", category: "Dessert", description: "Kremli cheesecake va mavsumiy rezavorlar", price: "42 000", image: "photo-1533134242443-d4fd215305ad" },
  { name: "Truffle Mushroom Toast", category: "Food", description: "Qo‘ziqorin, truffle kremi va parmesan", price: "64 000", image: "photo-1525351484163-7529414344d8" }
];
const categories = ["All", "Coffee", "Food", "Bakery", "Dessert"];
const photo = (id: string, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export default function App() {
  const [active, setActive] = useState("All");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const filtered = useMemo(() => active === "All" ? dishes : dishes.filter(d => d.category === active), [active]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };
  const submitBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotice("So‘rovingiz qabul qilindi! Tez orada siz bilan bog‘lanamiz.");
    setBookingOpen(false);
  };

  return <div className="site-shell">
    <div className="announcement">A GOOD DAY STARTS WITH GOOD COFFEE <span>✳</span> EVERY DAY, 08:00 — 23:00</div>
    <header className="header">
      <button className="mobile-toggle icon-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menyuni ochish">{mobileOpen ? <X /> : <MenuIcon />}</button>
      <a className="brand" href="#" onClick={e => {e.preventDefault(); scrollTo("home");}}>
        <span className="brand-mark">M.</span><span className="brand-copy"><b>MAISON</b><small>COFFEE & KITCHEN</small></span>
      </a>
      <nav className={mobileOpen ? "nav nav-open" : "nav"}>
        <button onClick={() => scrollTo("home")}>Bosh sahifa</button>
        <button onClick={() => scrollTo("menu")}>Menyu</button>
        <button onClick={() => scrollTo("story")}>Biz haqimizda</button>
        <button onClick={() => scrollTo("contact")}>Aloqa</button>
      </nav>
      <div className="header-actions">
        <button className="account-link" onClick={() => setAccountOpen(true)}>Kirish</button>
        <button className="book-button" onClick={() => setBookingOpen(true)}>Stol band qilish <ArrowUpRight size={16}/></button>
      </div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-image" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow light"><span/> TOSHKENT · COFFEE CULTURE</p>
          <h1>Shoshilmang.<br/><em>Ta'mdan</em> bahra oling.</h1>
          <p className="hero-desc">Har bir finjonda e'tibor. Har bir lahzada o‘zgacha kayfiyat. Siz uchun yaratilgan iliq maskan.</p>
          <div className="hero-actions">
            <button className="cream-button" onClick={() => scrollTo("menu")}>Menyuni ko‘rish <ArrowRight size={17}/></button>
            <button className="text-button light-text" onClick={() => scrollTo("story")}>Bizning hikoyamiz <ArrowDown size={15}/></button>
          </div>
        </div>
        <div className="hero-side-note">CRAFTED WITH CARE — SINCE 2024</div>
        <div className="hero-bottom"><span>01 / 03</span><span className="hero-line"/><span>COFFEE · FOOD · MOMENTS</span></div>
      </section>

      <section className="intro section-wrap">
        <div className="intro-label"><span className="eyebrow">01 — OUR PHILOSOPHY</span><span className="tiny-rule"/></div>
        <div className="intro-copy"><h2>Oddiy lahzalarni<br/><em>maxsus</em> qiling.</h2><p>Biz uchun qahva — shunchaki ichimlik emas. Bu suhbatga sabab, tanaffusga bahona va kuningizdagi eng yoqimli kichik marosim.</p><button className="underlined" onClick={() => scrollTo("story")}>MAISON haqida <ArrowUpRight size={15}/></button></div>
        <div className="intro-image"><img src={photo("photo-1445116572660-236099ec97a0")} alt="Cafe interior"/><span className="image-caption">A PLACE TO SLOW DOWN</span></div>
      </section>

      <section className="menu-section" id="menu">
        <div className="section-wrap">
          <div className="section-heading"><div><span className="eyebrow">02 — MADE FRESH, SERVED WITH LOVE</span><h2>Bizning <em>menyu</em></h2></div><p>Sevimli klassiklaringiz va yangi kashfiyotlar — barchasi bir joyda.</p></div>
          <div className="filter-row">{categories.map(c => <button key={c} className={active === c ? "filter active" : "filter"} onClick={() => setActive(c)}>{c === "All" ? "Barchasi" : c === "Coffee" ? "Qahva" : c === "Food" ? "Taomlar" : c === "Bakery" ? "Pishiriqlar" : "Desertlar"}</button>)}</div>
          <div className="menu-grid">{filtered.map((dish, i) => <article className="dish-card" key={dish.name}>
            <div className="dish-image"><img src={photo(dish.image)} alt={dish.name}/>{dish.tag && <span className="dish-tag">{dish.tag}</span>}<span className="dish-number">0{i+1}</span></div>
            <div className="dish-info"><div><h3>{dish.name}</h3><p>{dish.description}</p></div><strong>{dish.price} <small>UZS</small></strong></div>
          </article>)}</div>
          <div className="menu-footnote"><span>* Menyu va narxlar mavsumga qarab o‘zgarishi mumkin.</span><button className="underlined" onClick={() => setBookingOpen(true)}>STOL BAND QILING <ArrowUpRight size={15}/></button></div>
        </div>
      </section>

      <section className="feature" id="story">
        <div className="feature-photo"><img src={photo("photo-1493850709922-9e4b6c5f4c1f", 1200)} alt="Barista preparing coffee"/></div>
        <div className="feature-copy"><span className="eyebrow light">03 — THE MAISON WAY</span><h2>Har bir detalda<br/><em>mehr</em> bor.</h2><p>Tanlangan donlar, mahoratli baristalar va yangi tayyorlangan taomlar. Biz sifatni baland ovozda emas, har kuni qiladigan ishimiz bilan ko‘rsatamiz.</p><div className="feature-stats"><div><b>100%</b><span>Tanlangan donlar</span></div><div><b>08–23</b><span>Har kuni ochiqmiz</span></div></div><button className="cream-button" onClick={() => scrollTo("contact")}>Bizni toping <ArrowRight size={16}/></button></div>
      </section>

      <section className="quote-section"><span className="quote-mark">“</span><blockquote>Good coffee is a little<br/> moment of <em>happiness.</em></blockquote><span className="eyebrow">— THE MAISON PHILOSOPHY —</span></section>

      <section className="visit section-wrap" id="contact">
        <div className="visit-copy"><span className="eyebrow">04 — COME SAY HELLO</span><h2>Sizni <em>kutamiz.</em></h2><p>Bir finjon qahva, mazali nonushta yoki shunchaki yoqimli suhbat uchun tashrif buyuring.</p><button className="dark-button" onClick={() => setBookingOpen(true)}>Tashrifni rejalashtirish <ArrowUpRight size={16}/></button></div>
        <div className="visit-details">
          <div><MapPin/><span><b>Manzil</b><small>Toshkent shahri, Amir Temur ko‘chasi, 12</small></span></div>
          <div><Clock3/><span><b>Ish vaqti</b><small>Har kuni · 08:00 — 23:00</small></span></div>
          <div><Phone/><span><b>Telefon</b><small>+998 90 123 45 67</small></span></div>
          <div><Instagram/><span><b>Instagram</b><small>@maison.coffee</small></span></div>
        </div>
      </section>
    </main>

    <footer className="footer"><a className="brand footer-brand" href="#"><span className="brand-mark">M.</span><span className="brand-copy"><b>MAISON</b><small>COFFEE & KITCHEN</small></span></a><span>© 2026 MAISON. BARCHA HUQUQLAR HIMOYALANGAN.</span><button onClick={() => scrollTo("home")}>YUQORIGA ↑</button></footer>

    {bookingOpen && <div className="modal-backdrop" onClick={() => setBookingOpen(false)}><div className="modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setBookingOpen(false)}><X/></button><span className="eyebrow">MAISON — RESERVATION</span><h2>Stol <em>band qilish</em></h2><p className="modal-desc">Ma'lumotlaringizni qoldiring, siz bilan bog‘lanamiz.</p><form onSubmit={submitBooking}><label>Ismingiz<input required placeholder="Ismingiz"/></label><label>Telefon raqamingiz<input required type="tel" placeholder="+998 90 123 45 67"/></label><div className="form-row"><label>Sana<input required type="date"/></label><label>Mehmonlar<select defaultValue="2"><option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option></select></label></div><button className="dark-button full" type="submit">So‘rov yuborish <ArrowRight size={16}/></button></form></div></div>}
    {accountOpen && <div className="modal-backdrop" onClick={() => setAccountOpen(false)}><div className="modal account-modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setAccountOpen(false)}><X/></button><span className="eyebrow">WELCOME TO MAISON</span><h2>Hisobingizga <em>kiring.</em></h2><p className="modal-desc">Hozircha demo ko‘rinish. Akkaunt tizimi backend ulangandan keyin ishlaydi.</p><form onSubmit={e => {e.preventDefault(); setAccountOpen(false); setNotice("Demo: akkaunt tizimi hali ulanmagan.");}}><label>Email<input type="email" required placeholder="you@example.com"/></label><label>Parol<input type="password" required placeholder="••••••••"/></label><button className="dark-button full" type="submit">Kirish <ArrowRight size={16}/></button></form></div></div>}
    {notice && <div className="toast"><span>{notice}</span><button onClick={() => setNotice("")}><X size={16}/></button></div>}
  </div>;
}