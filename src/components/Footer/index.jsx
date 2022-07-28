import { Box, makeStyles, Typography } from '@material-ui/core'
import { Favorite } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),

    backgroundColor: theme.palette.primary.dark,
    color: '#fff',

    '& > h6': {
      marginRight: theme.spacing(1),
      fontWeight: 400,
    },
  },
}))

function Footer() {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Typography variant="h6">Created by Nguyen with</Typography>
      <Favorite color="secondary" />
    </Box>
  )
}

export default Footer
