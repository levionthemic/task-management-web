import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as LeviManaIcon } from '~/assets/logo.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menus/Profiles'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { Link } from 'react-router-dom'
import Notifications from './Notifications/Notifications'
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard'

// eslint-disable-next-line react/prop-types
function AppBar({ handleOpenCreateBoardModal }) {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.levimana.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      bgcolor: 'white',
      opacity: 0.96,
      borderBottom: '1px solid #ddd',
      px: 2
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Link to='/boards'>
            <Tooltip title='Board List'>
              <AppsIcon sx={{ verticalAlign: 'middle', color: (theme) => theme.palette.mainColor1[600] }} />
            </Tooltip>
          </Link>

          <Link to='/'>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: (theme) => theme.palette.mainColor1[600] }}>
              <SvgIcon component={LeviManaIcon} fontSize='small' inheritViewBox />
              <Typography sx={{ fontWeight: 600, fontSize: '1.2rem' }} variant='span'>LeviMana</Typography>
            </Box>
          </Link>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button
            startIcon={<LibraryAddIcon />}
            sx={{ color: (theme) => theme.palette.mainColor1[600] }}
            onClick={handleOpenCreateBoardModal}
          >
            Create
          </Button>
        </Box>

      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AutoCompleteSearchBoard />

        <Notifications />

        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: 'pointer', color: (theme) => theme.palette.mainColor1[600] }}/>
        </Tooltip>

        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar