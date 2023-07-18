import constants from "@/utils/constants";
import Head from "next/head";
import React, {ComponentType} from "react";

type Props = {
  title?: string;
};

const Meta = ({title}: Props) => {
  const appName = constants("appName");

  return (
    <Head>
      <title>{title ? `${title} - ${appName}` : appName}</title>
      <meta
        name="description"
        content="Suikocommerce is a powerful CMS designed specifically for ecommerce management. It provides a comprehensive set of features and tools to efficiently manage and operate an online store. With Suikocommerce, you can easily handle product catalog management, inventory tracking, order processing, customer management, and much more. Streamline your ecommerce operations with Suikocommerce today!"></meta>
    </Head>
  );
};

export const withMeta = <T extends object>(
  Component: ComponentType<T>,
  props?: Props,
) => {
  // eslint-disable-next-line react/display-name
  return (componentProps: T) => (
    <>
      <Meta {...props} />
      <Component {...componentProps} />
    </>
  );
};

export default Meta;
