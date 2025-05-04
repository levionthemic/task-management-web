import { useState } from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import { styled, useColorScheme } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAPI, selectCurrentUser } from '~/redux/user/userSlice'
import { useConfirm } from 'material-ui-confirm'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'


function Profiles() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const { mode, setMode } = useColorScheme()
  const handleToggleMode = (event) => {
    if (event.target.checked) {
      setMode('dark')
    } else {
      setMode('light')
    }
  }

  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)

  const confirmLogout = useConfirm()
  const handleLogout = () => {
    confirmLogout({
      title: 'Log out of your account?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel'
    }).then(() => {
      dispatch(logoutUserAPI())
    }).catch(() => {})
  }

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 54,
    height: 27,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff'
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#aab4be',
          ...theme.applyStyles('dark', {
            backgroundColor: '#8796A5'
          })
        }
      }
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: '#001e3c',
      width: 25,
      height: 25,
      '&::before': {
        content: '\'\'',
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
      },
      ...theme.applyStyles('dark', {
        backgroundColor: '#003892'
      })
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: '#aab4be',
      borderRadius: 20 / 2,
      ...theme.applyStyles('dark', {
        backgroundColor: '#8796A5'
      })
    }
  }))

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? 'basic-menu-profiles' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 25, height: 25 }}
            src={currentUser?.avatar}
            alt={currentUser?.displayName}
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-profiles'
        }}
        sx={{ '.MuiPaper-root': { borderRadius: '10px', top: '58px !important' } }}
      >
        <MenuItem sx={{ pointerEvents: 'none', my: 1 }}>
          <ListItemText sx={{
            color: (theme) => theme.palette.text.main,
            textTransform: 'uppercase',
            '& .MuiTypography-root': { fontWeight: '500' }
          }}>
            Profile
          </ListItemText>
        </MenuItem>

        <MenuItem
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
            pointerEvents: 'none'
          }}
        >
          <Avatar
            sx={{ width: '28px', height: '28px' }}
            src={currentUser?.avatar}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ color: (theme) => theme.palette.text.main, fontWeight: '500', fontSize: '1.05rem' }}>{currentUser.displayName}</Typography>
            <Typography sx={{ color: (theme) => theme.palette.text.main }}>{currentUser.email}</Typography>
          </Box>
        </MenuItem>

        <MenuItem>
          <ListItemText>Add another account</ListItemText>
          <ListItemIcon>
            <PersonAddAltOutlinedIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>

        <MenuItem>
          <ListItemText>Manage Profile</ListItemText>
          <ListItemIcon>
            <ManageAccountsOutlinedIcon fontSize='small'/>
          </ListItemIcon>
        </MenuItem>

        <Divider />

        <MenuItem sx={{ pointerEvents: 'none' }}>
          <ListItemText sx={{
            color: (theme) => theme.palette.text.main,
            textTransform: 'uppercase',
            '& .MuiTypography-root': { fontWeight: '500' }
          }}>
            Trello
          </ListItemText>
        </MenuItem>

        <MenuItem>
          <ListItemText>Theme</ListItemText>
          <ListItemIcon>
            <MaterialUISwitch onChange={handleToggleMode} defaultChecked={mode === 'dark'} size='small' />
          </ListItemIcon>
        </MenuItem>

        <MenuItem>
          <ListItemText>Settings</ListItemText>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout} sx={{
          '&:hover': {
            color: 'warning.dark',
            '& .logout-icon': { color: 'warning.dark' }
          }
        }}>
          <ListItemText>Logout</ListItemText>
          <ListItemIcon>
            <Logout className='logout-icon' fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profiles
