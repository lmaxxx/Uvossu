import TextField from '@mui/material/TextField';
import {styled} from '@mui/material/styles';

  const LightOutlineInput = styled(TextField)({
    '& label.Mui-focused': {
      color: '#0A80FF',
    },
    '& label.Mui-error': {
      color: '#d32f2f',
    },
    '& label': {
      color: "#0A80FF"
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      color: '#272C30',
      '& fieldset': {
        borderColor: 'silver',
      },
      '&:hover fieldset': {
        borderColor: 'silver',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0A80FF',
        borderWidth: '1px'
      },
    },
    '& .MuiOutlinedInput-root.Mui-error' : {
      '& fieldset': {
        borderColor: '#d32f2f'
      }
    },
    '& svg.MuiSvgIcon-root': {
      color: '#272C30'
    }
  })


export default LightOutlineInput