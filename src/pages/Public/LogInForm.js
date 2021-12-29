import { Formik, Form, Field } from 'formik';
import { logIn } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
export const LogInForm = () => {
  const dispatch = useDispatch();
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
      onSubmit={(values) => {
        dispatch(logIn(values));
      }}
    >
      {({ errors, touched }) => {
        return (
          <Form className="form">
            <div className="form__group">
              <label htmlFor="email" className="form__label">
                E-Mail
              </label>
              <Field
                name="email"
                type="email"
                placeholder="Enter your E-mail"
                className="form__input"
              />
              {errors.email && touched.email ? (
                <div className="form__error">{errors.email}</div>
              ) : undefined}
            </div>
            <div className="form__group">
              <label htmlFor="password" className="form__label">
                Password
              </label>
              <Field
                name="password"
                placeholder="Enter your Password"
                className="form__input"
              />
              {errors.password && touched.password ? (
                <div className="form__error">{errors.password}</div>
              ) : undefined}
            </div>
            <button className="btn" type="submit">
              Log In
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
