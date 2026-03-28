'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 bg-gradient-to-b from-white to-blue-50">
      <h1 className="text-2xl font-bold text-gray-800">出错了</h1>
      <p className="text-gray-600 text-center max-w-md">
        页面加载时发生错误，请重试或返回首页。
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
        >
          重试
        </button>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
