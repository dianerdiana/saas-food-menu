/* eslint-disable @typescript-eslint/no-explicit-any */

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (params: any) => [...productKeys.lists(), params] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  create: () => [...productKeys.all, 'create'] as const,
  creates: () => [...productKeys.all, 'creates'] as const,
  update: () => [...productKeys.all, 'update'] as const,
  delete: () => [...productKeys.all, 'delete'] as const,
};
