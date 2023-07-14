const constantsObject = {
  appName: "CMS Suicommerce",
};

type Constant = keyof typeof constantsObject;

const constants = (name: Constant) => constantsObject[name];

export default constants;
