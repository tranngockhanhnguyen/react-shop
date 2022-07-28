import React from 'react'
import PropTypes from 'prop-types'
import { Search } from '@material-ui/icons'
import { alpha, InputBase, makeStyles, Paper } from '@material-ui/core'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '25ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
}))

const schema = yup.object({
  search: yup.string().trim().required(),
})

ProductSearch.propTypes = {
  onSubmit: PropTypes.func,
}

function ProductSearch({ onSubmit = null }) {
  const classes = useStyles()

  const form = useForm({
    defaultValues: {
      search: '',
    },
    resolver: yupResolver(schema),
  })

  function handleSubmit(values) {
    if (!onSubmit) return
    onSubmit(values)

    form.reset()
  }

  const { register } = form

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <Search />
      </div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputBase
          placeholder="Tìm kiếm..."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          {...register('search')}
        />
      </form>
    </div>
  )
}

export default ProductSearch
