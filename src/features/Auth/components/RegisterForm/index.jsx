import InputField from '@/components/form-controls/InputField'
import PasswordField from '@/components/form-controls/PasswordField'
import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
}

RegisterForm.defaultProps = {
  onSubmit: null,
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(4),
  },
  avatar: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    textAlign: 'center',
    margin: theme.spacing(2, 0, 3, 0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },
  progress: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
}))

function RegisterForm({ onSubmit }) {
  const classes = useStyles()

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter your full name')
      .test('should enter at least 2 words', 'Please enter at least 2 words', (values) => {
        return values.split(' ').length >= 2
      }),
    email: yup.string().required('Please enter your email').email('Please enter a valid email'),
    password: yup
      .string()
      .required('Please enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Please enter at least 8 Characters, 1 uppercase, 1 lowercase, 1 number and 1 special case character'
      ),
    retypePassword: yup
      .string()
      .required('Please retype your password')
      .oneOf(
        [yup.ref('password')],
        'Please enter the same password in both password and retype password fields'
      ),
  })

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  })

  async function handleSubmit(values) {
    if (!onSubmit) return

    await onSubmit(values)
  }

  const { isSubmitting } = form.formState

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography component="h3" variant="h5" className={classes.title}>
        Tạo tài khoản
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="Họ và tên" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Mật khẩu" form={form} />
        <PasswordField name="retypePassword" label="Nhập lại mật khẩu" form={form} />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          className={classes.submit}
          disabled={isSubmitting}
        >
          Đăng kí
        </Button>
      </form>
    </div>
  )
}

export default RegisterForm
