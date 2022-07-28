import { formatPrice, getThumbnailUrl } from '@/utils'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import { Add, Delete, Remove, ReportProblemOutlined } from '@material-ui/icons'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../cartSlice'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '255px',
  },
  name: {
    display: 'flex',
    alignItems: 'center',
  },
  delete: {
    float: 'right',
  },
  itemBox: {
    textAlign: 'center',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  thumbnail: {
    width: '80px',
    height: '80px',
    paddingRight: theme.spacing(1),
  },
  originalPrice: {
    textDecoration: 'line-through',
    color: theme.palette.grey[600],
  },
  quantity: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > span': {
      padding: theme.spacing(0.5, 1),
      border: `1px solid ${theme.palette.grey[300]}`,
      borderRadius: '5px',
    },
  },
}))

function CartItemList() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const refId = useRef('')
  const cartItems = useSelector((state) => state.cart.cartItems)
  const dispatch = useDispatch()

  function handleRemoveItem() {
    const action = removeFromCart(refId.current)
    dispatch(action)
    setOpen(false)
  }

  function handleDecreaseQuantity({ id, product, quantity }) {
    if (Number.parseInt(quantity) === 1) {
      refId.current = id
      setOpen(true)
      return
    }

    const action = decreaseQuantity({ id, product, quantity })
    dispatch(action)
  }

  function handleIncreaseQuantity({ id, product, quantity }) {
    const action = increaseQuantity({ id, product, quantity })
    dispatch(action)
  }

  return (
    <Box>
      <Paper elevation={0}>
        <Box className={classes.root}>
          {cartItems.map(({ id, product, quantity }) => (
            <Grid container key={id} className={classes.itemBox} spacing={2}>
              <Grid item xs={4}>
                <Box className={classes.name}>
                  <img
                    src={getThumbnailUrl(product)}
                    alt={product.name}
                    className={classes.thumbnail}
                  />
                  <Typography>{product.name}</Typography>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Typography>{formatPrice(product.salePrice)}</Typography>
                <Typography className={classes.originalPrice} variant="body2">
                  {formatPrice(product.originalPrice)}
                </Typography>
              </Grid>
              <Grid item xs={3} className={classes.quantity}>
                <IconButton onClick={() => handleDecreaseQuantity({ id, product, quantity })}>
                  <Remove />
                </IconButton>
                <Typography component="span">{`0${quantity}`.slice(-2)}</Typography>
                <IconButton onClick={() => handleIncreaseQuantity({ id, product, quantity })}>
                  <Add />
                </IconButton>
              </Grid>
              <Grid item xs={2}>
                <Typography>{formatPrice(quantity * product.salePrice)}</Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  className={classes.delete}
                  onClick={() => {
                    refId.current = id
                    setOpen(true)
                  }}
                >
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
          ))}

          <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <Box className={classes.name}>
                <ReportProblemOutlined
                  style={{ color: 'rgb(252, 130, 10)', marginRight: '8px' }}
                  fontSize="small"
                />
                <Typography variant="h6">Xoá sản phẩm</Typography>
              </Box>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Bạn có muốn xóa sản phẩm?
              </DialogContentText>
            </DialogContent>
            <DialogActions style={{ padding: '0 16px 16px 0' }}>
              <Button variant="outlined" color="primary" onClick={handleRemoveItem}>
                Xác nhận
              </Button>
              <Button variant="contained" color="primary" onClick={() => setOpen(false)}>
                Huỷ
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Paper>
    </Box>
  )
}

export default CartItemList
