import {classes} from "@/utils/core";

type Props = {
  width?: string | number;
  height?: string | number;
  isRounded?: boolean;
  isCircle?: boolean;
  className?: string;
  isClassNameDimension?: boolean;
};

const ContentLoader = (props: Props) => {
  const {
    width = "100%",
    height = "100%",
    isRounded = true,
    isCircle,
    className,
    isClassNameDimension = false,
  } = props;

  const dimension = {width, height};

  return (
    <div
      className={classes(
        "bg-gray-200 shrink-0 grow-0",
        isRounded && "rounded-lg",
        isCircle && "rounded-full",
        className,
      )}
      style={isClassNameDimension ? {} : dimension}>
      <div className="relative h-full animate-pulse">
        <div
          className={classes(
            "bg-line absolute inset-0",
            isRounded && "rounded-lg",
            isCircle && "rounded-full",
          )}
        />
      </div>
    </div>
  );
};

export default ContentLoader;
