import Image from "next/image";

import IconButton from "../IconButton";

type Props = {
  totalPage: number;
  currentPage: number;
  onChange: (page: number) => void;
};

const FIRST_PAGE = 1;
const SIDE_LIMIT_FROM_MIDDLE = 3;

const getPageRange = (start: number, end: number) => {
  const arr = [];

  for (let i = start; i <= end; i++) {
    arr.push(i);
  }

  return arr;
};

const getLeftSidePages = (currentPage: number) => {
  let isEllipses = false;
  let values: Array<number> = [];

  if (currentPage - SIDE_LIMIT_FROM_MIDDLE > 1) {
    isEllipses = true;
    values = [currentPage - 2, currentPage - 1, currentPage];
  } else {
    values = getPageRange(1, currentPage);
  }

  return {isEllipses, values};
};

const getRightSidePages = (currentPage: number, totalPage: number) => {
  let isEllipses = false;
  let values: Array<number> = [];

  if (currentPage + SIDE_LIMIT_FROM_MIDDLE < totalPage) {
    isEllipses = true;
    values = [currentPage + 1, currentPage + 2];
  } else {
    values = getPageRange(currentPage + 1, totalPage);
  }

  return {isEllipses, values};
};

const Pagination = (props: Props) => {
  const {totalPage, currentPage, onChange} = props;

  if (!totalPage || !currentPage) return null;

  if (totalPage <= 1) return null;

  const leftSidePages = getLeftSidePages(currentPage);
  const rightSidePages = getRightSidePages(currentPage, totalPage);

  return (
    <div className="flex flex-wrap items-center gap-1">
      {currentPage !== 1 && (
        <IconButton
          variant="alternate"
          size="small"
          disabled={currentPage === 1}
          onClick={() => onChange(currentPage - 1)}>
          <Image
            src="/icons/chevron-left.svg"
            width={20}
            height={20}
            alt="Prev page"
          />
        </IconButton>
      )}

      {leftSidePages.isEllipses && (
        <IconButton
          variant="alternate"
          size="small"
          onClick={() => onChange(FIRST_PAGE)}>
          {FIRST_PAGE}
        </IconButton>
      )}

      {leftSidePages.isEllipses && (
        <IconButton
          variant="alternate"
          size="small"
          onClick={() => onChange(leftSidePages.values[0] - 1)}>
          ...
        </IconButton>
      )}

      {leftSidePages.values.map((page) => (
        <IconButton
          key={page}
          variant={currentPage === page ? "main" : "alternate"}
          size="small"
          onClick={() => onChange(page)}>
          {page}
        </IconButton>
      ))}

      {rightSidePages.values.map((page) => (
        <IconButton
          key={page}
          variant="alternate"
          size="small"
          onClick={() => onChange(page)}>
          {page}
        </IconButton>
      ))}
      {rightSidePages.isEllipses && (
        <IconButton
          variant="alternate"
          size="small"
          onClick={() => onChange(rightSidePages.values[0] + 2)}>
          ...
        </IconButton>
      )}
      {rightSidePages.isEllipses && (
        <IconButton
          variant={currentPage === totalPage ? "main" : "alternate"}
          size="small"
          onClick={() => onChange(totalPage)}>
          {totalPage}
        </IconButton>
      )}

      {currentPage !== totalPage && (
        <IconButton
          variant="alternate"
          size="small"
          disabled={currentPage === totalPage}
          onClick={() => onChange(currentPage + 1)}>
          <Image
            src="/icons/chevron-right.svg"
            width={20}
            height={20}
            alt="Prev page"
          />
        </IconButton>
      )}
    </div>
  );
};

/* Logic Behind Pagination
[1]  2   3  ...  23 >
<   1  [2]  3   4  ...  23   >
<   1   2  [3]  4   5  ...  23   >
<   1   2   3  [4]  5   6   ...  23   >
<   1  ...  3   4  [5]  6    7   ...  23   >
<   1  ...  4   5  [6]  7    8   ...  23   >
<   1  ...  5   6  [7]  8    9   ...  23   >
<   1  ...  6   7  [8]  9    10  ...  23   >

Next Button
- hide when in the last

Prev Button 
- show when current page != 1

Get Left Side
if current - 3 > 1 
 - isEllipses
 - values [current-2, current-1, current]

else
 values [1..current]

Get Right Side
if current + 3 < total
 - isEllipses
 - values [current+1, current+2]
else
 values [current+1..total]
*/

export default Pagination;
