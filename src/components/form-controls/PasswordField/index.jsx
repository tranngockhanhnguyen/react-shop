import { FormHelperText } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
}

InputField.defaultProps = {
  label: '',
  disabled: false,
}

function InputField(props) {
  const { form, name, label, disabled } = props

  const [showPassword, setShowPassword] = useState(false)

  function handleTogglePassword() {
    setShowPassword((x) => !x)
  }
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
        <FormControl error={!!error} variant="outlined" margin="normal" fullWidth>
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <OutlinedInput
            label={label}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            value={value}
            disabled={disabled}
            id={name}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleTogglePassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  )
}

export default InputField
