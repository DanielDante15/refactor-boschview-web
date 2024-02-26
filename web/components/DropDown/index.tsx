import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface props {
  onChange:Function
  value:string
}



export default function Dropdown({onChange,value}:props) {



  const handleChange = (event:any, value:any) => {
    if (value) {
      onChange(value)
    } else {
      console.log('Nenhum item selecionado.');
    }
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={stack}
      value={value}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Select your stack" />}
      onChange={handleChange}
    />
  );
}
const stack = [
  "Fullstack",
  "BackEnd",
  "FrontEnd",
  "Arquiteto",
  "PO",
  "Embarcados",
  "IA"
]
