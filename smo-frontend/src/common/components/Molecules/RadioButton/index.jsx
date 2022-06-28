import React from 'react'
import {
  RadioGroup, 
  FormControlLabel, 
  Radio,
  FormControl 
} from '@mui/material';

const RadioButton = ({setTypeUser, margin}) => {
  return (
    <FormControl style={{ marginLeft: margin}}>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel 
          value="professor" 
          control={<Radio />} 
          label="Professor"
          onChange={() => setTypeUser('professor')}
        />
        <FormControlLabel
          value="aluno"
          control={<Radio />}
          label="Aluno"
          onChange={() => setTypeUser('aluno')}
        />
      </RadioGroup>
    </FormControl>
  )
}

export default RadioButton;