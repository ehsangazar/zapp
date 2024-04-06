interface ButtonProps {
  children: React.ReactNode;
  colorScheme?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  children,
  colorScheme,
  disabled,
  loading,
  onClick,
  type = "button",
}: ButtonProps) => {
  let color =
    colorScheme === "primary"
      ? "bg-blue-800"
      : colorScheme === "secondary"
      ? "bg-green-800"
      : "bg-red-800";

  let hover =
    colorScheme === "primary"
      ? "hover:bg-blue-700"
      : colorScheme === "secondary"
      ? "hover:bg-green-700"
      : "hover:bg-red-700";

  if (disabled) {
    color = "bg-gray-400";
    hover = "";
  }

  return (
    <button
      className={`px-4 py-2 rounded text-white ${color} ${hover} transition-colors duration-200 ease-in-out`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
