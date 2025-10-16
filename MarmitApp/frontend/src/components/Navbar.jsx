import { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [isLogged, setIsLogged] = useState(!!localStorage.getItem("user"));
    const navigate = useNavigate();

    useEffect(() => {
    // atualiza quando voltar da página de login/cadastro
    const i = setInterval(() => setIsLogged(!!localStorage.getItem("user")), 500);
    return () => clearInterval(i);
    }, []);

    const sair = () => {
    localStorage.removeItem("user");
    setIsLogged(false);
    navigate("/");
    };

    return (
    <AppBar position="sticky" color="primary" elevation={0}>
        <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>MarmitApp</Typography>
        <Box sx={{ flex: 1 }} />
        <Button color="inherit" component={RouterLink} to="/">Home</Button>
        <Button color="inherit" component={RouterLink} to="/marmitas">Cadastro Marmitas</Button>
        {isLogged ? (
            <Button color="inherit" onClick={sair}>Sair</Button>
        ) : (
            <Button color="inherit" component={RouterLink} to="/login">Login</Button>
        )}
        </Toolbar>
    </AppBar>
    );
}
