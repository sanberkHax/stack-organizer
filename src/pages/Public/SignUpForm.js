import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { signUp } from '../../slices/authSlice';
export const SignUpForm = () => {
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
        dispatch(signUp(values));
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
                type="password"
                placeholder="Enter your Password"
                className="form__input"
              />
              {errors.password && touched.password ? (
                <div className="form__error">{errors.password}</div>
              ) : undefined}
            </div>
            <button className="btn" type="submit">
              Sign Up
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
