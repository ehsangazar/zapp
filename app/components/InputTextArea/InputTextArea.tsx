import { Field, FieldProps } from "formik";

interface InputProps {
  label: string;
  name: string;
}

const InputTextArea = ({ label, name }: InputProps) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <div
          className="
                grid
                grid-cols-[100px_1fr]
                align-center
                justify-center
            "
        >
          <label
            className="
                flex
                items-center
                justify-end
                text-sm 
                font-semibold 
                text-gray-600
                pr-4
                "
            htmlFor={field.name}
          >
            {label}
          </label>
          <div className="mt-2 mb-4">
            <textarea
              {...field}
              id={field.name}
              className="w-full
                bg-gray-200
                rounded-lg
                border-2
                border-gray-400
                min-h-[100px]
                px-3
                py-1
                text-gray-800
                focus:outline-none
                focus:border-primary
                focus:bg-white
                transition-all
                duration-300
                ease-in-out
                "
            />
            {form.errors[field.name] && form.touched[field.name] && (
              <div className="text-red-500 text-sm">
                {form.errors[field.name] as React.ReactNode}
              </div>
            )}
          </div>
        </div>
      )}
    </Field>
  );
};

export default InputTextArea;
