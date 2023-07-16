import {classes} from "@/utils/core";
import React, {HTMLProps} from "react";

interface Props extends HTMLProps<HTMLDivElement> {
  children: JSX.Element | JSX.Element[];
}

const Card = ({children, className, ...otherProps}: Props) => {
  return (
    <div
      className={classes(
        "w-full px-4 py-3 shadow bg-white rounded-lg ",
        className,
      )}
      {...otherProps}>
      {children}
    </div>
  );
};

export default Card;
