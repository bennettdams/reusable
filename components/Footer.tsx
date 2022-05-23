export function Footer(): JSX.Element {
  return (
    <footer className="body-font border-t border-gray-200">
      <div className="flex h-full flex-col items-center justify-center md:flex-row">
        <div className="ml-4 flex items-center whitespace-nowrap py-2 md:py-0">
          <span className="inline-block h-8">
            <Logo />
          </span>
          <span className="ml-4 whitespace-nowrap p-1 text-sm font-medium md:p-2 md:text-lg">
            Product
          </span>
        </div>
        <div className="ml-4 text-sm md:border-l-2 md:border-gray-300">
          <p className="ml-4">
            <span>© 2022 Bennett Dams —</span>
            <a
              href="mailto:info@koerber-pharma.com"
              className="ml-1 text-gray-600"
              rel="noopener noreferrer"
              target="_blank"
            >
              info@product.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
