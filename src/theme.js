import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

const theme = extendTheme({
  levimana: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT
  },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#464B9F' },
        background: { main: 'white' },
        text: { main: '#172B4D' },
        mainColor1: {
  				'100': '#9595C9',
  				'200': '#8786C0',
  				'400': '#6666AE',
  				'600': '#464B9F',
  				'800': '#2F2F89'
  			},
  			mainColor2: {
  				'100': '#CEACD1',
  				'300': '#C29BC8',
  				'800': '#854C9D'
  			}
      }
    },
    dark: {
      palette: {
        primary: { main: '#464B9F' },
        background: { main: 'white' },
        text: { main: '#172B4D' },
        mainColor1: {
  				'100': '#9595C9',
  				'200': '#8786C0',
  				'400': '#6666AE',
  				'600': '#464B9F',
  				'800': '#2F2F89'
  			},
  			mainColor2: {
  				'100': '#CEACD1',
  				'300': '#C29BC8',
  				'800': '#854C9D'
  			}
      }
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '4px',
            height: '4px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#ddd',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#ddd',
            cursor: 'pointer'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          textTransform: 'none',
          borderWidth: '1px',
          '&:hover': { borderWidth: '2px' }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.main
          // '.MuiOutlinedInput-notchedOutline': {
          //   borderColor: theme.palette.primary.main
          // },
          // '&:hover': {
          //   '.MuiOutlinedInput-notchedOutline': {
          //     borderColor: theme.palette.primary.main
          //   }
          // },
          '& fieldset': { borderWidth: '1px !important' },
          '&:hover fieldset': { borderWidth: '2px !important' },
          '&.Mui-focused fieldset': { borderWidth: '2px !important' },
          borderRadius: '8px'
        }
        // input: {
        //   padding: '14.5px 14px'
        // }
      }
    }
  }
})

export default theme
