/**
 * Dynamic Tauri updater feed (desktop `tauri.conf.json` endpoints).
 *
 * Configure Vercel env `GLANCEGUARD_UPDATER_MANIFEST` — JSON matching `UpdaterManifest` below.
 * The `signature` value must match the signing key whose **public** key is baked into the app (`plugins.updater.pubkey`).
 *
 * Requires DNS (`updates.glanceguard.app` → Vercel) plus this deploy for production clients to receive updates end-to-end.
 */

import semver from "semver";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type ArtifactRow = {
  url: string;
  signature: string;
  notes?: string;
  pub_date?: string;
};

type UpdaterManifest = {
  latest: string;
  artifacts: Record<string, ArtifactRow>;
};

export async function GET(
  _request: NextRequest,
  props: { params: Promise<{ target: string; version: string }> },
) {
  const params = await props.params;
  const raw = process.env.GLANCEGUARD_UPDATER_MANIFEST;
  if (raw === undefined || raw.trim() === "") {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Set GLANCEGUARD_UPDATER_MANIFEST on Vercel with updater JSON keyed by artifact target triple.",
      },
      { status: 503 },
    );
  }

  let manifest: UpdaterManifest;
  try {
    manifest = JSON.parse(raw) as UpdaterManifest;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_JSON" }, { status: 500 });
  }

  const currentSem = semver.coerce(decodeURIComponent(params.version));
  const latestSem = semver.coerce(manifest.latest);
  if (!currentSem || !latestSem) {
    return NextResponse.json({ ok: false, error: "invalid_semver" }, { status: 400 });
  }

  if (!semver.lt(currentSem, latestSem)) {
    return new NextResponse(null, { status: 204 });
  }

  const artifact = manifest.artifacts[params.target];
  if (!artifact?.url?.trim() || !artifact.signature?.trim()) {
    return new NextResponse(null, { status: 204 });
  }

  const body = {
    version: latestSem.version,
    pub_date: artifact.pub_date ?? new Date().toISOString(),
    url: artifact.url,
    signature: artifact.signature,
    notes: artifact.notes ?? "",
  };

  return NextResponse.json(body);
}
