import { useState, useEffect } from 'react'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import TextInput from '../components/custom/TextInput'
import { useDispatch, useSelector } from 'react-redux'
import {
  userReset,
  login,
  forgotPassword,
  userPasswordRequestReset,
  resetPassword,
} from '../store/slices/user'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

const ResetPassword = () => {
  const initialValues = {
    password: '',
    confirmPassword: '',
  }
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const dispatch = useDispatch()
  const { resetPasswordToken } = useParams()
  const { passwordResetRequestSuccess, loading, error, userData } = useSelector(
    (state) => state.user
  )

  useEffect(() => {
    if (passwordResetRequestSuccess) {
      toast.success(passwordResetRequestSuccess)
      dispatch(userPasswordRequestReset())
    }
  }, [passwordResetRequestSuccess])

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(userReset())
    }
  }, [error])

  const resetPasswordSchema = yup.object().shape({
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .max(150)
      .required('Password is required')
      .defined(),
    confirmPassword: yup
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .max(150)
      .required('Password is required')
      .defined(),
  })

  const handleSubmit = (values) => {
    const { password, confirmPassword } = values
    if (password !== confirmPassword) {
      return toast.error(`Passwords don't match!`)
    }
    dispatch(resetPassword(resetPasswordToken, { ...userData, password }))
  }

  return (
    <div className="flex flex-col justify-center items-center w-full mt-24">
      <div className="mb-2">
        <h1 className="text-center text-4xl font-semibold text-indigo-500 mb-2">
          Reset Password
        </h1>
      </div>
      <Formik
        validationSchema={resetPasswordSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          setFieldValue,
          isValid,
        }) => {
          return (
            <Form noValidate onSubmit={handleSubmit}>
              <div className="bg-white p-5 rounded-xl w-screen shadow-lg max-w-mds border-2 border-indigo-100">
                <div className="space-y-4">
                  <TextInput
                    labelName="Password"
                    value={values.password}
                    onChange={handleChange}
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    error={errors.password}
                    placeholder="Your password"
                    isPasswordInput
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />

                  <TextInput
                    labelName="Confirm Password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    error={errors.confirmPassword}
                    placeholder="Confirm your password"
                    isPasswordInput
                    showPassword={showConfirmPassword}
                    setShowPassword={setShowConfirmPassword}
                  />
                </div>

                <button
                  className={`mt-4 w-full bg-indigo-500 text-indigo-100 py-2 rounded-md text-lg tracking-wide ${
                    (loading || !isValid) && 'opacity-70 cursor-not-allowed'
                  }`}
                  disabled={loading || !isValid}
                >
                  {!loading ? 'Reset password' : 'Please wait..'}
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default ResetPassword
