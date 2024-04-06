import Typography from "../Typography/Typography";

interface TProps {
  children: React.ReactNode;
  errors?: string[];
}

const TH = ({ children }: TProps) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);
const TD = ({ children }: TProps) => (
  <td className=" px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">
    {children}
  </td>
);
const TR = ({ children, errors }: TProps) => {
  return !errors?.length ? (
    <tr className="nth-child(odd:bg-blue-100) nth-child(even:bg-gray-500) hover:bg-gray-300 ">
      {children}
    </tr>
  ) : (
    <>
      <tr className="tr-error">{children}</tr>
      <tr className="tr-error">
        <td colSpan={5} className="bg-red-700 pl-2">
          <Typography.SMALL dark>Invalid product: </Typography.SMALL>
          <ul className="list-disc list-inside text-white">
            {errors?.map((error, index) => (
              <li key={`error-${index}`}>
                <Typography.SMALL dark>{error}</Typography.SMALL>
              </li>
            ))}
          </ul>
        </td>
      </tr>
    </>
  );
};
const TRHEAD = ({ children }: TProps) => (
  <tr className="bg-blue-900">{children}</tr>
);

const THEAD = ({ children }: TProps) => (
  <thead className="bg-blue-900">{children}</thead>
);
const TBODY = ({ children }: TProps) => (
  <tbody className="divide-y divide-gray-200">{children}</tbody>
);
const TABLE = ({ children }: TProps) => (
  <div className="overflow-x-auto">
    <table className="table-auto w-full">{children}</table>
  </div>
);

const TABLE_PARENT = {
  TH,
  TD,
  TR,
  TRHEAD,
  THEAD,
  TBODY,
  TABLE,
};

export default TABLE_PARENT;
