/* eslint-disable @typescript-eslint/no-explicit-any */

export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: (params: any) => [...categoryKeys.lists(), params] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (id: string) => [...categoryKeys.details(), id] as const,
  create: () => [...categoryKeys.all, 'create'] as const,
  creates: () => [...categoryKeys.all, 'creates'] as const,
  update: () => [...categoryKeys.all, 'update'] as const,
  delete: () => [...categoryKeys.all, 'delete'] as const,
};
