import Typography from "~/components/Typography/Typography";

const Header: React.FC = () => {
  return (
    <header
      className="
      p-4
      bg-gray-700
      text-white
    "
    >
      <Typography.H1 dark>Zapp Admin</Typography.H1>
    </header>
  );
};

export default Header;
