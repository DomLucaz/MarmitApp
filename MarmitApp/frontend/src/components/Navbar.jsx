import { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../contexts/CartContext";

export default function Navbar() {
    const [isLogged, setIsLogged] = useState(!!localStorage.getItem("user"));
    const navigate = useNavigate();
    const { itens } = useCart(); // Pegue os itens para contar

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
        {/* Botão do Carrinho */}
        <Button color="inherit" component={RouterLink} to="/carrinho" sx={{ mr: 2 }}>
            <Badge badgeContent={itens.length} color="secondary">
                <ShoppingCartIcon />
            </Badge>
        </Button>
        </Toolbar>
    </AppBar>
    );
}
