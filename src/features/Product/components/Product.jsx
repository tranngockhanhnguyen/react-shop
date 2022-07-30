import { formatPrice, getThumbnailUrl } from '@/utils'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),

    '&:hover': {
      cursor: 'pointer',
      boxShadow: 'rgb(0 0 0 / 10%) 0px 0px 20px;',
      zIndex: 1,
      opacity: 0.95,
    },
  },
  thumbnail: {
    padding: theme.spacing(1),
    minWidth: '200px',
    flexShrink: 0,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    flex: 1,
  },
  price: {
    flexShrink: 0,
    marginTop: 'auto',
  },
  salePrice: {
    marginRight: theme.spacing(1),
    fontWeight: 'bold',
    color: 'rgb(255, 66, 78)',
  },
  promotionPercent: {
    color: 'rgb(255, 66, 78)',
    border: '1px solid rgb(255, 66, 78)',
    borderRadius: '2px',
    fontSize: '12px',
  },
}))
Product.propTypes = {
  product: PropTypes.object,
}

function Product({ product }) {
  const classes = useStyles()

  const history = useHistory()

  function handleClick() {
    history.push(`/products/${product.id}`)
  }

  return (
    <Box className={classes.root} onClick={handleClick}>
      <Box className={classes.thumbnail}>
        <img src={getThumbnailUrl(product)} alt={product.name} width="100%" />
      </Box>

      <Box className={classes.content}>
        <Typography className={classes.name}>{product.name}</Typography>

        <Box className={classes.price}>
          <Rating name="read-only" value={5} readOnly size="small" />

          <Typography>
            <Box component="span" className={classes.salePrice}>
              {formatPrice(product.salePrice)}
            </Box>

            {product.promotionPercent > 0 && (
              <Box component="span" className={classes.promotionPercent}>
                {` -${product.promotionPercent}%`}
              </Box>
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Product
