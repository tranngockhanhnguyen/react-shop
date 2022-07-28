import { unwrapResult } from '@reduxjs/toolkit'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { register } from '../../userSlice'
import RegisterForm from '../RegisterForm'
import PropTypes from 'prop-types'

Register.propTypes = {
  closeDialog: PropTypes.func,
}

Register.defaultProps = {
  closeDialog: null,
}

function Register({ closeDialog }) {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = async (values) => {
    try {
      // auto set username = email
      values.username = values.email

      const action = register(values)
      const resultAction = await dispatch(action)
      unwrapResult(resultAction)

      // close dialog
      if (closeDialog) {
        closeDialog()
      }

      enqueueSnackbar('Đăng kí tài khoản thành công!', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }
  return <RegisterForm onSubmit={handleSubmit}></RegisterForm>
}

export default Register
