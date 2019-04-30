import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiButton: {
      root: {
        fontWeight: 'bold',
        backgroundColor: 'green',
        marginTop: '30px',
        '&:hover': {
          backgroundColor: '#00a86b',
        },
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 40px',
      },
    },
  },
})
