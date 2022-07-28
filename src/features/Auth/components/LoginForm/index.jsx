import InputField from '@/components/form-controls/InputField'
import PasswordField from '@/components/form-controls/PasswordField'
import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
}

LoginForm.defaultProps = {
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

function LoginForm({ onSubmit }) {
  const classes = useStyles()

  const schema = yup.object().shape({
    identifier: yup
      .string()
      .required('Please enter your email')
      .email('Please enter a valid email'),
    password: yup.string().required('Please enter your password'),
  })

  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
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
        Đăng nhập
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="identifier" label="Email" form={form} />
        <PasswordField name="password" label="Mật khẩu" form={form} />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          className={classes.submit}
          disabled={isSubmitting}
        >
          Đăng nhập
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
