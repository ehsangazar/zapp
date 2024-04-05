interface InputTextProps {
  label: string;
  type: string;
  placeholder: string;
}

const InputText = ({ field, form, ...props }: InputTextProps) => {
  return (
    <div>
      <label htmlFor={field.name}>{props.label}</label>
      <input {...field} {...props} />
      {form.errors[field.name] && form.touched[field.name] && (
        <div>{form.errors[field.name]}</div>
      )}
    </div>
  );
};

export default InputText;
