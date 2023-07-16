import Link from "next/link";
import {useEffect, useMemo, useState} from "react";

import {
  Product,
  useQueryGetAllProduct,
  useQueryGetAllProductByCategory,
  useQueryGetCategories,
  useQuerySearchProducts,
} from "@/api/product";
import {
  Button,
  ContentLoader,
  Pagination,
  Select,
  TD,
  TH,
  TR,
  Table,
  TextField,
} from "@/components/common";
import {withMeta} from "@/components/common/Meta/Meta";
import {
  DashboardContent,
  DashboardHeader,
} from "@/components/layouts/DashboardLayout";
import {useRouteMappingPagination, useTotalPage} from "@/hooks/core";
import {routes} from "@/utils/routes";
import {GetServerSideProps} from "next";
import {capitalize} from "@/utils/core";
import {useDebounce} from "@/hooks";
import regex from "@/utils/regex";

const Loading = () => <ContentLoader height={500} className="mb-6" />;

const LIMIT = 10;

type Props = {
  initialPage: number;
};

const ProductsPage = ({initialPage}: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  const [currentPage, setCurrentPage] = useState(initialPage);
  useRouteMappingPagination(currentPage);
  const [search, setSearch] = useState("");
  const delayedSearch = useDebounce<string>(search, 250);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [filter, setFilter] = useState({
    brand: "",
    priceFrom: "",
    priceTo: "",
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [delayedSearch]);

  useEffect(() => {
    setSearch("");
    setCurrentPage(1);
  }, [selectedCategory]);

  const {data, isLoading, fetchStatus} = useQueryGetAllProduct(
    {
      limit: LIMIT,
      page: currentPage,
    },
    {
      enabled: delayedSearch === "" && selectedCategory === "",
    },
  );

  const querySearch = useQuerySearchProducts(
    delayedSearch,
    {limit: LIMIT, page: currentPage},
    {
      enabled: !!delayedSearch && selectedCategory === "",
    },
  );

  const queryAllProductByCategory = useQueryGetAllProductByCategory(
    selectedCategory,
    {limit: LIMIT, page: currentPage},
    {
      enabled: !!selectedCategory,
    },
  );

  useEffect(() => {
    if (selectedCategory) {
      setProducts(queryAllProductByCategory.data?.products || []);
      return;
    }

    if (delayedSearch) {
      setProducts(querySearch.data?.products || []);
    } else {
      setProducts(data?.products || []);
    }
  }, [
    selectedCategory,
    delayedSearch,
    data,
    queryAllProductByCategory.data,
    querySearch.data,
  ]);

  const queryProductCategories = useQueryGetCategories();

  const onResetFilter = () => {
    setSearch("");
    setSelectedCategory("");
    setFilter({
      brand: "",
      priceFrom: "",
      priceTo: "",
    });
  };

  const totalPage = useTotalPage(
    // eslint-disable-next-line no-nested-ternary
    selectedCategory
      ? queryAllProductByCategory.data?.total
      : delayedSearch
      ? querySearch.data?.total
      : data?.total,
    LIMIT,
  );

  const columns = useMemo(
    () => ["Name", "Brand", "Category", "Price", "Stock", "Action"],
    [],
  );

  const loading =
    (isLoading && fetchStatus === "fetching") ||
    (querySearch.isLoading && querySearch.fetchStatus === "fetching") ||
    (queryAllProductByCategory.isLoading &&
      queryAllProductByCategory.fetchStatus === "fetching");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const includedBrand = product.brand
        .toLowerCase()
        .includes(filter.brand.toLowerCase());
      const includedPriceFrom = product.price >= Number(filter.priceFrom ?? 0);
      const includedPriceTo =
        filter.priceTo !== ""
          ? product.price <= Number(filter.priceTo ?? 0)
          : true;

      const includedSearch = selectedCategory
        ? product.title.toLowerCase().includes(search.toLowerCase())
        : true;

      return (
        includedBrand && includedPriceFrom && includedPriceTo && includedSearch
      );
    });
  }, [filter, products, search, selectedCategory]);

  return (
    <>
      <DashboardHeader title="Products" />

      <DashboardContent>
        <div className="mb-6">
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex items-center w-full gap-2">
              <Select
                divClass="flex-grow"
                label="Category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="" disabled>
                  Filter by category
                </option>
                {queryProductCategories.data?.map((category) => (
                  <option
                    key={category}
                    className="capitalize"
                    value={category}>
                    {capitalize(category)}
                  </option>
                ))}
              </Select>

              <TextField
                divClass="flex-grow"
                label="Brand"
                type="text"
                placeholder="Filter by brand"
                value={filter.brand}
                onChange={(e) =>
                  setFilter((prev) => ({...prev, brand: e.target.value}))
                }
              />

              <TextField
                divClass="flex-grow"
                label="Price from"
                type="text"
                placeholder="Enter price from value"
                value={filter.priceFrom}
                onChange={(e) => {
                  const {value} = e.target;

                  if (regex.numeric.test(value) || value === "")
                    setFilter((prev) => ({...prev, priceFrom: e.target.value}));
                }}
              />

              <TextField
                divClass="flex-grow"
                label="Price to"
                type="text"
                placeholder="Enter price to value"
                value={filter.priceTo}
                onChange={(e) => {
                  const {value} = e.target;

                  if (regex.numeric.test(value) || value === "")
                    setFilter((prev) => ({...prev, priceTo: e.target.value}));
                }}
              />
            </div>

            <TextField
              type="text"
              placeholder="Search products"
              className="w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex justify-between">
            <p className="max-w-xs text-sm italic text-gray-500 sm:max-w-2xl">
              Filter brand, price from, price to only applied for local data
            </p>

            <Button variant="alternate" onClick={onResetFilter}>
              Reset filter
            </Button>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <Table columns={columns} className="mb-6">
            {filteredProducts.map((product) => (
              <TR key={product.id}>
                <TH>{product.title}</TH>
                <TD>{product.brand}</TD>
                <TD>{product.category}</TD>
                <TD>${product.price}</TD>
                <TD>{product.stock}</TD>
                <TD>
                  <Link href={routes("dashboard/products/detail", product.id)}>
                    <Button variant="alternate" size="small">
                      Detail
                    </Button>
                  </Link>
                </TD>
              </TR>
            ))}
          </Table>
        )}

        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </DashboardContent>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const {page} = query;

  return {
    props: {
      initialPage: parseInt(page as string) || 1,
    },
  };
};

export default withMeta(ProductsPage, {title: "Products"});
