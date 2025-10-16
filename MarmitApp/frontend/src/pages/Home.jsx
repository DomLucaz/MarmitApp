// src/pages/Home.jsx
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Page from "../components/Page";
import hero from "../assets/images/hero.png"; // se colocar em public, remova esse import

export default function Home() {
  return (
    <Page maxWidth={false} containerProps={{ disableGutters: true }}>
      <Box
        sx={{
          // HERO com imagem + overlay pra legibilidade
          minHeight: { xs: "60vh", md: "70vh" },
          backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url(${hero})`,
          // se usar public: backgroundImage: "linear-gradient(...), url('/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: { xs: 6, md: 10 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            maxWidth: 900,
            mx: "auto",
            bgcolor: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(2px)",
          }}
        >
          <Typography variant="h3" fontWeight={800} gutterBottom>
            Bem-vindo ao MarmitApp
          </Typography>
          <Typography color="text.secondary" mb={3}>
            Refeições acessíveis, salvando alimentos do desperdício. Cadastre novas
            marmitas ou faça login para gerenciar pedidos.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              component={RouterLink}
              to="/marmitas"
              variant="contained"
              size="large"
            >
              Ver/Cadastrar Marmitas
            </Button>
            <Button
              component={RouterLink}
              to="/login"
              variant="outlined"
              size="large"
            >
              Fazer Login
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Page>
  );
}
