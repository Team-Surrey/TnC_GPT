import { forwardRef } from "react";

const Button = forwardRef(function Button(
  {
    children,
    onClick,
    icon,
  }: {
    children: React.ReactNode;
    onClick?: any;
    icon?: React.ReactNode;
  },
  ref?: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      ref={ref || null}
      onClick={onClick || null}
      className="hover:bg-black hover:bg-opacity-20 text-inherit p-2 rounded-lg w-full whitespace-nowrap overflow-hidden"
    >
      <div className="flex flex-row space-x-2 ">
        {icon}
        <span>{children}</span>
      </div>
    </button>
  );
});

export default Button;
