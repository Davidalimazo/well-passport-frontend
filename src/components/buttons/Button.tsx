import { cn } from "../../utils/classnames";
import { cva, VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, FC } from "react";

const buttonVariants = cva("active:bg-[#D72617]", {
  variants: {
    variant: {
      default: "bg-[#D72617]",
      filled: "bg-black text-white ring-2 ring-black",
      outline_black: "bg-white text-black ring-2 ring-black",
      outline_red: "text-red-500 ring-2 ring-[#D72617]",
      pressed: "bg-[#C8CCC8]",
      outline: "bg-white border border-green-400 text-green-400",
    },
    size: {
      default:
        "w-64 cursor-pointer h-12 rounded-full text-white font-semibold font-nunito text-lg px-4 flex flex-row items-center justify-center gap-2",
      lg: "w-24 h-24",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({
  loading,
  className,
  variant,
  size,
  children,
  icon,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(buttonVariants({ variant, size, className }))}
    >
      {icon ? icon : null}{" "}
      {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : null} {children}
    </button>
  );
};

export default Button;
