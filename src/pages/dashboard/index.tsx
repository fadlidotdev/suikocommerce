import {Logo} from "@/components/common";
import {withMeta} from "@/components/common/Meta/Meta";

const DashboardPage = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col gap-3 text-center md:flex-row">
        <Logo width={100} height={100} className="opacity-60" />

        <div className="space-y-1">
          <h1 className="text-2xl font-bold drop-shadow-lg">CMS Suicommerce</h1>
          <span className="text-gray-500">Smart. Beautiful. Ecommerce.</span>
        </div>
      </div>
    </div>
  );
};

export default withMeta(DashboardPage);
