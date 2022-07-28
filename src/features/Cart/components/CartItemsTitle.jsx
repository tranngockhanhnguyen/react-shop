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
import { Delete, ReportProblemOutlined } from '@material-ui/icons'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeAllCartItems } from '../cartSlice'
import { cartItemsCountSelector } from '../selectors'

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  name: {
    display: 'flex',
    alignItems: 'center',
  },
  delete: {
    float: 'right',
  },
}))

function CartItemsTitle() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const count = useSelector(cartItemsCountSelector)
  const dispatch = useDispatch()

  function handleRemoveAllItems() {
    const action = removeAllCartItems()
    dispatch(action)
    setOpen(false)
  }

  return (
    <Box>
      <Paper elevation={0}>
        <Grid container className={classes.title}>
          <Grid item className={classes.name} xs={4}>
            <Typography>Tất cả ({count} sản phẩm)</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>Đơn giá</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Số lương</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>Thành tiền</Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton className={classes.delete} onClick={() => setOpen(true)}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>

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
            <Typography variant="h6">Xoá tất cả sản phẩm</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có muốn xóa tất sản phẩm này?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ padding: '0 16px 16px 0' }}>
          <Button variant="outlined" color="primary" onClick={handleRemoveAllItems}>
            Xác nhận
          </Button>
          <Button variant="contained" color="primary" onClick={() => setOpen(false)}>
            Huỷ
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CartItemsTitle
