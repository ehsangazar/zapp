interface AlertProps {
  message: string;
  type: "error" | "success";
}

const Alert = ({ message, type }: AlertProps) => {
  return (
    <div
      className={`${
        type === "error" ? "bg-red-200" : "bg-green-200"
      } p-2 my-2 rounded-lg`}
    >
      {message}
    </div>
  );
};

export default Alert;
