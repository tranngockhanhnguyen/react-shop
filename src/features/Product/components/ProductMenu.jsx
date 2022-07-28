import { Box, Link, makeStyles } from '@material-ui/core'
import { NavLink, useRouteMatch } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'center',

    listStyle: 'none',
    padding: 0,

    '& > li': {
      padding: theme.spacing(2, 4),
    },

    '& > li > a': {
      color: theme.palette.grey[700],
      fontWeight: 'bold',
      fontSize: theme.typography.h6.fontSize,
    },

    '& > li > a.active': {
      color: theme.palette.primary.dark,
      textDecoration: 'underline',
    },
  },
}))

function ProductMenu() {
  const classes = useStyles()
  const { url } = useRouteMatch()
  return (
    <Box component="ul" className={classes.root}>
      <li>
        <Link component={NavLink} to={url} exact>
          Mô tả sản phẩm
        </Link>
      </li>

      <li>
        <Link component={NavLink} to={`${url}/reviews`} exact>
          Đánh giá
        </Link>
      </li>
    </Box>
  )
}

export default ProductMenu
