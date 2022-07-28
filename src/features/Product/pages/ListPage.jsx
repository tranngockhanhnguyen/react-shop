import productApi from '@/api/productApi'
import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import queryString from 'query-string'
import { useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import FilterView from '../components/FilterView'
import ProductFilters from '../components/ProductFilters'
import ProductList from '../components/ProductList'
import ProductSort from '../components/ProductSort'
import SkeletonProductList from '../components/SkeletonProductList'

const useStyles = makeStyles(() => ({
  root: {},

  left: {
    width: '244px',
  },
  right: {
    flex: '1 1 0',
  },
  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',

    marginTop: '30px',
    paddingBottom: '20px',
  },
}))

function ListPage() {
  const classes = useStyles()

  const history = useHistory()
  const location = useLocation()
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search)

    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 12,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: ['true', 'false'].includes(params.isPromotion)
        ? params.isPromotion === 'true'
        : undefined,
      isFreeShip: ['true', 'false'].includes(params.isFreeShip)
        ? params.isFreeShip === 'true'
        : undefined,
    }
  }, [location.search])

  const [productList, setProductList] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    limit: 12,
    page: 1,
    total: 10,
  })
  // const [filters, setFilters] = useState(() => ({
  //   ...queryParams,
  //   _page: Number.parseInt(queryParams._page) || 1,
  //   _limit: Number.parseInt(queryParams._limit) || 12,
  //   _sort: queryParams._sort || 'salePrice:ASC',
  // }))

  // useEffect(() => {
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify(filters),
  //   })
  // }, [history, filters])

  useEffect(() => {
    ;(async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams)

        setProductList(data)
        setPagination(pagination)
      } catch (error) {
        console.log('Failed to fetch productList', error)
      }

      setLoading(false)
    })()
  }, [queryParams])

  function handlePaginationChange(e, page) {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _page: page,
    // }))

    const filters = {
      ...queryParams,
      _page: page,
    }

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    })
  }

  function handleSortChange(newSortValue) {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _sort: newSortValue,
    // }))

    const filters = {
      ...queryParams,
      _page: 1,
      _sort: newSortValue,
    }

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    })
  }

  function handleFiltersChange(newFilters) {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   ...newFilters,
    // }))

    const filters = {
      ...queryParams,
      _page: 1,
      name_contains: undefined,
      ...newFilters,
    }

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    })
  }

  function setNewFilters(newFilters) {
    // setFilters(newFilters)

    const filters = {
      _page: 1,
      ...newFilters,
    }

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    })
  }

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
            </Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />

              <FilterView filters={queryParams} onChange={setNewFilters} />

              {loading ? <SkeletonProductList length={12} /> : <ProductList data={productList} />}

              <Box className={classes.pagination}>
                <Pagination
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePaginationChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ListPage
