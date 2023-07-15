import {classes} from "@/utils/core";
import React, {ReactNode} from "react";

type TRProps = {children: JSX.Element | ReactNode; stripped?: boolean};
export const TR = ({children, stripped = false}: TRProps) => (
  <tr className={classes("border-b", stripped ? "bg-gray-50" : "bg-white")}>
    {children}
  </tr>
);

type THProps = TRProps & {className?: string};
export const TH = ({children, className}: THProps) => (
  <th
    scope="row"
    className={classes(
      "px-6 py-2 font-medium text-gray-900 whitespace-nowrap",
      className,
    )}>
    {children}
  </th>
);

type TDProps = THProps;
export const TD = ({children, className}: TDProps) => (
  <td className={classes("px-6 py-2", className)}>{children}</td>
);

type Props = {
  columns: string[];
  children: JSX.Element[];
};

const Table = ({columns, children}: Props) => {
  return (
    <div className="relative mb-4 overflow-x-auto shadow sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col" className="px-6 py-3">
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
