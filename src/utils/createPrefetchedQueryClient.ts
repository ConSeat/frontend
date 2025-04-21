import { QueryClient, dehydrate } from '@tanstack/react-query';

export type PrefetchableQuery = {
  queryKey: readonly unknown[];
  queryFn: () => Promise<unknown>;
};

export const createPrefetchedQueryClient = async (queries: PrefetchableQuery[]) => {
  const queryClient = new QueryClient();

  for (const { queryKey, queryFn } of queries) {
    await queryClient.prefetchQuery({ queryKey, queryFn });
  }

  return {
    queryClient,
    dehydratedState: dehydrate(queryClient),
  };
};
