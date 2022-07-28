import Login from '@/features/Auth/components/Login'
import Register from '@/features/Auth/components/Register'
import { logout } from '@/features/Auth/userSlice'
import { cartItemsCountSelector } from '@/features/Cart/selectors'
import ProductSearch from '@/features/Product/components/ProductSearch'
import { Badge, Box, IconButton, Menu, MenuItem } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { AccountCircle, Close, ShoppingCart } from '@material-ui/icons'
import CodeIcon from '@material-ui/icons/Code'
import queryString from 'query-string'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Breadcrumbs from '../Breadcrumbs'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1,
    color: theme.palette.grey[500],
  },
}))

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
}

export default function Header() {
  const classes = useStyles()

  const history = useHistory()
  const location = useLocation()
  const params = queryString.parse(location.search)

  const LoggedInUser = useSelector((state) => state.user.current)
  const cartItemsCount = useSelector(cartItemsCountSelector)

  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState(MODE.LOGIN)
  const isLoggedIn = Boolean(LoggedInUser.id)
  const [anchorEl, setAnchorEl] = useState(null)

  const dispatch = useDispatch()

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  function handleBackdropClick(event, reason) {
    if (reason !== 'backdropClick') {
      handleClose()
    }
  }

  function handleClickUser(e) {
    setAnchorEl(e.currentTarget)
  }

  function handleCloseMenu() {
    setAnchorEl(null)
  }

  function handleLogoutClick() {
    const action = logout()
    dispatch(action)

    handleCloseMenu()
  }

  function handleCartClick() {
    history.push('/cart')
  }

  function handleSearch({ search }) {
    const filters = {
      ...params,
      _page: 1,
      'category.id': undefined,
      name_contains: search,
    }
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    })
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <CodeIcon className={classes.menuButton} />

          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              N Shop
            </Link>
          </Typography>

          <ProductSearch onSubmit={handleSearch} />

          {!isLoggedIn && (
            <Button color="inherit" onClick={handleClickOpen}>
              Đăng nhập
            </Button>
          )}

          <IconButton aria-label="cart" color="inherit" onClick={handleCartClick}>
            <Badge overlap="rectangular" badgeContent={cartItemsCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {isLoggedIn && (
            <IconButton color="inherit" onClick={handleClickUser}>
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseMenu}>Tài khoản</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Đăng xuất</MenuItem>
      </Menu>

      <Dialog open={open} onClose={handleBackdropClick} disableEscapeKeyDown>
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <Close />
        </IconButton>

        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />
              <Box>
                <Button
                  style={{ textTransform: 'none' }}
                  color="primary"
                  fullWidth
                  onClick={() => {
                    setMode(MODE.LOGIN)
                  }}
                >
                  Bạn đã có tài khoản? Đăng nhập ngay.
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />
              <Box>
                <Button
                  style={{ textTransform: 'none' }}
                  color="primary"
                  fullWidth
                  onClick={() => {
                    setMode(MODE.REGISTER)
                  }}
                >
                  Bạn chưa có tài khoản? Đăng kí ngay.
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Breadcrumbs />
    </div>
  )
}
