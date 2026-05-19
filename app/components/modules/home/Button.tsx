import Link from "next/link";

interface ButtonProps {
  href: string;
  text?: string;
  color?: "light" | "dark";
  className?: string;
}

export const Button = ({ href, text = "Get started", color = "dark", className = "" }: ButtonProps) => {
  const base = "inline-flex items-center justify-center px-6 md:px-10 py-3.5 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";
  const variant =
    color === "light"
      ? "bg-white text-black border border-gray-300 hover:border-blue-500"
      : "bg-black text-white shadow";

  return (
    <Link href={href} className={`${base} ${variant} ${className}`}>
      {text}
    </Link>
  );
};
