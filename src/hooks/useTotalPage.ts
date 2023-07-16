import {useEffect, useState} from "react";

export const useTotalPage = (countItems: number | undefined, limit: number) => {
  const [totalPage, setTotalPage] = useState(0);

  useEffect(
    () => {
      if (!countItems || totalPage !== 0) return;

      setTotalPage(Math.floor(countItems / limit));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [countItems, totalPage],
  );

  return totalPage;
};

export default useTotalPage;
