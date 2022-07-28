import { Box, Grid } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import PropTypes from 'prop-types'

SkeletonProductList.propTypes = {
  length: PropTypes.number,
}

SkeletonProductList.defaultProps = {
  length: 6,
}

function SkeletonProductList({ length }) {
  return (
    <Box>
      <Grid container>
        {Array.from({ length }).map((x, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Box padding={1}>
              <Skeleton variant="rect" width="100%" height={200} />
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default SkeletonProductList
