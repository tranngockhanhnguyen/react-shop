import { Box, FormHelperText, makeStyles, Typography } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { Add, AddCircleOutline, Remove, RemoveCircleOutline } from '@material-ui/icons'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

const useStyles = makeStyles((theme) => ({
  root: {},
  box: {
    display: 'flex',
    flexFlow: 'wrap nowrap',
    alignItems: 'center',
    width: '160px',
    margin: theme.spacing(2, 0, 1, 0),
  },
}))
QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
}

QuantityField.defaultProps = {
  label: '',
  disabled: false,
}

function QuantityField({ form, name, label, disabled }) {
  const { setValue } = form
  const classes = useStyles()

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
        <FormControl error={!!error} margin="normal" fullWidth size="small">
          <Typography>Số lượng:</Typography>

          <Box className={classes.box}>
            <IconButton
              onClick={() => setValue(name, Number.parseInt(value) - 1)}
              disabled={Number.parseInt(value) <= 1}
            >
              <Remove />
            </IconButton>

            <OutlinedInput
              id={name}
              name={name}
              value={
                (value = Number.parseInt(value) < 1 || Number.parseInt(value) > 99 ? 1 : value)
              }
              type="number"
              onChange={onChange}
              onBlur={onBlur}
            />

            <IconButton
              onClick={() => setValue(name, Number.parseInt(value) + 1)}
              disabled={Number.parseInt(value) >= 99}
            >
              <Add />
            </IconButton>
          </Box>

          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  )
}

export default QuantityField
