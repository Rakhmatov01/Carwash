import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function ReadRating() {

    //   <Box sx={{ '& > legend': { mt: 2 } }}>
    //   <Typography component="legend">Controlled</Typography>
    //   <Rating
    //     name="simple-controlled"
    //     value={value}
    //     onChange={(event, newValue) => {
    //       setValue(newValue);
    //     }}
    //   />
    //   <Typography component="legend">Uncontrolled</Typography>
    //   <Rating
    //     name="simple-uncontrolled"
    //     onChange={(event, newValue) => {
    //       console.log(newValue);
    //     }}
    //     defaultValue={2}
    //   />
    //   <Typography component="legend">Read only</Typography>
    //   <Rating name="read-only" value={value} readOnly />
    //   <Typography component="legend">Disabled</Typography>
    //   <Rating name="disabled" value={value} disabled />
    //   <Typography component="legend">No rating given</Typography>
    //   <Rating name="no-value" value={null} />
    // </Box>
  return (<Box sx={{ p:1, borderRadius:3, "&:hover":{bgcolor:"#f9fafb"}}}>
    <Rating name="read-only" value={0} readOnly size="small"/>
    <Typography component="legend" variant='body2'>Leave a rating</Typography>
  </Box>

  );
}

// export function GiveRating(){
//   const [value, setValue] = React.useState(0);
// return (<Box>
//   <Typography component="legend">Controlled</Typography>
//       <Rating
//         value={value}
//         name="simple-controlled"
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//       />
// </Box>)
// }