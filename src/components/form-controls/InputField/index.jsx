import { TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
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
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field: { onChange, onBlur, value, name }, fieldState: { invalid, error } }) => (
        <TextField
          label={label}
          error={invalid}
          helperText={error?.message}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          value={value}
          disabled={disabled}
          variant="outlined"
          margin="normal"
          fullWidth
        />
      )}
    />
  )
}

export default InputField
