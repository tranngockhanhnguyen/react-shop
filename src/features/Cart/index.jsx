import { Box, Button, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import CartInfo from './components/CartInfo'
import CartItemList from './components/CartItemList'
import CartItemsTitle from './components/CartItemsTitle'
import { cartItemsCountSelector } from './selectors'

const useStyles = makeStyles((theme) => ({
  root: { height: '85vh' },
  cart: {
    margin: theme.spacing(2, 0),
  },
  cartEmpty: {
    textAlign: 'center',
    padding: theme.spacing(4, 0),

    '& > img': {
      marginBottom: theme.spacing(6),
    },

    '& > Button': {
      marginTop: theme.spacing(2),
    },
  },
}))
CartFeature.propTypes = {}

function CartFeature(props) {
  const classes = useStyles()
  const quantity = useSelector(cartItemsCountSelector)
  const history = useHistory()

  function handleClick() {
    history.push('/products')
  }
  return (
    <Box className={classes.root}>
      <Container>
        <Typography variant="h6" className={classes.cart}>
          GIỎ HÀNG
        </Typography>

        {quantity > 0 ? (
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <CartItemsTitle />
              <CartItemList />
            </Grid>
            <Grid item xs={3}>
              <CartInfo />
            </Grid>
          </Grid>
        ) : (
          <Paper elevation={0}>
            <Box className={classes.cartEmpty}>
              <img src="cart-empty.png" alt="cart-empty" />
              <Typography variant="subtitle1">
                Không có sản phẩm nào trong giỏ hàng của bạn.
              </Typography>
              <Button variant="contained" color="primary" onClick={handleClick}>
                Tiếp tục mua sắm
              </Button>
            </Box>
          </Paper>
        )}
      </Container>
    </Box>
  )
}

export default CartFeature
