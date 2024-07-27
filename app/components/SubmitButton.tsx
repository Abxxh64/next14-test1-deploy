"use client";

import { useFormStatus } from "react-dom";
import { Button, Box, Typography, CircularProgress } from '@mui/material'


function Loader({ text }: { readonly text: string }) {
  return (
    <Box display={'flex'} alignItems={'center'}>
      <CircularProgress size={'1rem'}/>
        <Typography ml={1}>{text}</Typography>
    </Box>
  );
}

interface SubmitButtonProps {
  text: string;
  loadingText: string;
  loading?: boolean;
}

export default function SubmitButton({
  text,
  loadingText,
  loading,
}: Readonly<SubmitButtonProps>) {
  const status = useFormStatus();

  return (
    <Button
      variant="contained"
      type="submit"
      fullWidth
      color="primary"
      sx={{ mt: 5 }}
      aria-disabled={status.pending || loading}
      disabled={status.pending || loading}
    >
      {status.pending || loading ? <Loader text={loadingText} /> : text}
    </Button>
  );
}