import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="text-gray-600">找不到该页面</p>
      <Link
        href="/"
        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        返回首页
      </Link>
    </div>
  );
}
