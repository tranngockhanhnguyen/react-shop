import { unwrapResult } from '@reduxjs/toolkit'
import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { login } from '../../userSlice'
import LoginForm from '../LoginForm'

Login.propTypes = {
  closeDialog: PropTypes.func,
}

Login.defaultProps = {
  closeDialog: null,
}

function Login({ closeDialog }) {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = async (values) => {
    try {
      const action = login(values)
      const resultAction = await dispatch(action)
      unwrapResult(resultAction)

      // close dialog
      if (closeDialog) {
        closeDialog()
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }
  return <LoginForm onSubmit={handleSubmit}></LoginForm>
}

export default Login
