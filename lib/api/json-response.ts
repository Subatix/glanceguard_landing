import { NextResponse } from "next/server";

export function jsonOk<T extends Record<string, unknown>>(body: T, status = 200) {
  return NextResponse.json(body, { status });
}

export function jsonError(
  status: number,
  code: string,
  message: string,
  details?: Record<string, unknown>,
) {
  const payload = {
    ok: false,
    error: { code, message, ...(details ?? {}) },
  };
  return NextResponse.json(payload, { status });
}
