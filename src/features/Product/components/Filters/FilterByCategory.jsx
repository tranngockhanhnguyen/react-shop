import categoryApi from '@/api/categoryApi'
import { Box, makeStyles, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import SkeletonFilters from '../SkeletonFilters'

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  menu: {
    padding: 0,
    margin: 0,
    listStyle: 'none',

    '& > li': {
      paddingTop: theme.spacing(1),

      '&:hover': {
        cursor: 'pointer',
        color: theme.palette.primary.dark,
      },
    },
  },
}))

function FilterByCategory({ onChange }) {
  const [categoryList, setCategory] = useState([])
  const [loading, setLoading] = useState(true)
  const classes = useStyles()

  useEffect(() => {
    ;(async () => {
      try {
        const list = await categoryApi.getAll()
        setCategory(list.map((x) => ({ id: x.id, name: x.name })))
      } catch (error) {
        console.log('Failed to fetch category list', error)
      }
      setLoading(false)
    })()
  }, [])

  function handleCategoryClick(category) {
    if (onChange) onChange(category.id)
  }

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>
      {loading ? (
        <SkeletonFilters />
      ) : (
        <ul className={classes.menu}>
          {categoryList.map((category) => (
            <li key={category.id} onClick={() => handleCategoryClick(category)}>
              <Typography variant="body2">{category.name}</Typography>
            </li>
          ))}
        </ul>
      )}
    </Box>
  )
}

export default FilterByCategory
