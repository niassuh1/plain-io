import { FC, SVGProps } from "react";

export const Logo: FC<SVGProps<SVGSVGElement>> = ({
  width = "0.83em",
  height = "1em",
  ...props
}) => {
  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 140 168"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0H56V112V168H0V112V0ZM140 0H84V112H140V0Z"
        fill="currentColor"
      />
    </svg>
  );
};
