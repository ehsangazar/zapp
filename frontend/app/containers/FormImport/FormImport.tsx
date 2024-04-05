import { Form, Formik } from "formik";
import Button from "~/components/Button/Button";
import InputFile from "~/components/InputFile/InputFile";
import * as yup from "yup";

interface FormImportProps {
  onSubmit: (values: { file: File | null }) => void;
}

const FormImportSchema = yup.object().shape({
  file: yup.mixed().required("File is required"),
});

const FormImport = ({ onSubmit }: FormImportProps) => {
  return (
    <div>
      <Formik
        initialValues={{
          file: null,
        }}
        validationSchema={FormImportSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <InputFile label="Select" name="file" accept=".csv" />
          <Button type="submit" colorScheme="primary">
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormImport;
