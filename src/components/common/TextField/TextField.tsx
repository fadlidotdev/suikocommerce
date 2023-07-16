import {classes} from "@/utils/core";
import {HTMLProps, forwardRef} from "react";

interface Props extends HTMLProps<HTMLInputElement> {
  label?: string;
  divClass?: string;
  error?: string;
}

const TextField = forwardRef<HTMLInputElement, Props>(
  ({className, id, label, divClass, error, ...otherProps}, ref) => {
    return (
      <div className={classes("space-y-1", divClass)}>
        {label ? (
          <label htmlFor={id} className="block mb-2 text-sm font-medium">
            {label}
          </label>
        ) : null}

        <input
          id={id}
          className={classes(
            "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
            className,
          )}
          ref={ref}
          {...otherProps}
        />

        {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
      </div>
    );
  },
);

TextField.displayName = "TextField";

export default TextField;
