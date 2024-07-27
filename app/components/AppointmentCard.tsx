import React from 'react'
import { Grid, Card, CardContent, Typography, Box, Paper} from '@mui/material';


const parseDateTime = (dateTimeString: string) => {
  let date, time, period;

  // Check if the datetime is in the format "MM/DD/YYYY hh:mm:ss AM/PM"
  if (dateTimeString.includes('/')) {
    [date, time, period] = dateTimeString.split(' ');
    date = date.replace(/\//g, '-')

    return {
      date: date,
      time: `${time} ${period}`,
    };
  } 

  // Otherwise, assume the format is "YYYY-MM-DD hh:mm:ss"
  else {
    [date, time] = dateTimeString.split(' ');
    let [hours, minutes, seconds] = time.split(':');
    
    // Convert 24-hour time to 12-hour time with AM/PM
    const hour = parseInt(hours, 10);
    period = hour >= 12 ? 'PM' : 'AM';
    const newHours = (hour % 12) || 12;     // Convert hour to 12-hour format and handle 0 as 12

    return {
      date: date,
      time: `${newHours}:${minutes}:${seconds} ${period}`,
    };
  }
};


type CardProps = {
    appointment: {
      name: string,
      datetime: string,
      status: string,
      statusColor: string,
    },
};

export default function AppointmentCard({ appointment }: CardProps) {
  
  const { date, time } = parseDateTime(appointment.datetime);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Paper elevation={4} sx={{ width: "100%", border: "1px purple solid", borderRadius: "0.7rem"}}>
        <CardContent>
          <Typography variant="body1" component="h6" color="primary">
            Name
          </Typography>
          <Typography variant="body1" fontWeight={'bold'} mb={2} >
            {appointment.name}
          </Typography>

          <Box sx={{display: "flex", justifyContent: "space-between"}}>

            <Box sx={{ display: "flex", flexDirection:'column', justifyContent: "space-between" }}>
              <Typography variant="body1" color="primary">
                Time
              </Typography>
              <Typography variant="body1" fontWeight={'bold'}>
                {time}
              </Typography>

              {/* Show date too? */}
              {/* <Typography variant="body1" color="primary">
                Date
              </Typography>
              <Typography variant="body1" fontWeight={'bold'}>
                {date}
              </Typography> */}
            </Box>
            <Box flex={'column'} flexDirection={'column'}>
              <Typography variant="body1" color="primary">
                Status
              </Typography>
              <Typography variant="body1" fontWeight={'bold'} color={appointment.statusColor}>
                {appointment.status}
                
              </Typography>
            </Box>
          </Box>

        </CardContent>
      </Paper>
    </Grid>
  );
}
