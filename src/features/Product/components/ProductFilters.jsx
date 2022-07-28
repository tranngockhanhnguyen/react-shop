import { Box } from '@material-ui/core'
import PropTypes from 'prop-types'
import FilterByCategory from './Filters/FilterByCategory'
import FilterByPrice from './Filters/FilterByPrice'
import FilterByService from './Filters/FilterByService'

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
}

function ProductFilters({ filters, onChange }) {
  function handleCategoryChange(newCategoryId) {
    if (!onChange) return

    const newFilters = {
      'category.id': newCategoryId,
    }
    onChange(newFilters)
  }

  function handleChange(newValues) {
    if (onChange) onChange(newValues)
  }
  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange} />
      <FilterByPrice onChange={handleChange} />
      <FilterByService filters={filters} onChange={handleChange} />
    </Box>
  )
}

export default ProductFilters
