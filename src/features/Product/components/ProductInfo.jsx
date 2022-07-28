import { formatPrice } from '@/utils'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },

  description: {
    margin: theme.spacing(2, 0),
  },
  boxPrice: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
  },
  salePrice: {
    marginRight: theme.spacing(3),
    fontSize: theme.typography.h4.fontSize,
    fontWeight: 'bold',
    color: 'rgb(255, 66, 78)',
  },
  originalPrice: {
    marginRight: theme.spacing(2),
    fontSize: theme.typography.h6.fontSize,
    color: 'rgb(128, 128, 137)',
    textDecoration: 'line-through',
  },
  promotionPercent: {
    padding: theme.spacing(0, 0.5),
    color: 'rgb(255, 66, 78)',
    border: '1px solid rgb(255, 66, 78)',
    borderRadius: '2px',
  },
  rating: {
    marginBottom: theme.spacing(2),
  },
}))

ProductInfo.propTypes = {
  product: PropTypes.object,
}

function ProductInfo({ product = {} }) {
  const { name, shortDescription, originalPrice, salePrice, promotionPercent } = product
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Typography component="h1" variant="h4">
        {name}
      </Typography>

      <Typography variant="body2" className={classes.description}>
        {shortDescription}
      </Typography>

      <Box className={classes.rating}>
        <Rating name="read-only" value={5} readOnly size="small" />
      </Box>

      <Box className={classes.boxPrice}>
        <Box component="span" className={classes.salePrice}>
          {formatPrice(salePrice)}
        </Box>
        {promotionPercent > 0 && (
          <>
            <Box component="span" className={classes.originalPrice}>
              {formatPrice(originalPrice)}
            </Box>
            <Box
              component="span"
              className={classes.promotionPercent}
            >{`-${promotionPercent}%`}</Box>
          </>
        )}
      </Box>
    </Box>
  )
}

export default ProductInfo
