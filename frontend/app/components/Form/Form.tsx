const InputText = ({ field, form, ...props }) => {
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

const InputTextArea = ({ field, form, ...props }) => {
  return (
    <div>
      <label htmlFor={field.name}>{props.label}</label>
      <textarea {...field} {...props} />
      {form.errors[field.name] && form.touched[field.name] && (
        <div>{form.errors[field.name]}</div>
      )}
    </div>
  );
};

const Form = ({ children, ...props }) => {
  return <form {...props}>{children}</form>;
};
