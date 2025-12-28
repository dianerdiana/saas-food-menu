/* eslint-disable @typescript-eslint/no-explicit-any */

export const storeKeys = {
  all: ['stores'] as const,
  lists: () => [...storeKeys.all, 'list'] as const,
  list: (params: any) => [...storeKeys.lists(), params] as const,
  details: () => [...storeKeys.all, 'detail'] as const,
  detail: (id: string) => [...storeKeys.details(), id] as const,
  create: () => [...storeKeys.all, 'create'] as const,
  creates: () => [...storeKeys.all, 'creates'] as const,
  update: () => [...storeKeys.all, 'update'] as const,
  delete: () => [...storeKeys.all, 'delete'] as const,
};
