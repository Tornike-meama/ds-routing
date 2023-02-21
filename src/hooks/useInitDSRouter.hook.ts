import { useMemo } from "react";
import { initRouter } from "helpers";
import { Modules } from "types";

export const useInitDSRouter = (claims: string[], allModule: Modules[]) => {
  return useMemo(() => initRouter(claims, allModule), [allModule, claims])
};