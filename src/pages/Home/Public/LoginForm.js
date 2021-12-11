import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
export const LogInForm = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid E-Mail')
      .required('E-Mail is required'),
    password: yup.string().required(`Password is required`),
  });
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={schema}
    >
      {({ errors, touched }) => {
        return (
          <Form>
            <label htmlFor="email">E-Mail</label>
            <Field name="email" type="email" placeholder="Enter your E-mail" />
            {errors.email && touched.email ? (
              <div>{errors.email}</div>
            ) : undefined}
            <label htmlFor="password">Password</label>
            <Field name="password" placeholder="Enter your Password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : undefined}
            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
};
