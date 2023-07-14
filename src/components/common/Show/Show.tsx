type Props = {
  when: boolean;
  fallback?: JSX.Element;
  children: JSX.Element;
};

const Show = (props: Props) => {
  const {when, fallback, children} = props;

  if (when) return children;
  if (fallback) return fallback;
  return null;
};

export default Show;
