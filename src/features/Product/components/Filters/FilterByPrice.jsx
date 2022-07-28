import { formatNumber, removeDot } from '@/utils'
import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  range: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

    '& > span': {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
  },
}))

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
}

function FilterByPrice({ onChange }) {
  const classes = useStyles()
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  })

  function handleChange(e) {
    const { name, value } = e.target
    setValues((prevValues) => ({
      ...prevValues,
      [name]: removeDot(value),
    }))
  }

  function handleSubmit() {
    if (!onChange) return

    onChange(values)
    setValues({ salePrice_gte: 0, salePrice_lte: 0 })
  }
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">KHOẢNG GIÁ</Typography>

      <Box className={classes.range}>
        <TextField
          name="salePrice_gte"
          value={formatNumber(values.salePrice_gte || 0)}
          onChange={handleChange}
          type="tel"
        />
        <span>-</span>
        <TextField
          name="salePrice_lte"
          value={formatNumber(values.salePrice_lte || 0)}
          onChange={handleChange}
          type="tel"
        />
      </Box>

      <Button variant="outlined" color="primary" size="small" onClick={handleSubmit}>
        Áp dụng
      </Button>
    </Box>
  )
}

export default FilterByPrice
