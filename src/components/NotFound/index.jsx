import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '85vh',
  },
}))

function NotFound() {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <img
        src="https://res.cloudinary.com/dlsebuwyl/image/upload/v1659013080/Test/notfound_nl8vgw.png"
        alt="notfound"
      />
    </Box>
  )
}

export default NotFound
