import { NextResponse } from 'next/server';
import type { ApiResponse } from '@/lib/contracts/api-response';

export function apiSuccess<T>(data: T, init?: ResponseInit) {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true,
      data,
      error: null,
    },
    init
  );
}

export function apiError(code: string, message: string, status: number, init?: ResponseInit) {
  return NextResponse.json<ApiResponse<null>>(
    {
      success: false,
      data: null,
      error: {
        code,
        message,
      },
    },
    {
      status,
      headers: init?.headers,
    }
  );
}
