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
