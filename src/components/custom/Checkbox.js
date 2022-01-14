import { Field } from 'formik';

const Checkbox = ({ labelName, name }) => {
  return (
    <div className="form-check">
      <Field className="mr-1" type="checkbox" name={name} />
      <label
        className="form-check-label inline-block text-gray-800"
        htmlfor={name}
      >
        {labelName}
      </label>
    </div>
  );
};

export default Checkbox;
