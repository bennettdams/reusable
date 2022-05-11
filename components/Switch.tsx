import { FormEvent, useEffect, useState } from "react";

export function useSwitch(
  isCheckedExternal = true
): [isChecked: boolean, toggle: () => void, reset: () => void] {
  const [isChecked, setIsChecked] = useState<boolean>(isCheckedExternal);
  useEffect(() => setIsChecked(isCheckedExternal), [isCheckedExternal]);

  function reset(): void {
    setIsChecked(isCheckedExternal);
  }

  function toggle(): void {
    setIsChecked((prevChecked) => !prevChecked);
  }

  return [isChecked, toggle, reset];
}

export function Switch({
  isChecked,
  toggle,
  label,
  small = false,
}: {
  isChecked: boolean;
  toggle: () => void;
  label?: string;
  small?: boolean;
}): JSX.Element {
  const switchSize = small ? "h-4 w-11" : "h-6 w-11";
  const circleSize = small ? "h-3 w-3" : "h-5 w-5";
  const translateX = small ? "translate-x-7" : "translate-x-5";

  function handleOnClick(e: FormEvent<HTMLButtonElement>): void {
    e.stopPropagation();
    e.preventDefault();
    toggle();
  }

  return (
    <div className="flex items-center space-x-4">
      <label className={small ? "text-sm" : "text-base"}>{label}</label>
      <button
        onClick={handleOnClick}
        role="switch"
        aria-checked={isChecked}
        className={
          "focus:shadow-outline relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out hover:bg-indigo-400 focus:outline-none" +
          ` ${isChecked ? "bg-indigo-300" : "bg-indigo-50"}` +
          ` ${switchSize}`
        }
      >
        <span
          className={
            "inline-block transform rounded-full bg-white transition duration-200 ease-in-out" +
            ` ${isChecked ? translateX : "translate-x-0"}` +
            ` ${circleSize}`
          }
        ></span>
      </button>
    </div>
  );
}
