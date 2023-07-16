import {useQueryGetAllCart} from "@/api/cart";
import {
  Button,
  ContentLoader,
  Pagination,
  TD,
  TH,
  TR,
  Table,
} from "@/components/common";
import {withMeta} from "@/components/common/Meta/Meta";
import {
  DashboardContent,
  DashboardHeader,
} from "@/components/layouts/DashboardLayout";
import {useRouteMappingPagination, useTotalPage} from "@/hooks/core";
import {formatToCurrency} from "@/utils/core";
import {routes} from "@/utils/routes";
import {GetServerSideProps} from "next";
import Link from "next/link";
import {useMemo, useState} from "react";

const Loading = () => <ContentLoader height={500} className="mb-6" />;

const LIMIT = 10;

type Props = {
  initialPage: number;
};

const CartsPage = ({initialPage}: Props) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  useRouteMappingPagination(currentPage);

  const {data, isLoading} = useQueryGetAllCart({
    limit: LIMIT,
    page: currentPage,
  });

  const totalPage = useTotalPage(data?.total, LIMIT);

  const columns = useMemo(
    () => [
      "ID",
      "User ID",
      "Total Products",
      "Total Quantity",
      "Discount",
      "Total",
      "Action",
    ],
    [],
  );

  return (
    <>
      <DashboardHeader title="Carts" />

      <DashboardContent>
        {isLoading ? (
          <Loading />
        ) : (
          <Table columns={columns} className="mb-6">
            {data?.carts.map((cart) => (
              <TR key={cart.id}>
                <TH>{cart.id}</TH>
                <TD>{cart.userId}</TD>
                <TD>{cart.totalProducts}</TD>
                <TD>{cart.totalQuantity}</TD>
                <TD>-{formatToCurrency(cart.total - cart.discountedTotal)}</TD>
                <TD>{formatToCurrency(cart.discountedTotal)}</TD>
                <TD>
                  <Link href={routes("dashboard/carts/detail", cart.id)}>
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

export default withMeta(CartsPage, {title: "Products"});
