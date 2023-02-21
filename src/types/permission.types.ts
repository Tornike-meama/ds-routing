export type UserPermissionReturnType = {
  userClaims: string[];
  actions: Actions
}

export type PermissionContextType = {
  userClaims: string[];
  userActions: ActionByPageKey;
}

export type Actions = Record<string, boolean> & {
  get?: boolean;
  add?: boolean;
  update?: boolean;
  remove?: boolean;
};

export type ActionByPageKey = {
  [key: string]: Actions
};