import { createHash } from "node:crypto";

export function hashMachineFingerprint(machineFingerprint: string): string {
  return createHash("sha256").update(machineFingerprint, "utf8").digest("hex");
}
