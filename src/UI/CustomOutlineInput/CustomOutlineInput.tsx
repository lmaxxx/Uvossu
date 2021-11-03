import TextField from '@mui/material/TextField';
import {styled} from '@mui/material/styles';

const CustomOutlineInput = styled(TextField)({
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
    '& fieldset': {
      borderColor: '#0A80FF',
    },
    '&:hover fieldset': {
      borderColor: '#0A80FF',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0A80FF',
    },
  },
  '& .MuiOutlinedInput-root.Mui-error' : {
    '& fieldset': {
      borderColor: '#d32f2f'
    }
  }
})

export default CustomOutlineInput