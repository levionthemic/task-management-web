/* eslint-disable react/prop-types */
import { AlertTitle } from '@mui/material'
import Alert from '@mui/material/Alert'

function FormMessage({ errors, fieldName }) {
  if (!errors || !errors[fieldName]) return null
  return (
    <Alert
      severity="error"
      sx={{
        mt: '0.7em',
        '.MuiAlert-message': { overflow: 'hidden' }
      }}
    >
      <AlertTitle>Error!</AlertTitle>
      {errors[fieldName]?.message}
    </Alert>
  )
}

export default FormMessage
