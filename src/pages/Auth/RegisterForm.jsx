import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import LockIcon from '@mui/icons-material/Lock'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import { ReactComponent as LogoIcon } from '~/assets/logo.svg'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import {
  EMAIL_RULE,
  PASSWORD_RULE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE_MESSAGE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_CONFIRMATION_MESSAGE
} from '~/utils/validators'
import FormMessage from '~/components/Form/FormMessage'
import { useForm } from 'react-hook-form'
import { registerUserAPI } from '~/apis'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

function RegisterForm() {
  const formSchema = z.object({
    email: z.string()
      .min(1, { message: FIELD_REQUIRED_MESSAGE })
      .regex(EMAIL_RULE, { message: EMAIL_RULE_MESSAGE }),
    password: z.string()
      .min(1, { message: FIELD_REQUIRED_MESSAGE })
      .regex(PASSWORD_RULE, { message: PASSWORD_RULE_MESSAGE }),
    password_confirmation: z
      .string()
      .min(1, { message: FIELD_REQUIRED_MESSAGE })
  })
    .required()
    .superRefine(({ password_confirmation, password }, ctx) => {
      if (password_confirmation !== password) {
        ctx.addIssue({
          code: 'custom',
          message: PASSWORD_CONFIRMATION_MESSAGE,
          path: ['password_confirmation']
        })
      }})

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      password_confirmation: ''
    }
  })

  const navigate = useNavigate()

  const submitRegister = (data) => {
    const { email, password } = data
    toast.promise(
      registerUserAPI({ email, password }),
      { pending: 'Registration is in progress...' }
    ).then(user => {
      navigate(`/login?registeredEmail=${user.email}`)
    })
  }

  return (
    <form onSubmit={handleSubmit(submitRegister)}>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <MuiCard sx={{ minWidth: 380, maxWidth: 380, backdropFilter: 'blur(5px)', bgcolor: 'rgba(255, 255, 255, 0.9)' }}>
          <Box sx={{
            margin: '1em',
            display: 'flex',
            justifyContent: 'center',
            gap: 1
          }}>
            <Avatar sx={{ bgcolor: (theme) => theme.palette.mainColor1[400] }}><LockIcon /></Avatar>
            <Avatar sx={{ bgcolor: 'transparent' }}><LogoIcon /></Avatar>
          </Box>

          <Box sx={{ mt: 3, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: theme => theme.palette.mainColor1[400] }}>
            <Typography>Task Management</Typography>
            <Typography variant='h4'>LeviMana</Typography>
          </Box>

          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                autoComplete="nope"
                autoFocus
                fullWidth
                label="Email..."
                type="text"
                variant="outlined"
                error={!!errors['email']}
                {...register('email')}
              />
              <FormMessage errors={errors} fieldName={'email'}/>
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label="Password..."
                type="password"
                variant="outlined"
                error={!!errors['password']}
                {...register('password')}
              />
              <FormMessage errors={errors} fieldName={'password'}/>
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label="Confirm Password..."
                type="password"
                variant="outlined"
                error={!!errors['password_confirmation']}
                {...register('password_confirmation')}
              />
              <FormMessage errors={errors} fieldName={'password_confirmation'}/>
            </Box>
          </Box>
          <CardActions sx={{ padding: '0 1em 1em 1em', my: 2 }}>
            <Button
              className='interceptor-loading'
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                borderRadius: '999px',
                bgcolor: (theme) => theme.palette.mainColor1[600],
                '&:hover': { bgcolor: (theme) => theme.palette.mainColor1[800] }
              }}
            >
              Đăng ký
            </Button>
          </CardActions>
          <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
            <Typography>Already register?</Typography>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Typography variant='span' sx={{ color: (theme) => theme.palette.mainColor1[600], '&:hover': { color: '#ffbb39' } }}>Login!</Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default RegisterForm
