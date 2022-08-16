import { forwardRef, ReactNode } from "react";
import { Button, ButtonProps } from "./button";
import { IconCheck } from "./Icon";
import { Switch } from "./Switch";

type FormlabelProps = React.ComponentPropsWithoutRef<"label"> & {
  small?: boolean;
  whiteText?: boolean;
};

/**
 * Additional props:
 * - small?: `boolean`
 * - whiteText?: `boolean`
 */
export function FormLabel({
  small = false,
  whiteText = false,
  ...props
}: FormlabelProps): JSX.Element {
  return (
    <label
      className={`block text-left uppercase tracking-widest ${
        small ? "text-xs" : "text-sm"
      } ${whiteText ? "text-white" : "text-gray-400"}`}
      {...props}
    >
      {props.children}
    </label>
  );
}

export type FormSubmitProps = {
  isValid: boolean;
  isValidating: boolean;
  isSubmitted: boolean;
  isSubmitting: boolean;
  icon?: ButtonProps["icon"];
  small?: ButtonProps["small"];
  children?: ReactNode;
} & /** If we show loading on click, we needed to hide the loading animation in case the submission was not successful.
 * This is e.g. used for the sign in, where a successful sign in attempt will
 * start a navigation (that's why it needs `showLoadingOnClick = true`), but the attempt could fail (e.g. wrong password).
 * Without this check (`hasErrorAfterSubmit`), we'd show a loading animation indefinitely.
 */ (
  | { showLoadingOnClick: true; hasErrorAfterSubmit: boolean }
  | { showLoadingOnClick?: never; hasErrorAfterSubmit?: never }
);

export function FormSubmit(props: FormSubmitProps): JSX.Element {
  // we ignore the "invalid" status for a form that has not been submitted yet
  const isValidForm =
    !props.isSubmitted || (props.isValid && !props.isValidating);

  return (
    <Button
      disabled={!isValidForm || props.isSubmitting}
      icon={props.icon ?? <IconCheck />}
      small={props.small}
      isLoading={props.isSubmitting}
      showLoadingOnClick={
        props.showLoadingOnClick === true ? !props.hasErrorAfterSubmit : false
      }
    >
      <span>{props.children ?? "Submit"}</span>
      <input className="hidden" type="submit" />
    </Button>
  );
}

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  small?: boolean;
  hasLabel?: boolean;
} & (
    | { canHaveValidationError?: true; validationErrorMessage?: string }
    | { canHaveValidationError?: false; validationErrorMessage?: never }
  );

/**
 * Additional props:
 * - small?: `boolean`
 * - hasLabel?: `boolean`
 * // use this to show additional vertical space next to the input in case you want to show errors
 * - canHaveValidationError?: `boolean`
 * - validationErrorMessage?: `string`
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    small = false,
    hasLabel = true,
    canHaveValidationError = true,
    validationErrorMessage = undefined,
    ...props
  },
  ref
): JSX.Element {
  return (
    <>
      <input
        type={props.type ?? "text"}
        className={
          "block w-full rounded-md shadow-sm placeholder:text-indigo-300 hover:shadow-md disabled:cursor-not-allowed disabled:bg-gray-100" +
          // only show margin when there is a label
          ` ${hasLabel && !small && "mt-1"}` +
          ` ${small ? "py-1.5 px-2 text-xs" : "text-sm"}` +
          ` ${
            !props.required
              ? "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              : "border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500"
          }`
        }
        {...props}
        ref={ref}
      />

      {canHaveValidationError && <FormError message={validationErrorMessage} />}
    </>
  );
});

/**
 * Additional props:
 * - small?: `boolean`
 * - hasLabel?: `boolean`
 * // use this to show additional vertical space next to the input in case you want to show errors
 * - canHaveValidationError?: `boolean`
 * - validationErrorMessage?: `string`
 * - isChecked: `boolean`
 * - onClick: `() => void`
 */
export function InputSwitch({
  small = false,
  hasLabel = true,
  canHaveValidationError = true,
  validationErrorMessage = undefined,
  isChecked,
  onClick,
}: InputProps & { isChecked: boolean; onClick: () => void }): JSX.Element {
  return (
    <div
      className={
        "block w-full" +
        ` ${hasLabel && !small && "mt-1"}` +
        ` ${small && "py-1.5 px-2"}`
      }
    >
      <Switch small={small} isChecked={isChecked} toggle={onClick} />

      {canHaveValidationError && <FormError message={validationErrorMessage} />}
    </div>
  );
}

export function FormError({
  message,
}: {
  message: string | undefined;
}): JSX.Element {
  return (
    <p className="mt-1 mb-6 text-left text-sm text-yellow-500">
      {/* TODO better solution to show empty string */}
      {message ?? <span className="opacity-0">Placeholder</span>}
    </p>
  );
}

// type Option = {
//   label: React.ReactNode;
//   value: string | number | string[];
// };

// type SelectProps = React.DetailedHTMLProps<
//   React.SelectHTMLAttributes<HTMLSelectElement>,
//   HTMLSelectElement
// > & { options: Option[] };

// export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
//   function Select({ options, ...props }, ref) {
//     return (
//       <select ref={ref} {...props}>
//         {options.map(({ label, value }) => (
//           <option value={value} key={value + ""}>
//             {label}
//           </option>
//         ))}
//       </select>
//     );
//   }
// );

export function Form(
  props: React.ComponentPropsWithoutRef<"form">
): JSX.Element {
  return (
    <form className="inline-block w-full" {...props}>
      {props.children}
    </form>
  );
}
