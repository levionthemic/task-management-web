import { FaBars } from 'react-icons/fa6'
import { FaFacebookF } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import logo from '~/assets/logo.png'
import bg from '~/assets/bg-landing-page.jpg'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

function LandingPage() {
  const navigate = useNavigate()

  const MenuItem = styled(Box)(({ theme }) => ({
    cursor: 'pointer',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      backgroundColor: theme.palette.mainColor2[800],
      height: '2px',
      width: 0,
      transition: 'all ease-in-out .3s'
    },
    '&:hover': {
      color: theme.palette.mainColor2[800],
      fontWeight: 'bold',
      '&::after': { width: '100%' }
    },
    '&.active': {
      color: theme.palette.mainColor2[800],
      fontWeight: 'bold',
      '&::after': { width: '100%' }
    }
  }))

  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      py: 4,
      px: 8,
      position: 'relative'
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 4
      }}>
        <img src={logo} alt='' width={50} height={50}/>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          color: (theme) => theme.palette.text.main,
          fontWeight: '500'
        }}>
          <MenuItem className='active'>Trang chủ</MenuItem>
          <MenuItem>Về chúng tôi</MenuItem>
          <MenuItem>Liên hệ</MenuItem>
          <FaBars style={{ cursor: 'pointer', fontSize: '1.2rem' }}/>
        </Box>
      </Box>

      <Box>
        <Box sx={{ width: '50%' }}>
          <Typography sx={{ fontSize: '4rem', fontWeight: 'bold', mb: 2 }}>Quản lí công việc</Typography>
          <Typography sx={{ fontSize: '1.2rem', mb: 8 }}>
            LeviMana giúp bạn tổ chức, theo dõi và hoàn thành công việc một cách dễ dàng. Tạo công việc, phân công nhiệm vụ, nhận thông báo nhắc nhở và làm việc nhóm – tất cả trong một ứng dụng duy nhất.
          </Typography>
          <Button
            variant='contained'
            sx={{
              borderRadius: '999px',
              bgcolor: (theme) => theme.palette.mainColor2[800],
              '&:hover': {
                bgcolor: (theme) => theme.palette.mainColor2[300]
              }
            }}
            onClick={() => { navigate('/login')}}
          >
            Bắt đầu ngay!
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <FaFacebookF style={{ fontSize: '1.5rem' }} />
        <FaInstagram style={{ fontSize: '1.5rem' }} />
        <FaTiktok style={{ fontSize: '1.5rem' }} />
      </Box>

      <Box sx={{ position: 'absolute', bottom: 0, right: 0, zIndex: -1 }}>
        <img src={bg} alt="" width={800} height={'auto'} />
      </Box>
    </Box>
  )
}

export default LandingPage