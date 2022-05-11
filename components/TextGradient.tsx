import { ReactNode } from "react";

export function TextGradient({
  children,
  big = false,
}: {
  children: ReactNode;
  big?: boolean;
}): JSX.Element {
  return (
    <div
      className={
        "ml-4 inline-block text-center font-bold leading-none tracking-tight" +
        ` ${!big ? "text-sm md:text-lg" : "text-2xl md:text-4xl"}`
      }
    >
      <span className="bg-gradient-to-br from-purple-400 via-indigo-300 to-pink-300 decoration-clone bg-clip-text uppercase text-transparent">
        {children}
      </span>
    </div>
  );
}
