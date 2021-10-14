import classes from './CustomOutlineInput.module.scss'
import TextField from '@mui/material/TextField';
import {styled} from '@mui/material/styles';

const CustomOutlineInput = styled(TextField)({
  '& label.Mui-focused': {
    color: '#6588DE',
  },
  '& label.Mui-error': {
    color: '#d32f2f',
  },
  '& label': {
    color: "#6588DE"
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#6588DE',
    },
    '&:hover fieldset': {
      borderColor: '#6588DE',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6588DE',
    },
  },
  '& .MuiOutlinedInput-root.Mui-error' : {
    '& fieldset': {
      borderColor: '#d32f2f'
    }
  }
})

export default CustomOutlineInput