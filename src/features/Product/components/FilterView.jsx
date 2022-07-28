import { formatNumber } from '@/utils'
import { Box, Chip, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',

    listStyle: 'none',
    padding: 0,
    margin: theme.spacing(1, 0),

    '& > li': {
      padding: theme.spacing(1),
      margin: 0,
    },
  },
}))

const CATEGORY_LIST = {
  1: 'Thời trang',
  2: 'Khẩu trang',
  3: 'Làm đẹp',
  4: 'Laptop',
  5: 'Ổ cứng',
  6: 'Điện thoại',
}

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => 'Giao hàng miễn phí',
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: null,
    onToggle: (filters) => {
      const newFilters = { ...filters }
      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip
      } else {
        newFilters.isFreeShip = true
      }

      return newFilters
    },
  },
  {
    id: 2,
    getLabel: () => 'Khuyến mãi',
    isActive: () => true,
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters }
      delete newFilters.isPromotion

      return newFilters
    },
    onToggle: null,
  },
  {
    id: 3,
    getLabel: (filters) =>
      `Từ ${formatNumber(filters.salePrice_gte)} đến ${formatNumber(filters.salePrice_lte)}`,
    isActive: () => true,
    isVisible: (filters) =>
      Object.keys(filters).includes('salePrice_lte') &&
      Object.keys(filters).includes('salePrice_gte') &&
      Number.parseInt(filters.salePrice_lte) > Number.parseInt(filters.salePrice_gte) &&
      Number.parseInt(filters.salePrice_gte) >= 0 &&
      Number.parseInt(filters.salePrice_lte) > 0,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters }
      delete newFilters.salePrice_gte
      delete newFilters.salePrice_lte

      return newFilters
    },
    onToggle: null,
  },
  {
    id: 4,
    getLabel: (filters) => CATEGORY_LIST[filters['category.id']],
    isActive: () => true,
    isVisible: (filters) => filters['category.id'],
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters }
      delete newFilters['category.id']

      return newFilters
    },
    onToggle: null,
  },
]

FilterView.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
}

function FilterView({ filters = {}, onChange = null }) {
  const classes = useStyles()

  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters))
  }, [filters])

  return (
    <Box component="ul" className={classes.root}>
      {visibleFilters.map((x) => (
        <li key={x.id}>
          <Chip
            size="small"
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? 'primary' : 'default'}
            clickable={!x.isRemovable}
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return

                    const newFilters = x.onRemove(filters)
                    onChange(newFilters)
                  }
                : null
            }
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return

                    const newFilters = x.onToggle(filters)
                    onChange(newFilters)
                  }
            }
          />
        </li>
      ))}
    </Box>
  )
}

export default FilterView
