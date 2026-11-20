const categories = [
  ["☕", "Cà phê & Đồ uống"], ["📱", "Điện tử"], ["👕", "Thời trang"],
  ["🏠", "Nhà cửa"], ["✨", "Làm đẹp"], ["⚽", "Thể thao"],
];
const samples = [
  ["☕", "Cà phê rang xay đặc sản", "185.000₫", "AZ Coffee"],
  ["🥤", "Bình giữ nhiệt 600ml", "189.000₫", "Gian hàng mẫu"],
  ["🎧", "Tai nghe Bluetooth", "329.000₫", "Gian hàng mẫu"],
  ["👜", "Túi đeo chéo tối giản", "245.000₫", "Gian hàng mẫu"],
];
export default function Home() {
 return <main className="min-h-screen">
  <div className="bg-slate-950 px-4 py-2 text-center text-xs text-white">AZ MARKET · Nơi mọi người có thể mở cửa hàng trực tuyến</div>
  <header className="sticky top-0 z-20 border-b bg-white">
   <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-5 py-4">
    <a href="/" className="text-2xl font-black tracking-tight text-teal-800">AZ MARKET</a>
    <div className="min-w-48 flex-1"><input aria-label="Tìm kiếm" placeholder="Tìm sản phẩm, cửa hàng..." className="w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm outline-none focus:border-teal-700"/></div>
    <nav className="flex flex-wrap items-center gap-4 text-sm font-semibold"><a href="/login">Đăng nhập</a><a href="/register" className="rounded-xl bg-teal-800 px-4 py-2.5 text-white">Đăng ký</a><a href="/seller" className="text-teal-800">Kênh người bán</a></nav>
   </div>
  </header>
  <section className="mx-auto max-w-6xl px-5 py-8">
   <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-teal-950 via-teal-800 to-cyan-700 p-8 text-white md:p-14">
    <p className="text-xs font-bold tracking-[.25em] text-teal-200">MUA SẮM · KINH DOANH · KẾT NỐI</p>
    <h1 className="mt-4 max-w-2xl text-4xl font-black leading-tight md:text-5xl">Mở cửa hàng của bạn.<br/>Tiếp cận khách hàng mới.</h1>
    <p className="mt-4 max-w-xl text-teal-50">Người mua khám phá nhiều cửa hàng. Người bán đăng sản phẩm và quản lý kinh doanh trên cùng một nền tảng.</p>
    <div className="mt-7 flex flex-wrap gap-3"><a href="#products" className="rounded-xl bg-white px-5 py-3 font-bold text-teal-950">Khám phá sản phẩm</a><a href="/register?role=seller" className="rounded-xl border border-white/60 px-5 py-3 font-bold">Đăng ký bán hàng</a></div>
   </div>
   <section className="mt-10"><p className="text-xs font-bold tracking-widest text-teal-800">KHÁM PHÁ</p><h2 className="mt-1 text-2xl font-black">Danh mục sản phẩm</h2>
    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">{categories.map(([emoji,name])=><div key={name} className="rounded-2xl border bg-white p-4 text-center"><div className="text-3xl">{emoji}</div><p className="mt-2 text-sm font-semibold">{name}</p></div>)}</div>
   </section>
   <section id="products" className="mt-10 pb-16"><p className="text-xs font-bold tracking-widest text-teal-800">GỢI Ý CHO BẠN</p><h2 className="mt-1 text-2xl font-black">Sản phẩm nổi bật</h2>
    <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">{samples.map(([emoji,name,price,shop])=><article key={name} className="overflow-hidden rounded-2xl border bg-white"><div className="flex h-40 items-center justify-center bg-slate-100 text-6xl">{emoji}</div><div className="p-4"><p className="text-xs text-slate-500">{shop}</p><h3 className="mt-1 min-h-10 font-semibold">{name}</h3><p className="mt-2 text-lg font-black">{price}</p></div></article>)}</div>
    <p className="mt-4 text-xs text-slate-500">Các mặt hàng phía trên là dữ liệu minh họa cho giao diện. Sản phẩm thật sẽ hiển thị sau khi kết nối cơ sở dữ liệu và được quản trị viên duyệt.</p>
   </section>
  </section>
  <footer className="bg-slate-950 py-8 text-slate-300"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 px-5 md:flex-row"><div><b className="text-xl text-white">AZ MARKET</b><p className="mt-2 text-sm">Một sàn · Nhiều người bán · Nhiều cửa hàng</p></div><p className="text-xs">© 2026 AZ MARKET</p></div></footer>
 </main>;
}
