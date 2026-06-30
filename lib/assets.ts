/**
 * Hooks for swapping placeholder assets with real client materials when available.
 * Set env flags or update these records when permissions/assets arrive.
 */
export type AssetSlot =
  | "client_logos"
  | "team_photos"
  | "itinero_demo_metric"
  | "project_screenshots";

export const assetReadiness: Record<AssetSlot, { ready: boolean; note: string }> = {
  client_logos: {
    ready: false,
    note: "Awaiting logo usage permission from named clients.",
  },
  team_photos: {
    ready: false,
    note: "Publish named profiles when team agrees to public bios.",
  },
  itinero_demo_metric: {
    ready: false,
    note: "Wire waitlist or launch metric from Itinero when public.",
  },
  project_screenshots: {
    ready: false,
    note: "Replace illustrative work images with delivery screenshots per slug.",
  },
};

export function isAssetReady(slot: AssetSlot): boolean {
  return assetReadiness[slot].ready;
}
