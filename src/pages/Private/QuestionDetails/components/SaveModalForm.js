import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

export const SaveModalForm = ({ onSubmit }) => {
  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
  });
  const handleSubmit = (e) => {
    onSubmit(e);
  };
  return (
    <Formik
      initialValues={{ name: '', note: '' }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => {
        return (
          <Form className="save-modal__form">
            <label htmlFor="name" className="heading-secondary">
              Name:
            </label>
            {errors.name && touched.name ? (
              <p className="error">{errors.name}</p>
            ) : undefined}
            <Field
              id="name"
              className="save-modal__input"
              type="text"
              name="name"
            />
            <label htmlFor="note" className="heading-secondary">
              Note:
            </label>

            <Field
              id="note"
              className="save-modal__textarea"
              type="text"
              name="note"
              as="textarea"
            />
            <button type="submit" className="btn">
              Save
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
