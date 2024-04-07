interface TypographyProps {
  dark?: boolean;
  children: React.ReactNode;
}

const H1 = ({ children, dark }: TypographyProps) =>
  dark ? (
    <h1 className="text-4xl font-bold text-white">{children}</h1>
  ) : (
    <h1 className="text-4xl font-bold text-gray-800">{children}</h1>
  );

const H2 = ({ children, dark }: TypographyProps) =>
  dark ? (
    <h2 className="text-3xl font-bold text-white">{children}</h2>
  ) : (
    <h2 className="text-3xl font-bold text-gray-800">{children}</h2>
  );

const H3 = ({ children, dark }: TypographyProps) =>
  dark ? (
    <h3 className="text-2xl font-medium text-white">{children}</h3>
  ) : (
    <h3 className="text-2xl font-medium text-gray-800">{children}</h3>
  );

const H4 = ({ children, dark }: TypographyProps) =>
  dark ? (
    <h4 className="text-xl font-bold text-white">{children}</h4>
  ) : (
    <h4 className="text-xl font-bold text-gray-800">{children}</h4>
  );

const H5 = ({ children, dark }: TypographyProps) =>
  dark ? (
    <h5 className="text-lg font-bold text-white">{children}</h5>
  ) : (
    <h5 className="text-lg font-bold text-gray-800">{children}</h5>
  );

const H6 = ({ children, dark }: TypographyProps) =>
  dark ? (
    <h6 className="text-base font-bold text-white">{children}</h6>
  ) : (
    <h6 className="text-base font-bold text-gray-800">{children}</h6>
  );

const P = ({ children, dark }: TypographyProps) =>
  dark ? (
    <p className="text-base text-white">{children}</p>
  ) : (
    <p className="text-base text-gray-800">{children}</p>
  );

const NORMAL = ({ children, dark }: TypographyProps) =>
  dark ? (
    <span className="text-base text-white">{children}</span>
  ) : (
    <span className="text-base text-gray-800">{children}</span>
  );

const SMALL = ({ children, dark }: TypographyProps) =>
  dark ? (
    <small className="text-sm text-white">{children}</small>
  ) : (
    <small className="text-sm text-gray-800">{children}</small>
  );

const Typography = {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  NORMAL,
  SMALL,
};

export default Typography;
