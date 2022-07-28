import React from 'react'
import PropTypes from 'prop-types'
import { Box, Checkbox, FormControlLabel, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
}))

FilterByService.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object,
}

function FilterByService({ onChange, filters = {} }) {
  const classes = useStyles()

  function handleChange(e) {
    if (!onChange) return

    const { name, checked } = e.target
    onChange({
      [name]: checked,
    })
  }
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DỊCH VỤ</Typography>
      <ul className={classes.list}>
        {[
          { value: 'isPromotion', label: 'Khuyến mãi' },
          { value: 'isFreeShip', label: 'Miễn phí vận chuyển' },
        ].map((service) => (
          <li key={service.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[service.value])}
                  onChange={handleChange}
                  name={service.value}
                  color="primary"
                />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  )
}

export default FilterByService
