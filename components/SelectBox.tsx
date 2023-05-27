import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function BasicSelect (): JSX.Element {
  const [age, setAge] = React.useState('Unassigned'); // remove

  const handleChange = (event: SelectChangeEvent): void => {
    setAge(event.target.value); //call put to update priority, close select
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={0}>Unassigned</MenuItem>
          <MenuItem value={1}>UrgentPriority</MenuItem>
          <MenuItem value={2}>NotUrgentPriority</MenuItem>
          <MenuItem value={3}>UrgentLowPriority</MenuItem>
          <MenuItem value={4}>NotUrgentLowPriority</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default BasicSelect;