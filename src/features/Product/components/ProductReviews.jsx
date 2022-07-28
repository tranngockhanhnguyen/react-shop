import { Avatar, Box, Button, Checkbox, makeStyles, Paper, Typography } from '@material-ui/core'
import { CheckCircle, ThumbUpAlt, ThumbUpAltOutlined } from '@material-ui/icons'
import { Rating } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 3, 3, 5),
  },
  reviewBox: {
    display: 'flex',
    alignContent: 'center',
    gap: theme.spacing(10),
    marginBottom: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  user: {
    display: 'flex',
    alignItems: 'baseline',
    '& > h6': {
      marginLeft: theme.spacing(2),
    },
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(0.5),

    '& > h6': {
      fontWeight: 'bold',
      marginLeft: theme.spacing(2),
    },
  },
  check: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    color: 'rgb(0, 171, 86)',

    '& > span': {
      marginLeft: theme.spacing(0.5),
    },
  },
  time: {
    color: theme.palette.grey[600],
    margin: theme.spacing(1, 0, 3, 0),
  },
  buttons: {
    display: 'flex',
    gap: theme.spacing(2),
  },
}))

function ProductReviews() {
  const classes = useStyles()
  return (
    <Paper elevation={0}>
      <Box className={classes.root}>
        <Box className={classes.reviewBox}>
          <Box className={classes.user}>
            <Avatar
              alt="Rosé"
              src="https://i.pinimg.com/originals/93/79/f5/9379f5706a7b8f61497e99d155d480f0.jpg"
            />
            <Typography variant="h6">Rosé</Typography>
          </Box>

          <Box>
            <Box className={classes.rating}>
              <Rating readOnly value={4} />
              <Typography variant="subtitle1">Hài lòng</Typography>
            </Box>

            <Box className={classes.check}>
              <CheckCircle fontSize="small" />
              <Typography variant="caption">Đã mua hàng</Typography>
            </Box>

            <Typography variant="body2">
              Giao đúng sản phẩm yêu cầu. Hàng chất lượng ổn và tương đối sắc xảo.
            </Typography>

            <Typography variant="body2" className={classes.time}>
              Đánh giá vào 4 tháng trước
            </Typography>

            <Box className={classes.buttons}>
              <Checkbox
                color="primary"
                icon={<ThumbUpAltOutlined color="primary" />}
                checkedIcon={<ThumbUpAlt color="primary" />}
                name="checked"
              />
              <Button size="small" color="primary">
                Bình luận
              </Button>
              <Button size="small" color="primary">
                Chia sẻ
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className={classes.reviewBox}>
          <Box className={classes.user}>
            <Avatar
              alt="Lisa"
              src="https://i.pinimg.com/originals/61/18/a1/6118a131140c9cf35a8943c6b026c15c.jpg"
            />
            <Typography variant="h6">Lisa</Typography>
          </Box>

          <Box>
            <Box className={classes.rating}>
              <Rating readOnly value={4} />
              <Typography variant="subtitle1">Hài lòng</Typography>
            </Box>

            <Box className={classes.check}>
              <CheckCircle fontSize="small" />
              <Typography variant="caption">Đã mua hàng</Typography>
            </Box>

            <Typography variant="body2">
              Giao đúng sản phẩm yêu cầu. Hàng chất lượng ổn và tương đối sắc xảo.
            </Typography>

            <Typography variant="body2" className={classes.time}>
              Đánh giá vào 4 tháng trước
            </Typography>

            <Box className={classes.buttons}>
              <Checkbox
                color="primary"
                icon={<ThumbUpAltOutlined color="primary" />}
                checkedIcon={<ThumbUpAlt color="primary" />}
                name="checked"
              />
              <Button size="small" color="primary">
                Bình luận
              </Button>
              <Button size="small" color="primary">
                Chia sẻ
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className={classes.reviewBox}>
          <Box className={classes.user}>
            <Avatar
              alt="Jisoo"
              src="https://i.pinimg.com/originals/5d/53/38/5d5338d595f43fdd82dc3ef13761c64e.jpg"
            />
            <Typography variant="h6">Jisoo</Typography>
          </Box>

          <Box>
            <Box className={classes.rating}>
              <Rating readOnly value={4} />
              <Typography variant="subtitle1">Hài lòng</Typography>
            </Box>

            <Box className={classes.check}>
              <CheckCircle fontSize="small" />
              <Typography variant="caption">Đã mua hàng</Typography>
            </Box>

            <Typography variant="body2">
              Giao đúng sản phẩm yêu cầu. Hàng chất lượng ổn và tương đối sắc xảo.
            </Typography>

            <Typography variant="body2" className={classes.time}>
              Đánh giá vào 4 tháng trước
            </Typography>

            <Box className={classes.buttons}>
              <Checkbox
                color="primary"
                icon={<ThumbUpAltOutlined color="primary" />}
                checkedIcon={<ThumbUpAlt color="primary" />}
                name="checked"
              />
              <Button size="small" color="primary">
                Bình luận
              </Button>
              <Button size="small" color="primary">
                Chia sẻ
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className={classes.reviewBox}>
          <Box className={classes.user}>
            <Avatar
              alt="Jenie"
              src="https://i.pinimg.com/originals/fc/f1/ef/fcf1ef4b80daae91de1ebd3effe0adc9.jpg"
            />
            <Typography variant="h6">Jenie</Typography>
          </Box>

          <Box>
            <Box className={classes.rating}>
              <Rating readOnly value={4} />
              <Typography variant="subtitle1">Hài lòng</Typography>
            </Box>

            <Box className={classes.check}>
              <CheckCircle fontSize="small" />
              <Typography variant="caption">Đã mua hàng</Typography>
            </Box>

            <Typography variant="body2">
              Giao đúng sản phẩm yêu cầu. Hàng chất lượng ổn và tương đối sắc xảo.
            </Typography>

            <Typography variant="body2" className={classes.time}>
              Đánh giá vào 4 tháng trước
            </Typography>

            <Box className={classes.buttons}>
              <Checkbox
                color="primary"
                icon={<ThumbUpAltOutlined color="primary" />}
                checkedIcon={<ThumbUpAlt color="primary" />}
                name="checked"
              />
              <Button size="small" color="primary">
                Bình luận
              </Button>
              <Button size="small" color="primary">
                Chia sẻ
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

export default ProductReviews
