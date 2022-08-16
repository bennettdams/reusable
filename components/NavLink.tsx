import { MouseEvent, ReactNode, useState } from "react";
// import Link from "next/link";
import { useRouteChange, useRouting } from "../services/routing-service";
import { LoadingAnimation } from "./LoadingAnimation";

export interface NavLinkProps {
  to: string;
  children: ReactNode;
  showLoadingAnimation?: boolean;
  fullWidthAndHeight?: boolean;
}

export function NavLink({
  to,
  children,
  showLoadingAnimation = false,
  fullWidthAndHeight = false,
}: NavLinkProps): JSX.Element {
  // Tracks the clicked NavLink. Without this, all NavLinks on the page would show a loading animation.
  const [isClicked, setIsClicked] = useState(false);
  const { go } = useRouting();

  const { shouldShowLoading } = useRouteChange(() => setIsClicked(false));

  function handleOnClick(e: MouseEvent) {
    e.preventDefault();
    setIsClicked(true);
    // remove when we can use <Link> component, see comment below
    go(to);
  }

  const showLoading = showLoadingAnimation && isClicked && shouldShowLoading;

  return (
    <a
      /*
       * We use real anchor tags with `href` to get all the browser functionality that comes with it. This e.g. includes the small route
       * info in the bottom left on hover or the ability to right click/middle click an element to open it in a new tab.
       * We don't use the anchor's default functionality though, which will execute a full page refresh when navigating.
       * Instead, we let Next.js take care of this (via the routing functionality). That's why we need `e.preventDefault()` in the click handler.
       */
      href={to}
      className={`inline-block cursor-pointer ${
        fullWidthAndHeight && "h-full w-full"
      }`}
      onClick={handleOnClick}
    >
      {/* We shouldn't use <Link> right now, because it will prefetch on hover, even when it's "prefetch" option is set to false.
       * This destroys our UX, because for our pages the prefetched data is big (and takes a "long" time), so e.g. going with
       * the mouse through the navbar will trigger some long-running requests. These will block the page transition, so the user
       * has to wait before all requests are done before he can switch to another route.
       * We have to wait until Next.js allows to also disable prefetching on hover before we can use the <Link> component.
       */}
      {/* <Link
        href={to}
        passHref
        // Prefetch the page for any <Link> that is in the viewport (initially or through scroll) in the background.
        // When prefetch is set to false, prefetching will still occur on hover.
        prefetch={false}
      > */}
      <div className="relative inline-block w-full">
        <span className={showLoading ? "text-transparent" : "text-current"}>
          {children}
        </span>
        {showLoading && (
          <div className="absolute inset-0 grid w-full place-items-center">
            <LoadingAnimation light />
          </div>
        )}
      </div>
      {/* </Link> */}
    </a>
  );
}
