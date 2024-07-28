'use client';

import React, { useState, useEffect } from 'react'
import TopBar from '../components/TopBar'
import AppointmentCard from '../components/AppointmentCard'
import { Grid, Paper, Typography } from '@mui/material';
import getAppointments from '../services/getAppointments';
import { useRouter } from 'next/navigation';


export default function Appointments() {

  const [appointments, setAppointments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {   
        console.log('Fetching appointments...');
        const fetchedAppointments = await getAppointments();
        console.log('Fetched response:', fetchedAppointments);
        // setAppointments(fetchedAppointments);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
        router.push('/login');
      }
    };

    fetchAppointments();
  }, [router]);


  return (
    <>
    <TopBar name='Appointments'/>

    <Grid container spacing={6} sx={{px: 8, py: 10}}>

      {appointments && appointments.length > 0 ? (

        appointments.map((appointment, index) => (
          <AppointmentCard key={index} appointment={appointment} />
        ))
        
      ) : (
          
          <Grid item lg={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant={'h4'} color={'error'}>No appointments found</Typography>
            </Paper>
          </Grid>
      )

      }

    </Grid>

    </>

  );
}


