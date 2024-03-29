import LinearProgress from '@mui/material/LinearProgress';
import BasicTimePicker from '../TimePicker/TimePicker';

const ProgressToday = () => (
    <div style={{ position: 'relative', height: '50%',width:'30%' }}>
      <LinearProgress variant="determinate" value={90} /> {}
    </div>
  );

const TestPractise=()=>
{
    return <div>
       <BasicTimePicker></BasicTimePicker>
    </div>
}

export default TestPractise;