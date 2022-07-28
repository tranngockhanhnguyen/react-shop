import { Box } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import PropTypes from 'prop-types'

SkeletonFilters.propTypes = {
  length: PropTypes.number,
}

SkeletonFilters.defaultProps = {
  length: 6,
}

function SkeletonFilters({ length }) {
  return (
    <Box>
      {Array.from({ length }).map((x, index) => (
        <Box key={index} mb={1}>
          <Skeleton animation="wave" width="50%" />
        </Box>
      ))}
    </Box>
  )
}

export default SkeletonFilters
