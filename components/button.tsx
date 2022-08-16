import { LegacyRef, MouseEvent, ReactNode, useEffect, useState } from "react";
import { OmitStrict } from "../types/util-types";
import { IconX } from "./Icon";
import { LoadingAnimation } from "./LoadingAnimation";
import { NavLink, NavLinkProps } from "./NavLink";

export type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  onClick?: (() => void) | (() => Promise<void>);
  icon?: ReactNode;
  small?: boolean;
  stopPropagation?: boolean;
  refExternal?: LegacyRef<HTMLButtonElement>;
  fullWidthAndHeight?: boolean;
  variant?: "primary" | "secondary";
  isLoading?: boolean;
  showLoadingOnClick?: boolean;
};

function useButton(
  isLoading: ButtonProps["isLoading"],
  showLoadingOnClick: ButtonProps["showLoadingOnClick"],
  stopPropagation: ButtonProps["stopPropagation"],
  onClick: ButtonProps["onClick"]
) {
  const [showLoading, setShowLoading] = useState(isLoading);

  // handle external `isLoading`
  useEffect(() => {
    if (isLoading === true) {
      setShowLoading(true);
    } else if (!showLoadingOnClick) {
      /*
       * `showLoadingOnClick` takes precedence over `isLoading` here. This is e.g. used for the sign in, where the form is finished
       * with its submission, which would hide the loading animation, but the navigation is not executed yet. If we wouldn't check
       * for `showLoadingOnClick` here, we would hide the loading animation after the submission, but before the navigation is executed.
       * We rather want to show the loading animation the whole time until the navigation is executed.
       * This is e.g. useful for the `FormSubmit` component on the sign in page. There, a successful submit should not hide the loading animation,
       * because the navigation to another page is still ongoing.
       */
      setShowLoading(isLoading);
    }
  }, [isLoading, showLoadingOnClick]);

  async function onClickHandler(event: MouseEvent) {
    !!showLoadingOnClick && setShowLoading(true);

    if (stopPropagation) event.stopPropagation();

    onClick && (await onClick());

    /*
     * `!!onClick` is needed because sometimes a consumer wants to show a loading animation, even though he didn't provide
     * this callback fn. If we wouldn't do this check for `onClick` here, the loading animation will only be shown for a millisecond.
     * This is e.g. the case for the `ButtonPrimaryNav` component. This component does not have an `onClick` fn himself,
     * so this `Button` also has none. In that case, we need to keep the loading animation on click,
     * so here, we _don't_ set `showLoading` to `false`, which keeps the loading animation visible.
     */
    !isLoading && !!showLoadingOnClick && !!onClick && setShowLoading(false);
  }

  return { showLoading, onClickHandler };
}

export function Button({
  disabled,
  onClick,
  children,
  icon,
  small = false,
  stopPropagation = false,
  refExternal = undefined,
  fullWidthAndHeight = false,
  variant = "primary",
  isLoading = false,
  showLoadingOnClick = false,
}: ButtonProps): JSX.Element {
  const { showLoading, onClickHandler } = useButton(
    isLoading,
    showLoadingOnClick,
    stopPropagation,
    onClick
  );

  return (
    <button
      disabled={disabled}
      ref={refExternal}
      className={
        "rounded shadow-md outline-none focus:outline-none" +
        " disabled:cursor-not-allowed" +
        ` ${
          variant === "primary"
            ? "bg-indigo-400 bg-gradient-to-r from-purple-400 to-indigo-400 text-white ring-orange-500 transition duration-300 ease-in-out hover:bg-indigo-300 hover:bg-none disabled:text-gray-300"
            : "bg-indigo-100 text-indigo-400 ring-orange-300 transition duration-300 ease-in-out hover:bg-indigo-200 hover:bg-none disabled:text-gray-400"
        }` +
        ` ${small ? "py-1 px-2" : "py-2 px-3"}` +
        ` ${fullWidthAndHeight && "h-full w-full"}`
      }
      onClick={onClickHandler}
      type="submit"
    >
      <div className="flex items-center justify-center">
        {icon && (
          <span className="mr-1 leading-none">
            {showLoading ? <LoadingAnimation size="small" /> : icon}
          </span>
        )}
        <span className={`${!!small && "text-sm"}`}>{children}</span>
      </div>
    </button>
  );
}

/**
 * Can be used as a navigation link with the design of a primary button.
 */
export function ButtonPrimaryNav({
  children,
  to,
  ...buttonProps
}: {
  children: ReactNode;
  to: NavLinkProps["to"];
} & OmitStrict<ButtonProps, "isLoading" | "showLoadingOnClick">): JSX.Element {
  return (
    <NavLink to={to}>
      <Button {...buttonProps} showLoadingOnClick={true} variant="primary">
        {children}
      </Button>
    </NavLink>
  );
}

export function ButtonRemove({
  onClick,
}: {
  onClick: () => void;
}): JSX.Element {
  return (
    <button
      onClick={onClick}
      // "leading-none" for a perfect square
      className="inline cursor-pointer rounded-md bg-indigo-300 p-1 leading-none text-white hover:bg-indigo-200 hover:text-indigo-800"
    >
      <IconX />
    </button>
  );
}
