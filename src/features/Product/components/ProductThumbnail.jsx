import { getThumbnailUrl } from '@/utils'
import { Box } from '@material-ui/core'
import PropTypes from 'prop-types'

ProductThumbnail.propTypes = {
  product: PropTypes.object,
}

function ProductThumbnail({ product = {} }) {
  return (
    <Box>
      <img src={getThumbnailUrl(product)} alt={product.name} width="100%" />
    </Box>
  )
}

export default ProductThumbnail
