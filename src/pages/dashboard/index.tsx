import Image from "next/image";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <div className="relative flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="fixed w-[250px] min-h-screen bg-white pl-8 pr-2 pt-16 pb-8 flex flex-col">
        <Image
          className="relative mx-auto mb-8 left-1"
          src="/logo.svg"
          width={80}
          height={80}
          alt="Company logo"
        />
        <nav>
          <ul className="space-y-7">
            <li>
              <Link href="/dashboard">
                <div className="flex items-center gap-3 p-2 bg-gray-200 rounded-2xl">
                  <div className="p-2 bg-gray-100 rounded-xl">
                    <Image
                      src="/icons/dashboard.svg"
                      width={20}
                      height={20}
                      alt="Dashboard"
                    />
                  </div>

                  <span className="text-lg font-bold">Dashboard</span>
                </div>
              </Link>
            </li>

            <li>
              <Link href="/dashboard/products">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Image
                      src="/icons/product-list.svg"
                      width={20}
                      height={20}
                      alt="Dashboard"
                    />
                  </div>

                  <span className="text-lg font-bold">Products</span>
                </div>
              </Link>
            </li>

            <li>
              <Link href="/dashboard/carts">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Image
                      src="/icons/cart.svg"
                      width={20}
                      height={20}
                      alt="Dashboard"
                    />
                  </div>

                  <span className="text-lg font-bold">Carts</span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-auto">
          <button className="w-full px-5 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 ">
            Log out
          </button>
        </div>
      </aside>
      <div className="w-[300px]" />

      {/* DASHBOARD CONTENT */}
      <main className="w-full bg-white">
        <div className="relative min-h-screen p-8">
          <div className="absolute p-8 bg-gray-100 inset-8 rounded-2xl">
            <div className="flex items-center justify-center h-full">
              <div className="flex gap-3">
                <Image
                  className="opacity-60"
                  src="/logo.svg"
                  width={100}
                  height={100}
                  alt="Company logo"
                />
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold drop-shadow-lg">
                    CMS Suicommerce
                  </h1>
                  <span className="text-gray-500">
                    Smart. Beautiful. Ecommerce.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
