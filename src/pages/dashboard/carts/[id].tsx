import {Card, ContentLoader, TD, TH, TR, Table} from "@/components/common";
import {withMeta} from "@/components/common/Meta/Meta";
import {
  DashboardContent,
  DashboardHeader,
} from "@/components/layouts/DashboardLayout";
import {useRouter} from "next/router";
import {ReactNode, useMemo} from "react";
import {format} from "date-fns";
import {formatToCurrency} from "@/utils/core";
import Link from "next/link";
import {routes} from "@/utils/routes";
import {useQueryGetSingleCart} from "@/api/cart";

type SummaryCardProps = {
  title: string;
  description: ReactNode;
  loading?: boolean;
};
const SummaryCard = ({title, description, loading}: SummaryCardProps) => (
  <Card className="flex flex-col py-3 min-h-[68px]">
    <span className="text-sm text-gray-500">{title}</span>
    {loading ? (
      <ContentLoader height={20} width={80} isRounded={false} />
    ) : (
      <span className="font-bold">{description}</span>
    )}
  </Card>
);

const CartDetailPage = () => {
  const {query} = useRouter();

  const {data, isLoading} = useQueryGetSingleCart(Number(query.id as string), {
    enabled: !!query.id,
  });

  const orderDate = useMemo(() => format(new Date(), "MM/dd/yyyy"), []);

  const columns = useMemo(
    () => [
      "Name",
      "Price",
      "Qty",
      "Discount percentage",
      "Discount total",
      "Total",
      "Subtotal",
    ],
    [],
  );

  return (
    <>
      <DashboardHeader title={`Cart Detail #${query.id}`} hasBack />

      <DashboardContent>
        <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-3">
          <SummaryCard
            loading={isLoading}
            title="User"
            description={data?.userId}
          />

          <SummaryCard
            loading={isLoading}
            title="Order date"
            description={orderDate}
          />

          <SummaryCard
            loading={isLoading}
            title="Number of products"
            description={data?.totalProducts}
          />

          <SummaryCard
            loading={isLoading}
            title="Qty items"
            description={data?.totalQuantity}
          />

          <SummaryCard
            loading={isLoading}
            title="Discount total"
            description={
              data && `-${formatToCurrency(data.total - data.discountedTotal)}`
            }
          />

          <SummaryCard
            loading={isLoading}
            title="Grand total"
            description={data && formatToCurrency(data.discountedTotal)}
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold">Product List</h2>
          {isLoading ? (
            <ContentLoader height={250} />
          ) : (
            <Table columns={columns}>
              {data?.products.map((product) => (
                <TR key={product.id}>
                  <TH>
                    <Link
                      href={routes("dashboard/products/detail", product.id)}
                      className="text-blue-500 hover:underline hover:decoration-solid">
                      {product.title}
                    </Link>
                  </TH>
                  <TD>{product.quantity}</TD>
                  <TD>{formatToCurrency(product.price)}</TD>
                  <TD>{product.discountPercentage}%</TD>
                  <TD>
                    -{" "}
                    {formatToCurrency(product.total - product.discountedPrice)}
                  </TD>
                  <TD>{formatToCurrency(product.total)}</TD>
                  <TD>{formatToCurrency(product.discountedPrice)}</TD>
                </TR>
              ))}
            </Table>
          )}
        </div>
      </DashboardContent>
    </>
  );
};

export default withMeta(CartDetailPage, {title: "Cart details"});
