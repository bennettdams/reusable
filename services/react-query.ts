import { UseQueryOptions } from "react-query";

export function createQueryOptions<TQueryDataType>({
  optionsOverwrite,
  intervalInSeconds,
}: {
  optionsOverwrite?: UseQueryOptions<TQueryDataType>;
  intervalInSeconds: number;
}): UseQueryOptions<TQueryDataType> {
  const isRefetchDisabled = intervalInSeconds === 0;

  return {
    useErrorBoundary: true,
    // will refetch on window focus if the data is stale
    refetchOnWindowFocus: !isRefetchDisabled,
    refetchInterval: isRefetchDisabled ? 0 : intervalInSeconds * 1000,
    refetchIntervalInBackground: !isRefetchDisabled,
    cacheTime: 60 * 60 * 1000,
    staleTime: isRefetchDisabled ? Infinity : intervalInSeconds * 1000,
    ...optionsOverwrite,
  };
}
