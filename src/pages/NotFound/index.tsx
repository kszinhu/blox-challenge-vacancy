import { Link } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import { Container } from "./styles";

export default function NotFound() {
  return (
    <Container spacing={2}>
      <Stack spacing={2} alignItems='center'>
        <Typography variant='h1' sx={{ fontWeight: "bold" }}>
          404
        </Typography>
        <Typography variant='h4' component='h2' sx={{ fontSize: 18 }}>
          The page you are looking for does not exist.
        </Typography>
      </Stack>
      <Button variant='text' component={Link} to='/'>
        Go to home
      </Button>
    </Container>
  );
}
