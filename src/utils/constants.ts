const constantsObject = {
  appName: "CMS Suikocommerce",
  accessToken: "__accessToken",
};

export type Constant = keyof typeof constantsObject;

const constants = (name: Constant) => constantsObject[name];

export default constants;
