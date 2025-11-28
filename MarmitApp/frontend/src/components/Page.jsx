import { Box, Container } from "@mui/material";
import Footer from "./Footer"; // Importe o Footer

export default function Page({ children, maxWidth = "lg", containerProps = {} }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "calc(100vh - 64px)", 
                bgcolor: "grey.100",
            }}
        >
            <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
                <Container maxWidth={maxWidth} {...containerProps}>
                    {children}
                </Container>
            </Box>
            <Footer />
        </Box>
    );
}