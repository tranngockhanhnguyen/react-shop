import { addToCart, showMiniCart } from '@/features/Cart/cartSlice'
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Paper,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import AddToCartForm from '../components/AddToCartForm'
import MiniCart from '../components/MiniCart'
import ProductDescription from '../components/ProductDescription'
import ProductInfo from '../components/ProductInfo'
import ProductMenu from '../components/ProductMenu'
import ProductReviews from '../components/ProductReviews'
import ProductThumbnail from '../components/ProductThumbnail'
import useProductDetail from '../hooks/useProductDetail'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(4),
  },
  left: {
    width: '460px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: 1,
    padding: theme.spacing(1.5),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  button: {},
}))

function DetailPage() {
  const classes = useStyles()

  const dispatch = useDispatch()
  const show = useSelector((state) => state.cart.showMiniCart)

  const match = useRouteMatch()
  const {
    params: { productId },
    url,
  } = match
  const [loading, product] = useProductDetail(productId)

  if (loading) {
    return (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="primary" size={100} />
      </Backdrop>
    )
  }

  function handleAddToCartSubmit({ quantity }) {
    const action = addToCart({
      id: productId,
      product,
      quantity,
    })
    dispatch(action)

    if (!show) dispatch(showMiniCart())
  }

  return (
    <Box className={classes.root}>
      {show && <MiniCart className={classes.button} />}

      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />

              <AddToCartForm onSubmit={handleAddToCartSubmit} className={classes.button} />
            </Grid>
          </Grid>
        </Paper>

        <ProductMenu />

        <Switch>
          <Route path={url} exact>
            <ProductDescription product={product} />
          </Route>

          <Route path={`${url}/reviews`} exact component={ProductReviews} />
        </Switch>
      </Container>
    </Box>
  )
}

export default DetailPage
