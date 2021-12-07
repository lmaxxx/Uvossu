import TextField from '@mui/material/TextField';
import {styled} from '@mui/material/styles';

const DarkOutlineInput = styled(TextField)({
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
    color: "#C5C7CD",
    '& fieldset': {
      borderColor: '#445375',
    },
    '&:hover fieldset': {
      borderColor: '#445375',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0A80FF',
      borderWidth: "1px"
    },
  },
  '& .MuiOutlinedInput-root.Mui-error' : {
    '& fieldset': {
      borderColor: '#d32f2f'
    }
  },
  '& .MuiSvgIcon-root': {
    color: '#C5C7CD'
  }
})


export default DarkOutlineInput