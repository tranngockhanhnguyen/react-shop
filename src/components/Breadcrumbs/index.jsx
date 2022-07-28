import { formatString } from '@/utils'
import { Box, Breadcrumbs as MUIBreadcrumbs, Link, makeStyles, Typography } from '@material-ui/core'
import { useHistory, withRouter } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0, 0, 8),
  },
}))

function Breadcrumbs() {
  const classes = useStyles()

  const history = useHistory()
  const {
    location: { pathname },
  } = history

  const pathnames = pathname.split('/').filter((x) => x)

  return (
    <Box className={classes.root}>
      <MUIBreadcrumbs aria-label="breadcrumb">
        {pathnames.length > 0 && <Link onClick={() => history.push('/')}>Home</Link>}

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
          const isLast = index === pathnames.length - 1

          return isLast ? (
            <Typography key={name}>{formatString(name)}</Typography>
          ) : (
            <Link key={name} onClick={() => history.push(routeTo)}>
              {formatString(name)}
            </Link>
          )
        })}
      </MUIBreadcrumbs>
    </Box>
  )
}

export default withRouter(Breadcrumbs)
