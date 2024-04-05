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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 min-h-no-footer-header">
        <aside className="p-4 bg-gray-200 col-span-1 md:col-span-1">
          <Typography.H3>Welcome</Typography.H3>
        </aside>
        <main className="p-4">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
