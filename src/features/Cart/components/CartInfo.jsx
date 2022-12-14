import { formatPrice } from '@/utils'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import { CheckCircleOutline, ConfirmationNumberOutlined, InfoOutlined } from '@material-ui/icons'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { removeAllCartItems } from '../cartSlice'
import {
  cartItemsTotalOriginalSelector,
  cartItemsTotalPromotionSelector,
  cartItemsTotalSelector,
} from '../selectors'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(6),
  },
  subTitle: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.grey[600],
  },
  promotion: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.main,

    '&:hover': {
      cursor: 'pointer',
      opacity: 0.85,
    },
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceTitle: {
    color: theme.palette.grey[600],
  },
  total: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[200]}`,
  },
  checkOutImg: {
    width: '100%',
  },
  checkOutTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

function CartInfo() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const history = useHistory()
  const totalPromotion = useSelector(cartItemsTotalPromotionSelector)
  const totalOriginal = useSelector(cartItemsTotalOriginalSelector)
  const total = useSelector(cartItemsTotalSelector)
  const dispatch = useDispatch()

  function handleClick() {
    const action = removeAllCartItems()
    dispatch(action)
    history.push('/products')
  }

  return (
    <Box>
      <Paper elevation={0}>
        <Box className={classes.root}>
          <Box className={classes.title}>
            <Typography variant="subtitle2">Khuy???n m??i </Typography>
            <Box className={classes.subTitle}>
              <Typography variant="body2" style={{ marginRight: '4px' }}>
                C?? th??? ch???n 0
              </Typography>
              <InfoOutlined fontSize="small" />
            </Box>
          </Box>

          <Box className={classes.promotion}>
            <ConfirmationNumberOutlined fontSize="small" />
            <Typography variant="subtitle2" style={{ marginLeft: '4px' }}>
              Ch???n khuy???n m??i
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={0}>
        <Box className={classes.root}>
          <Box className={classes.price} mb={1}>
            <Typography className={classes.priceTitle}>T???m t??nh:</Typography>
            <Typography>{formatPrice(totalOriginal)}</Typography>
          </Box>
          <Box className={classes.price}>
            <Typography className={classes.priceTitle}>Gi???m gi??:</Typography>
            <Typography>{formatPrice(totalPromotion)}</Typography>
          </Box>
          <Box className={classes.total}>
            <Typography className={classes.priceTitle}>T???ng ti???n</Typography>
            <Typography variant="h5" color="error">
              {formatPrice(total)}
            </Typography>
          </Box>
          <Typography variant="caption" align="right" display="block">
            (???? bao g???m VAT)
          </Typography>
        </Box>
      </Paper>

      <Button variant="contained" color="secondary" fullWidth onClick={() => setOpen(true)}>
        mua h??ng
      </Button>

      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <img
            src="checkout-successfully.gif"
            alt="checkout-successfuly"
            className={classes.checkOutImg}
          />
          <Box className={classes.checkOutTitle}>
            <CheckCircleOutline style={{ color: 'green' }} fontSize="large" />
            <Typography variant="h6">
              ????n h??ng c???a qu?? kh??ch ???? ??c thanh to??n th??nh c??ng!
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions style={{ padding: '16px' }}>
          <Button variant="contained" color="primary" size="large" fullWidth onClick={handleClick}>
            Ti???p t???c mua h??ng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CartInfo
