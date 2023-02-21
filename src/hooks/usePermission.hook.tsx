import { useClaimns, useUserActions } from "./useClaims.hook";
import { UserPermissionReturnType } from "types";

export function usePersmissions(
  pageKey?: string
): UserPermissionReturnType {
  const userClaims = useClaimns();
  const actionsByKey = useUserActions();

  return  { actions: (pageKey && actionsByKey[pageKey]) ? actionsByKey[pageKey] : {}, userClaims };
};