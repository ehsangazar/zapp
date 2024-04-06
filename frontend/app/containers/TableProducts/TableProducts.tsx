import Button from "~/components/Button/Button";
import TABLE_PARENT from "~/components/Table/Table";
import Typography from "~/components/Typography/Typography";
import IProduct from "~/types/IProduct";

interface TableProps {
  headers: string[];
  products: IProduct[];
  openModal: (sku: string | null, name: string) => void;
}

const TableProducts = ({ headers, products, openModal }: TableProps) => (
  <TABLE_PARENT.TABLE>
    <TABLE_PARENT.THEAD>
      <TABLE_PARENT.TRHEAD>
        {headers.map((header, index) => (
          <TABLE_PARENT.TH key={`header-${index}`}>
            <Typography.SMALL dark>{header}</Typography.SMALL>
          </TABLE_PARENT.TH>
        ))}
        <TABLE_PARENT.TH>
          <Typography.SMALL dark>Actions</Typography.SMALL>
        </TABLE_PARENT.TH>
      </TABLE_PARENT.TRHEAD>
    </TABLE_PARENT.THEAD>
    <TABLE_PARENT.TBODY>
      {products.map((product) => (
        <TABLE_PARENT.TR key={`product-${product.sku}`} errors={product.errors}>
          <TABLE_PARENT.TD>{product.sku}</TABLE_PARENT.TD>
          <TABLE_PARENT.TD>{product.quantity}</TABLE_PARENT.TD>
          <TABLE_PARENT.TD>{product.description}</TABLE_PARENT.TD>
          <TABLE_PARENT.TD>{product.store}</TABLE_PARENT.TD>
          <TABLE_PARENT.TD>
            <div className="flex justify-between items-center">
              <div className="mr-4">
                <Button
                  onClick={() => openModal(product.sku, "edit")}
                  colorScheme="primary"
                >
                  Edit
                </Button>
              </div>
              <div>
                <Button
                  colorScheme="danger"
                  onClick={() => openModal(product.sku, "delete")}
                >
                  Delete
                </Button>
              </div>
            </div>
          </TABLE_PARENT.TD>
        </TABLE_PARENT.TR>
      ))}
    </TABLE_PARENT.TBODY>
  </TABLE_PARENT.TABLE>
);

export default TableProducts;
