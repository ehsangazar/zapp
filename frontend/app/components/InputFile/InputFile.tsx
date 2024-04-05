import { Field } from "formik";
import { useRef } from "react";

interface InputFileProps {
  label: string;
  name: string;
}

interface FieldProps {
  field: {
    name: string;
    value: File;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
  };
  form: {
    errors: {
      [key: string]: string;
    };
    touched: {
      [key: string]: boolean;
    };
    setFieldValue: (name: string, value: File) => void;
  };
}

const InputFile = ({ label, name }: InputFileProps) => {
  const ref = useRef<HTMLLabelElement>(null);
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <div>
          <label
            ref={ref}
            className="w-full
            bg-gray-200
            flex
            flex-col
            items-center
            justify-center
            rounded-lg
            border-2
            border-dashed
            border-gray-400
            h-32
            cursor-pointer
            hover:bg-gray-300
            hover:border-gray-500
            transition-all
            duration-300
            ease-in-out
            text-gray-500
            text-sm
            font-semibold
            mt-2
            mb-4
        "
            htmlFor={name}
          >
            {label}
          </label>
          <input
            type="file"
            className="hidden"
            id={field.name}
            name={field.name}
            onChange={(event) => {
              if (!event.currentTarget.files) return;
              form.setFieldValue(field.name, event.currentTarget.files[0]);
              ref.current!.innerText = event.currentTarget.files[0].name;
            }}
          />
          {form.errors[field.name] && form.touched[field.name] && (
            <div>{form.errors[field.name]}</div>
          )}
        </div>
      )}
    </Field>
  );
};

export default InputFile;
