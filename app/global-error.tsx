'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="zh-CN">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>应用出错</h2>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
          {error.message || '发生严重错误，请刷新页面重试'}
        </p>
        <button
          onClick={reset}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
          }}
        >
          重试
        </button>
      </body>
    </html>
  );
}
