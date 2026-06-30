import { NextResponse } from "next/server";

export function jsonError(message: string, status: number, details?: unknown) {
  return NextResponse.json(
    { error: message, ...(details !== undefined ? { details } : {}) },
    { status }
  );
}

export function jsonSuccess<T extends Record<string, unknown>>(data?: T) {
  return NextResponse.json({ success: true, ...data }, { status: 200 });
}

export async function parseJsonBody<T>(request: Request): Promise<T | null> {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}
