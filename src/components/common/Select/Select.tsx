import {classes} from "@/utils/core";
import {InputHTMLAttributes, forwardRef} from "react";

interface Props extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  divClass?: string;
}

const Select = forwardRef<HTMLSelectElement, Props>(
  ({className, id, label, divClass, children, ...otherProps}, ref) => {
    return (
      <div className={classes("space-y-1", divClass)}>
        {label ? (
          <label htmlFor={id} className="block mb-2 text-sm font-medium">
            {label}
          </label>
        ) : null}

        <select
          id={id}
          ref={ref}
          className={classes(
            "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
            className,
          )}
          {...otherProps}>
          {children}
        </select>
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
