import {Card, TD, TH, TR, Table} from "@/components/common";
import {withMeta} from "@/components/common/Meta/Meta";
import {
  DashboardContent,
  DashboardHeader,
} from "@/components/layouts/DashboardLayout";
import {useRouter} from "next/router";
import {useMemo} from "react";
import {format} from "date-fns";
import {formatToCurrency} from "@/utils/core";
import Link from "next/link";
import {routes} from "@/utils/routes";

const dummyData = {
  id: 1,
  products: [
    {
      id: 59,
      title: "Spring and summershoes",
      price: 20,
      quantity: 3,
      total: 60,
      discountPercentage: 8.71,
      discountedPrice: 55,
    },
    {
      id: 88,
      title: "TC Reusable Silicone Magic Washing Gloves",
      price: 29,
      quantity: 2,
      total: 58,
      discountPercentage: 3.19,
      discountedPrice: 56,
    },
    {
      id: 18,
      title: "Oil Free Moisturizer 100ml",
      price: 40,
      quantity: 2,
      total: 80,
      discountPercentage: 13.1,
      discountedPrice: 70,
    },
    {
      id: 95,
      title: "Wholesale cargo lashing Belt",
      price: 930,
      quantity: 1,
      total: 930,
      discountPercentage: 17.67,
      discountedPrice: 766,
    },
    {
      id: 39,
      title: "Women Sweaters Wool",
      price: 600,
      quantity: 2,
      total: 1200,
      discountPercentage: 17.2,
      discountedPrice: 994,
    },
  ],
  total: 2328,
  discountedTotal: 1941,
  userId: 97,
  totalProducts: 5,
  totalQuantity: 10,
};

const CartDetailPage = () => {
  const {query} = useRouter();

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
      <DashboardHeader title={`Cart Detail ${query.id}`} hasBack />

      <DashboardContent>
        <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-3">
          <Card className="flex flex-col py-3">
            <span className="text-sm text-gray-500">User</span>
            <span className="font-bold">Nova Julita</span>
          </Card>

          <Card className="flex flex-col py-3">
            <span className="text-sm text-gray-500">Order date</span>
            <span className="font-bold">{orderDate}</span>
          </Card>

          <Card className="flex flex-col py-3">
            <span className="text-sm text-gray-500">Number of products</span>
            <span className="font-bold">
              {dummyData.totalProducts} products
            </span>
          </Card>

          <Card className="flex flex-col py-3">
            <span className="text-sm text-gray-500">Qty Items</span>
            <span className="font-bold">{dummyData.totalQuantity} items</span>
          </Card>

          <Card className="flex flex-col py-3">
            <span className="text-sm text-gray-500">Discount total</span>
            <span className="font-bold">
              {formatToCurrency(dummyData.discountedTotal)}
            </span>
          </Card>

          <Card className="flex flex-col py-3">
            <span className="text-sm text-gray-500">Grand total</span>
            <span className="font-bold">
              {formatToCurrency(dummyData.total)}
            </span>
          </Card>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold">Product List</h2>
          <Table columns={columns}>
            {dummyData.products.map((product) => (
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
                  - {formatToCurrency(product.total - product.discountedPrice)}
                </TD>
                <TD>{formatToCurrency(product.total)}</TD>
                <TD>{formatToCurrency(product.discountedPrice)}</TD>
              </TR>
            ))}
          </Table>
        </div>
      </DashboardContent>
    </>
  );
};

export default withMeta(CartDetailPage, {title: "Cart details"});
