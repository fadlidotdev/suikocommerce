import {Meta} from "@/components/common";
import {
  DashboardContent,
  DashboardHeader,
} from "@/components/layouts/DashboardLayout";
import Image from "next/image";
import React from "react";

const ProductDetailPage = () => {
  return (
    <>
      <Meta title="Microsoft Surface Laptop 4" />

      <DashboardHeader title="Microsoft Surface Laptop 4" hasBack />
      <DashboardContent>
        <div className="gap-8 space-y-8 md:flex">
          <Image
            className="object-contain bg-white rounded-lg shadow aspect-square place-self-start"
            src="https://i.dummyjson.com/data/products/8/thumbnail.jpg"
            width={250}
            height={250}
            alt="Product image"
          />

          <form className="w-full max-w-lg space-y-4">
            <div className="space-y-1">
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter product name"
                value="Microsoft Surface Laptop 4"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Brand
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter brand name"
                value="Microsoft"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Category
              </label>
              <select
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option disabled>Select category</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Price
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter price value"
                value="234"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Stock
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter stock value"
                value="10"
              />
            </div>
          </form>
        </div>
      </DashboardContent>
    </>
  );
};

export default ProductDetailPage;
