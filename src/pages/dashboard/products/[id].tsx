import {useQueryGetSingleProduct} from "@/api/product";
import {ContentLoader, Meta, TextField} from "@/components/common";
import {
  DashboardContent,
  DashboardHeader,
} from "@/components/layouts/DashboardLayout";
import {ImageGallery} from "@/components/shared";
import {capitalize} from "@/utils/core";
import {useRouter} from "next/router";

const ProductDetailPage = () => {
  const {query} = useRouter();

  const {data, isLoading} = useQueryGetSingleProduct(
    Number(query.id as string),
    {
      enabled: !!query.id,
    },
  );

  return (
    <>
      <Meta title={data?.title} />

      <DashboardHeader title={data?.title ?? ""} hasBack />

      <DashboardContent>
        <div className="md:flex md:gap-8">
          <form className="w-full max-w-lg mb-4 space-y-4">
            <TextField readOnly label="Name" defaultValue={data?.title} />
            <TextField readOnly label="Brand" defaultValue={data?.brand} />
            <TextField
              readOnly
              label="Category"
              defaultValue={capitalize(data?.category)}
            />
            <TextField readOnly label="Price" defaultValue={data?.price} />
            <TextField readOnly label="Stock" defaultValue={data?.stock} />
          </form>

          {isLoading ? (
            <ContentLoader height={300} width={250} />
          ) : (
            <ImageGallery
              thumbnail={data?.thumbnail || ""}
              images={data?.images || []}
            />
          )}
        </div>
      </DashboardContent>
    </>
  );
};

export default ProductDetailPage;
