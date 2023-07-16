import {useEffect, useState} from "react";
import qs from "query-string";
import {useRouter} from "next/router";

export const useRouteMappingPagination = (currentPage: number) => {
  const router = useRouter();

  const onChangeRoute = () => {
    const paramsObj = {page: currentPage > 1 ? currentPage : null};

    let urlParams = qs.stringify(paramsObj, {
      skipEmptyString: true,
      skipNull: true,
    });

    urlParams = urlParams ? `?${urlParams}` : "";

    const {url} = qs.parseUrl(router.asPath);

    router.push(`${url}${urlParams}`, undefined, {
      shallow: true,
    });
  };

  useEffect(
    () => {
      onChangeRoute();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPage],
  );
};

export const useTotalPage = (countItems: number | undefined, limit: number) => {
  const [totalPage, setTotalPage] = useState(0);

  useEffect(
    () => {
      if (!countItems) return;

      setTotalPage(Math.floor(countItems / limit));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [countItems, totalPage],
  );

  return totalPage;
};
