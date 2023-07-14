import {classes} from "@/utils/core";
import {cva, VariantProps} from "class-variance-authority";

const baseStyles = "px-5 py-2 text-sm font-medium text-white";

const button = cva(baseStyles, {
  variants: {
    variant: {
      main: "text-white bg-gray-800 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300",
      alternate:
        "text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200",
    },
  },
  defaultVariants: {
    variant: "main",
  },
});

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

const Button = (props: Props) => {
  const {className, variant, children, ...otherProps} = props;

  return (
    <button className={classes(button({variant, className}))} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
