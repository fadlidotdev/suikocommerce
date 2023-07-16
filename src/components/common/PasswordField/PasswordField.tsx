import {useDisclosure} from "@/hooks";
import {classes} from "@/utils/core";
import Image from "next/image";
import {HTMLProps, forwardRef} from "react";

interface Props extends HTMLProps<HTMLInputElement> {
  label?: string;
  divClass?: string;
  error?: string;
}

const PasswordField = forwardRef<HTMLInputElement, Props>(
  ({className, id, label, divClass, error, ...otherProps}, ref) => {
    const [show, {onToggle}] = useDisclosure();

    return (
      <div className={classes("space-y-1", divClass)}>
        {label ? (
          <label htmlFor={id} className="block mb-2 text-sm font-medium">
            {label}
          </label>
        ) : null}

        <div className="relative">
          <input
            id={id}
            type={show ? "text" : "password"}
            className={classes(
              "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
              className,
            )}
            ref={ref}
            {...otherProps}
          />

          <button
            type="button"
            className="absolute top-3 right-2"
            onClick={onToggle}>
            <Image
              className="opacity-70"
              src={show ? "/icons/eye-closed.svg" : "/icons/eye-open.svg"}
              width={20}
              height={20}
              alt="Show password"
            />
          </button>
        </div>

        {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
      </div>
    );
  },
);

PasswordField.displayName = "PasswordField";

export default PasswordField;
