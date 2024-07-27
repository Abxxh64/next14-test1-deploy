import { Typography } from "@mui/material";

export function ZodErrors({ error }: { error: string[] }) {
    if (!error) return null;
    return error.map((err: string, index: number) => (
      <Typography key={index} variant="body2" fontStyle={'italic'} color={'error'} width={'100%'}>
        {err}
      </Typography>
    ));
  }