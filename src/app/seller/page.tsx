export default function SellerPage() {
 return <main className="min-h-screen px-5 py-10"><div className="mx-auto max-w-4xl">
  <a href="/" className="font-bold text-teal-800">← AZ MARKET</a><h1 className="mt-7 text-3xl font-black">Kênh người bán</h1>
  <p className="mt-2 text-slate-600">Tạo cửa hàng, đăng sản phẩm và theo dõi trạng thái xét duyệt.</p>
  <div className="mt-7 grid gap-4 md:grid-cols-3">{[["📦","Quản lý sản phẩm","Tạo mới, cập nhật và theo dõi sản phẩm."],["🧾","Đơn hàng","Theo dõi và xử lý đơn mua."],["📊","Thống kê","Theo dõi doanh thu và hiệu quả bán hàng."]].map(([icon,title,desc])=><section key={title} className="rounded-2xl border bg-white p-5"><div className="text-3xl">{icon}</div><h2 className="mt-3 font-bold">{title}</h2><p className="mt-2 text-sm text-slate-500">{desc}</p></section>)}</div>
  <section className="mt-6 rounded-2xl border bg-white p-6"><h2 className="text-lg font-bold">Bắt đầu bán hàng</h2><p className="mt-2 text-sm text-slate-600">Bạn cần đăng nhập bằng tài khoản người bán. Sản phẩm mới sẽ ở trạng thái chờ duyệt và chưa xuất hiện công khai.</p><a href="/register?role=seller" className="mt-4 inline-block rounded-xl bg-teal-800 px-5 py-3 font-bold text-white">Tạo tài khoản người bán</a></section>
 </div></main>;
}
