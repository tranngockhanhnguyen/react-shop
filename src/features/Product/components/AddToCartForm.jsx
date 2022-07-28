import QuantityField from '@/components/form-controls/QuantityField'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
  className: PropTypes.string,
}

function AddToCartForm({ onSubmit = null, className = '' }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Please enter a quantity')
      .min(1, 'Please enter a number greater than 1')
      .typeError('Please enter a number')
      .max(99, 'Please enter a number less than 99'),
  })

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  })

  function handleSubmit(values) {
    if (onSubmit) onSubmit(values)
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <QuantityField name="quantity" label="Quantity" form={form} />

      <Button type="submit" variant="contained" color="primary" size="large" className={className}>
        Thêm vào giỏ hàng
      </Button>
    </form>
  )
}

export default AddToCartForm
