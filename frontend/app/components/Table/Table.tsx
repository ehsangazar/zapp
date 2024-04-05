interface TProps {
  children: React.ReactNode;
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
const TR = ({ children }: TProps) => (
  <tr className=" nth-child(odd:bg-blue-100) nth-child(even:bg-gray-500) hover:bg-gray-300 ">
    {children}
  </tr>
);
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
