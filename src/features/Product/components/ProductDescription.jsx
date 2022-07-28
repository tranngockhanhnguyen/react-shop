import React from 'react'
import PropTypes from 'prop-types'
import { Box, Paper } from '@material-ui/core'
import DOMPurify from 'dompurify'

ProductDescription.propTypes = {
  product: PropTypes.object,
}

function ProductDescription({ product = {} }) {
  const safeDescription = DOMPurify.sanitize(product.description)
  return (
    <Paper elevation={0}>
      <Box dangerouslySetInnerHTML={{ __html: safeDescription }} p={2} />
    </Paper>
  )
}

export default ProductDescription
