'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4 p-8">
      <h2 className="text-xl font-semibold text-gray-800">出错了</h2>
      <p className="text-gray-600 text-center max-w-md">{error.message || '页面加载时发生错误'}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        重试
      </button>
    </div>
  );
}
