import {withMeta} from "@/components/common/Meta/Meta";
import {
  DashboardContent,
  DashboardHeader,
} from "@/components/layouts/DashboardLayout";

const CartsPage = () => {
  return (
    <>
      <DashboardHeader title="Carts" />
      <DashboardContent>
        <div>Cart Content</div>
      </DashboardContent>
    </>
  );
};

export default withMeta(CartsPage, {title: "Products"});
