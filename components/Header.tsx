import { Menu, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useReducer } from "react";
import { useAuth } from "../services/auth-service";
import { useTranslation } from "../services/i18n/use-translation";
import { Button, ButtonPrimaryNav } from "./button";
import {
  IconChevron,
  IconCog,
  IconHome,
  IconLogoutOutline,
  IconMenu,
  IconSwitch,
  IconUser,
} from "./Icon";
import { LoadingAnimation } from "./LoadingAnimation";
import { TextGradient } from "./TextGradient";
import { ROUTES } from "../services/routing-service";
import { NavLink } from "./NavLink";
import { formatDateToYearAndMonthAndDayAndHourAndMinute } from "../util/date-time";

function NavItem({
  children,
  to,
}: {
  children: ReactNode;
  to: string;
}): JSX.Element {
  return (
    <div className="inline-grid flex-1 place-items-center">
      <NavLink to={to} showLoadingAnimation fullWidthAndHeight>
        <nav className="flex h-full w-full flex-wrap items-center justify-center bg-gradient-to-r from-transparent to-transparent text-base hover:from-purple-400 hover:to-indigo-400 hover:shadow-md md:ml-auto md:mr-auto">
          <button className="p-1 text-center text-lg uppercase outline-none focus:outline-none md:p-4">
            {children}
          </button>
        </nav>
      </NavLink>
    </div>
  );
}

function UserMenu() {
  const { t } = useTranslation();
  const { user, signOut, isAdmin } = useAuth();
  const { language, changeLanguage } = useTranslation();

  return (
    <Menu as="div" className="relative inline-block h-full text-left">
      <Menu.Button
        as="div"
        className="inline-flex h-full w-full justify-center px-4 py-2 text-sm"
      >
        <Button icon={<IconUser />}>
          <span className="inline-flex justify-center px-2 font-medium">
            <span className="text-sm">{!user ? "..." : user.username}</span>
            <IconChevron />
          </span>
        </Button>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-40 mt-6 w-96 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            <div className="relative flex h-full flex-col text-lg text-gray-400">
              <div className="flex flex-1 flex-col items-center justify-center py-6">
                {user && (
                  <>
                    <div className="flex flex-1 items-center justify-center">
                      <IconUser />
                      <span className="ml-2">{t("signedInAs")}</span>
                      <span className="ml-2 font-medium text-indigo-800">
                        {!user ? "..." : user.username}
                      </span>
                    </div>

                    {isAdmin && (
                      <NavLink to={ROUTES.ADMIN} showLoadingAnimation>
                        <button className="mt-4 rounded-md bg-gray-200 p-2 shadow-md hover:bg-gray-100">
                          <div className="flex flex-1 items-center justify-center">
                            <IconCog />
                            <span className="ml-2">{t("adminPage")}</span>
                          </div>
                        </button>
                      </NavLink>
                    )}
                  </>
                )}
              </div>

              <div className="w-1/2 self-center border-b border-gray-200" />

              <div className="flex flex-1 items-center justify-center py-6">
                <span>{t("switchLanguage")}:</span>
                <button
                  className="h-full px-4 hover:text-yellow-600"
                  onClick={() =>
                    changeLanguage(language === "de" ? "en" : "de")
                  }
                >
                  <p className="h-full text-xl uppercase">
                    <IconSwitch /> {language === "de" ? "en" : "de"}
                  </p>
                </button>
              </div>

              <div className="py-2 text-center">
                <p className="text-sm italic">
                  Version: MVP | {process.env.NEXT_PUBLIC_VERSION}
                </p>
                {process.env.NEXT_PUBLIC_BUILD_DATE && (
                  <p className="text-sm italic">
                    {formatDateToYearAndMonthAndDayAndHourAndMinute(
                      new Date(process.env.NEXT_PUBLIC_BUILD_DATE)
                    )}
                  </p>
                )}
              </div>

              <div className="flex flex-1 items-center justify-center py-6">
                <Button icon={<IconLogoutOutline />} onClick={signOut}>
                  {t("signOut")}
                </Button>
              </div>
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function Nav() {
  const { t } = useTranslation();
  const { isSignedIn } = useAuth();

  return (
    <nav className="flex h-full w-full flex-grow flex-col items-center justify-center md:w-auto md:flex-row">
      <NavItem to={ROUTES.HOME}>
        <IconHome size="large" />
      </NavItem>
      <NavItem to={ROUTES.ANALYSIS}>{t("analysis")}</NavItem>
      <div className="mr-4 grid h-full w-80 place-items-end">
        {isSignedIn === null ? (
          <LoadingAnimation />
        ) : isSignedIn === false ? (
          <ButtonPrimaryNav to={ROUTES.SIGN_IN} fullWidthAndHeight>
            {t("signIn")}
          </ButtonPrimaryNav>
        ) : (
          <UserMenu />
        )}
      </div>
    </nav>
  );
}

export function Header(): JSX.Element {
  const [isNavCollapsed, toggleNavCollapsed] = useReducer(
    (prev) => !prev,
    true
  );

  return (
    <header className="bg-indigo-900 text-gray-300">
      <div className="flex h-full flex-col items-center md:flex-row">
        <div className="inline-block">
          <NavLink to={ROUTES.HOME} showLoadingAnimation>
            <div className="ml-4 flex items-center whitespace-nowrap py-2 md:py-0 md:pr-10">
              <span className="inline-block h-8">
                <Logo />
              </span>
              <TextGradient>Product</TextGradient>
            </div>
          </NavLink>
        </div>

        <div className="block w-full md:hidden">
          <div className="ml-2 inline" onClick={toggleNavCollapsed}>
            <IconMenu size="large" />
          </div>
          <Transition
            show={!isNavCollapsed}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Nav />
          </Transition>
        </div>

        <div className="hidden w-full flex-grow md:block">
          <Nav />
        </div>
      </div>
    </header>
  );
}
