import { Field, FieldProps } from "formik";
import { useRef } from "react";

interface InputFileProps {
  label: string;
  name: string;
  accept: string;
}

const InputFile = ({ label, name, accept }: InputFileProps) => {
  const ref = useRef<HTMLLabelElement>(null);
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <div className="mt-2 mb-4">
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
            accept={accept}
            onChange={(event) => {
              if (!event.currentTarget.files) return;
              form.setFieldValue(field.name, event.currentTarget.files[0]);
              ref.current!.innerText = event.currentTarget.files[0].name;
            }}
          />
          {form.errors[field.name] && form.touched[field.name] && (
            <div className="text-red-500 text-sm">
              {form.errors[field.name] as React.ReactNode}
            </div>
          )}
        </div>
      )}
    </Field>
  );
};

export default InputFile;
