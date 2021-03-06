import { DehydratedState } from "../services/hydration-service";

/**
 * Every Next.js page could have these props.
 */
export interface PageProps {
  isSignedIn?: boolean;
}

/**
 * Should be used for server-side rendered pages, so
 * pages which use `getServerSideProps` and `getStaticProps`.
 */
export type ServerPageProps = PageProps & {
  /**
   * Used for React Query.
   * https://react-query.tanstack.com/guides/ssr#using-nextjs
   */
  dehydratedState: DehydratedState;
};
