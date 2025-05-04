import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import LockIcon from '@mui/icons-material/Lock'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import { ReactComponent as TrelloIcon } from '~/assets/logo.svg'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import Alert from '@mui/material/Alert'
import { useForm } from 'react-hook-form'
import {
  EMAIL_RULE,
  PASSWORD_RULE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE_MESSAGE,
  EMAIL_RULE_MESSAGE
} from '~/utils/validators'
import FormMessage from '~/components/Form/FormMessage'
import { useDispatch } from 'react-redux'
import { loginUserAPI } from '~/redux/user/userSlice'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

function LoginForm() {
  const formSchema = z.object({
    email: z.string().min(1, { message: FIELD_REQUIRED_MESSAGE }).regex(EMAIL_RULE, { message: EMAIL_RULE_MESSAGE }),
    password: z.string().min(1, { message: FIELD_REQUIRED_MESSAGE }).regex(PASSWORD_RULE, { message: PASSWORD_RULE_MESSAGE })
  }).required()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const [searchParams] = useSearchParams()
  const registeredEmail = searchParams.get('registeredEmail')
  const verifiedEmail = searchParams.get('verifiedEmail')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitLogIn = (data) => {
    const { email, password } = data
    toast.promise(
      dispatch(loginUserAPI({ email, password })),
      { pending: 'Đang đăng nhập...' }
    ).then(res => {
      if (!res.error) navigate('/boards')
    })
  }

  return (
    <form onSubmit={handleSubmit(submitLogIn)}>
      <Zoom in={true} style={{ transitionDelay: '500ms' }}>
        <MuiCard sx={{ minWidth: 380, maxWidth: 380, backdropFilter: 'blur(5px)', bgcolor: 'rgba(255, 255, 255, 0.9)' }}>
          <Box sx={{
            margin: '1em',
            display: 'flex',
            justifyContent: 'center',
            gap: 1
          }}>
            <Avatar sx={{ bgcolor: (theme) => theme.palette.mainColor1[400] }}><LockIcon /></Avatar>
            <Avatar sx={{ bgcolor: 'transparent' }}><TrelloIcon /></Avatar>
          </Box>

          <Box sx={{ mt: 3, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: theme => theme.palette.mainColor1[400] }}>
            <Typography>Task Management</Typography>
            <Typography variant='h4'>LeviMana</Typography>
          </Box>

          <Box sx={{ marginTop: '1em', display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '0 1em' }}>
            {verifiedEmail &&
              <Alert severity="success" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
                Email &nbsp;
                <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{verifiedEmail}</Typography>
                &nbsp;has been verified!.<br />Now you can login to enjoy our service!
              </Alert>
            }
            {registeredEmail &&
              <Alert severity="info" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
              An email has been sent to &nbsp;
                <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{registeredEmail}</Typography>
                <br />Please check your email and verify before login!
              </Alert>
            }
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
                sx={{ borderRadius: '10px' }}
                {...register('email')}
              />
              <FormMessage errors={errors} fieldName={'email'} />
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
              <FormMessage errors={errors} fieldName={'password'} />
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
              Login
            </Button>
          </CardActions>
          <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
            <Typography>New member?</Typography>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Typography variant='span' sx={{ color: (theme) => theme.palette.mainColor1[600], '&:hover': { color: '#ffbb39' } }}>Register!</Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default LoginForm
