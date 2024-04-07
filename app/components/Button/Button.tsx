import Typography from "../Typography/Typography";

interface ButtonProps {
  children: React.ReactNode;
  colorScheme?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
}

const Button = ({
  children,
  colorScheme,
  disabled,
  loading,
  onClick,
  type = "button",
  icon,
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
      className={`flex px-3 h-10 py-2 rounded text-white ${color} ${hover} transition-colors duration-200 ease-in-out justify-center items-center`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {icon && <span className="flex sm:mr-1 text-center">{icon}</span>}
      <div
        className={`${
          icon ? "hidden sm:block" : ""
        } flex items-center justify-center`}
      >
        <Typography.NORMAL dark>
          {loading ? "Loading..." : children}
        </Typography.NORMAL>
      </div>
    </button>
  );
};

export default Button;
