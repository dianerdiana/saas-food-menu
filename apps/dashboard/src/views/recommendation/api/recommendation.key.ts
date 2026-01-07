/* eslint-disable @typescript-eslint/no-explicit-any */

export const recommendationKeys = {
  all: ['recommendations'] as const,
  lists: () => [...recommendationKeys.all, 'list'] as const,
  list: (params: any) => [...recommendationKeys.lists(), params] as const,
  details: () => [...recommendationKeys.all, 'detail'] as const,
  detail: (id: string) => [...recommendationKeys.details(), id] as const,
  create: () => [...recommendationKeys.all, 'create'] as const,
  creates: () => [...recommendationKeys.all, 'creates'] as const,
  update: () => [...recommendationKeys.all, 'update'] as const,
  delete: () => [...recommendationKeys.all, 'delete'] as const,
};
