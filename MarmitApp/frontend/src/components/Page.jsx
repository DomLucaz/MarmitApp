// src/components/Page.jsx
import { Box, Container } from "@mui/material";

export default function Page({ children, maxWidth = "lg", containerProps = {} }) {
    return (
        <Box
        component="main"
        sx={{
            minHeight: "calc(100vh - 64px)", // altura total menos a AppBar
            bgcolor: "grey.100",
        }}
        >
        <Container maxWidth={maxWidth} sx={{ py: 4 }} {...containerProps}>
            {children}
        </Container>
        </Box>
    );
}
