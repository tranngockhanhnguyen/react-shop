import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { InfoOutlined } from '@material-ui/icons'
import PropTypes from 'prop-types'
import Product from './Product'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(5, 0),

    color: 'rgb(253, 216, 53)',
    border: '1px solid rgb(253, 216, 53)',
  },
}))

ProductList.propTypes = {
  data: PropTypes.array,
}

ProductList.defaultProps = {
  data: [],
}

function ProductList({ data }) {
  const classes = useStyles()

  return (
    <Box>
      {data.length > 0 ? (
        <Grid container>
          {data.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box className={classes.root}>
          <InfoOutlined />
          <Typography variant="h6">
            Rất tiếc, không tìm thấy sản phẩm phù hợp với lựa chọn của bạn
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default ProductList
