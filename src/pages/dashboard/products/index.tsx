import Link from "next/link";
import {useMemo, useState} from "react";

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
import {routes} from "@/utils/routes";
import {useQueryGetAllProduct} from "@/api/product";
import useTotalPage from "@/hooks/useTotalPage";

const Loading = () => <ContentLoader height={500} className="mb-6" />;

const LIMIT = 10;

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {data, isLoading} = useQueryGetAllProduct({
    limit: LIMIT,
    page: currentPage,
  });

  const totalPage = useTotalPage(data?.total, LIMIT);

  const columns = useMemo(
    () => ["Name", "Brand", "Category", "Price", "Stock", "Action"],
    [],
  );

  const categories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting",
  ];

  return (
    <>
      <DashboardHeader title="Products" />
      <DashboardContent>
        <div className="mb-6">
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex items-center w-full gap-2">
              <Select divClass="flex-grow" label="Category">
                <option value="" disabled>
                  Filter by category
                </option>
                {categories.map((category) => (
                  <option
                    key={category}
                    className="capitalize"
                    value={category}>
                    {category}
                  </option>
                ))}
              </Select>

              <TextField
                divClass="flex-grow"
                label="Brand"
                type="text"
                placeholder="Filter by brand"
              />

              <TextField
                divClass="flex-grow"
                label="Price from"
                type="text"
                placeholder="Enter price from value"
              />

              <TextField
                divClass="flex-grow"
                label="Price to"
                type="text"
                placeholder="Enter price to value"
              />
            </div>

            <TextField
              type="text"
              placeholder="Search products"
              className="w-full"
            />
          </div>

          <Button className="block ml-auto" variant="alternate">
            Reset filter
          </Button>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <Table columns={columns} className="mb-6">
            {data?.products.map((product) => (
              <TR key={product.id}>
                <TH>{product.title}</TH>
                <TD>{product.brand}</TD>
                <TD>{product.category}</TD>
                <TD>${product.price}</TD>
                <TD>{product.stock}</TD>
                <TD>
                  <Link href={routes("dashboard/products/detail", 1)}>
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

export default withMeta(ProductsPage, {title: "Products"});
