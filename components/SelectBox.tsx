
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TodoType from '../types/Todo';

import useUpdateTodo from '../hooks/useUpdateTodo';

const PrioritySelect = ({ todo, togglePriority }: { todo: TodoType, togglePriority: () => void }): JSX.Element => {
  const { mutate: update } = useUpdateTodo();

  const handleChange = (event: SelectChangeEvent): void => {
    todo.priority = parseInt(event.target.value);
    update(todo);
    // togglePriority();
  };

  const convertPriority = (priority: number): string => {
      switch (priority) {
        case 0:
          return 'Unassigned';
        case 1:
          return 'UrgentPriority';
        case 2:
          return 'NotUrgentPriority';
        case 3:
          return 'UrgentLowPriority';
        case 4:
          return 'NotUrgentLowPriority';
        default:
          return 'Unassigned';
    }
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{convertPriority(todo.priority)}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={todo.priority.toString()}
          label="Priority"
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

export default PrioritySelect;