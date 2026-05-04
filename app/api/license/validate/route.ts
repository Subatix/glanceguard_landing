import { handleLicenseValidatePost } from "@/lib/licensing/post-handlers";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    return await handleLicenseValidatePost(request);
  } catch (e: unknown) {
    const msg =
      e instanceof Error ? e.message : "unexpected_license_validate_error";
    return Response.json(
      {
        ok: false,
        error: {
          code: "license_gate_failed",
          message: msg,
        },
      },
      { status: 503 },
    );
  }
}
