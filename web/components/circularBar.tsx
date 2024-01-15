import * as React from 'react';
import CircularProgress, {
  CircularProgressProps, CircularProgressPropsColorOverrides,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {

    const color = (value:number)=>{

        if (value == 100) {
            return "success"
        }
        if (value == 0) {
          return"error"
        }
        else{
            return "info"
        }
    }




  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress size={80} color={color(props.value)}  variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          style={{fontSize:20,color:color(props.value)}}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default  CircularProgressWithLabel



