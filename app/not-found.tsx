import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center gap-6 px-4 py-16">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600">找不到该页面</p>
        <p className="text-sm text-gray-500 max-w-md text-center">
          您访问的链接可能已失效或不存在，请返回首页继续使用。
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md"
        >
          返回首页
        </Link>
      </main>
      <Footer />
    </div>
  );
}
