import { hideMiniCart } from '@/features/Cart/cartSlice'
import { Box, Button, IconButton, makeStyles, Typography } from '@material-ui/core'
import { CheckCircle, Close } from '@material-ui/icons'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '55px',
    right: '25px',
    padding: theme.spacing(2),

    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: '6px',
    boxShadow: theme.shadows[5],
    zIndex: 10,

    '&:before': {
      position: 'absolute',
      content: `''`,
      bottom: '100%',
      right: '15px',
      borderWidth: '8px',
      borderStyle: 'solid',
      borderColor: 'transparent transparent rgb(255, 255, 255)',
    },
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(1, 0, 2, 0),
  },
  close: {
    position: 'absolute',

    top: 0,
    right: 0,
  },
}))

MiniCart.propTypes = {
  className: PropTypes.string,
}

function MiniCart({ className = '' }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const miniCart = document.querySelector(`.${classes.root}`)
    const addButton = document.querySelector(`.${className}`)
    if (!miniCart || !addButton) return

    const close = (e) => {
      if (miniCart.contains(e.target) || addButton.contains(e.target)) return
      handleClose()
    }

    document.body.addEventListener('click', close)

    return () => {
      document.body.removeEventListener('click', close)
    }
  }, [])

  function handleClose() {
    const action = hideMiniCart()
    dispatch(action)
  }

  function handleClickCheckout() {
    history.push('/cart')
    handleClose()
  }

  return (
    <Box className={classes.root}>
      <IconButton className={classes.close} onClick={handleClose}>
        <Close fontSize="small" />
      </IconButton>
      <Box className={classes.title}>
        <CheckCircle style={{ color: 'green' }} fontSize="small" />
        <Typography variant="body2">Thêm vào giỏ hàng thành công!</Typography>
      </Box>
      <Button variant="contained" color="secondary" onClick={handleClickCheckout}>
        Xem giỏ hàng và thanh toán
      </Button>
    </Box>
  )
}

export default MiniCart
