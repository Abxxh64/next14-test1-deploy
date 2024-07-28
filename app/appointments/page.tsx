'use client';

import React, { useState, useEffect } from 'react'
import TopBar from '../components/TopBar'
import AppointmentCard from '../components/AppointmentCard'
import { Container, Grid, Paper, Typography } from '@mui/material';
import getAppointments from '../services/getAppointments';
import { useRouter } from 'next/navigation';


export default function Appointments() {

  const [appointments, setAppointments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch appointments from the server
    getAppointments()
      .then(appointments => setAppointments(appointments))
      .catch(error => console.error('Failed to fetch appointments:', error));
  }, []);


  return (
    <>
    <TopBar name='Appointments'/>

    <Grid container spacing={6} sx={{px: 8, py: 10}}>

      {/* {appointments.length > 0 ? (

        appointments.map((appointment, index) => (
          <AppointmentCard key={index} appointment={appointment} />
          // <Paper key={index}></Paper>
        ))
        
      ) : (
          
          <Grid item lg={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant={'h4'} color={'error'}>No appointments found</Typography>
            </Paper>
          </Grid>
      )

      } */}

      {appointments.map((appointment, index) => (
        <AppointmentCard key={index} appointment={appointment}/>))}


    </Grid>

    </>

  );
}


