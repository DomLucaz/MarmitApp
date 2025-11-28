import { Box, Container, Typography, Stack, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
    return (
    <Box
        component="footer"
        sx={{
        py: 3,
        px: 2,
        mt: "auto", 
        backgroundColor: (theme) => theme.palette.grey[900],
        color: "white",
        }}
    >
        <Container maxWidth="lg">
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="center" spacing={2}>
            
            {/* Texto da Esquerda */}
            <Box textAlign={{ xs: "center", sm: "left" }}>
            <Typography variant="h6" fontWeight="bold" color="primary.light">
                MarmitApp
            </Typography>
            <Typography variant="body2" color="grey.400">
                Comida caseira, feita com amor.
            </Typography>
            </Box>

            {/* Copyright */}
            <Typography variant="body2" color="grey.500">
            © {new Date().getFullYear()} DomLucaz. Todos os direitos reservados.
            </Typography>

            {/* Ícones Sociais */}
            <Stack direction="row" spacing={2}>
            <Link href="#" color="inherit" sx={{ '&:hover': { color: 'primary.main' } }}>
                <GitHubIcon />
            </Link>
            <Link href="#" color="inherit" sx={{ '&:hover': { color: 'primary.main' } }}>
                <LinkedInIcon />
            </Link>
            </Stack>

        </Stack>
        </Container>
    </Box>
    );
}