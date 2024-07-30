'use client'
import React from 'react'
import { Container, Paper, TextField, Box, IconButton, InputAdornment, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {loginUserAction} from '../../services/auth-actions';
import { useFormState } from 'react-dom';
import { ZodErrors } from '../../components/ZodErrors';
import SubmitButton from '../../components/SubmitButton';


const INITIAL_STATE = {
  data: null,
};


export default function Login() {
  
    const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);
    const [showPassword, setShowPassword] = React.useState(false)

    const handleClickShowPassword = () => setShowPassword(!showPassword)


    return (

    <Container
    component="main"
    maxWidth="xs"
    sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
    }}
    >
    
      <Paper elevation={3} sx={{ p: 3, pb: 5, width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img src="/pixil-logo.png" alt='pixil logo'/>
        </Box>

          <Typography variant="body2" fontStyle={'italic'} color={'error'} gutterBottom>{formState?.apiErrors}</Typography>

        <Box component="form" action={formAction} display={'flex'} flexDirection={'column'} width={'100%'} noValidate>
          <TextField
            fullWidth
            label="Email"
            type="email"
            name='email'
            autoFocus
            />
            <Box height={2} pl={1}>
              <ZodErrors error={formState?.zodErrors?.email} />
            </Box>
         

          <TextField
            sx={{mt: 5}}
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            name='password'
            autoFocus
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <Box height={2} pl={1}>
              <ZodErrors error={formState?.zodErrors?.password} />
          </Box>
          
          <SubmitButton  text="Log In" loadingText="Loading"/>

        </Box>
      </Paper>

    </Container>
    
  );
}
