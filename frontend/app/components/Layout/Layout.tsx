import Footer from "~/containers/Footer/Footer";
import Header from "~/containers/Header/Header";
import Typography from "../Typography/Typography";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <div
        className="
        min-h-no-footer-header
        flex
        flex-col
        md:flex-row
      "
      >
        <aside className="p-4 bg-gray-200 col-span-1 md:col-span-1 min-w-52">
          <Typography.H3>Welcome</Typography.H3>
        </aside>
        <main className="p-4 w-full">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
