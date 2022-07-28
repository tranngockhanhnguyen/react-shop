import { Tab, Tabs } from '@material-ui/core'
import PropTypes from 'prop-types'

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}

function ProductSort({ currentSort, onChange }) {
  function handleSortChange(e, newSortValue) {
    if (onChange) onChange(newSortValue)
  }
  return (
    <Tabs
      value={currentSort}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleSortChange}
      aria-label="disabled tabs example"
    >
      <Tab label="giá từ thấp tới cao" value="salePrice:ASC" />
      <Tab label="giá từ cao xuống thấp" value="salePrice:DESC" />
    </Tabs>
  )
}

export default ProductSort
