import { useState } from "react";
import { Container, Paper, TextField, Button, Stack, Typography, Alert } from "@mui/material";
import { api } from "../api";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Page from "../components/Page";

export default function Login() {
const [email, setEmail] = useState("");
const [senha, setSenha] = useState("");
const [erro, setErro] = useState("");
const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setErro("");
        try {
        const { data } = await api.post("/auth/login", { email, senha });
        localStorage.setItem("user", JSON.stringify(data)); // guarda algo simples
        navigate("/marmitas");
        } catch (err) {
        setErro("Login inválido. Verifique email/senha.");
        }
    };

    return (
        <Page>
        <Container maxWidth="sm" sx={{ p: 0 }}>
            <Paper sx={{ p: 3, borderRadius: 3 }} elevation={0} component="form" onSubmit={onSubmit}>
            <Typography variant="h5" fontWeight={700} mb={2}>Entrar</Typography>
            {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}
            <Stack spacing={2}>
                <TextField label="E-mail" value={email} onChange={e=>setEmail(e.target.value)} required />
                <TextField label="Senha" type="password" value={senha} onChange={e=>setSenha(e.target.value)} required />
                <Button type="submit" variant="contained">Entrar</Button>
                <Button component={RouterLink} to="/register">Criar conta</Button>
            </Stack>
            </Paper>
        </Container>
        </Page>
    );
}
