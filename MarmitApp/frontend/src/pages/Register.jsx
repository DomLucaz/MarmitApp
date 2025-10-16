import { useState } from "react";
import { Paper, TextField, Button, Stack, Typography, Alert } from "@mui/material";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import Page from "../components/Page";

export default function Register() {
const [nome, setNome] = useState("");
const [email, setEmail] = useState("");
const [senha, setSenha] = useState("");
const [erro, setErro] = useState("");
const navigate = useNavigate();

const onSubmit = async (e) => {
    e.preventDefault();
    setErro("");
        try {
            await api.post("/auth/register", { nome, email, senha });
            navigate("/login");
        } catch (err) {
    setErro("Não foi possível criar a conta (e-mail já existe?).");
    }
};

return (
    <Page maxWidth="sm">
        <Paper sx={{ p: 3, borderRadius: 3 }} elevation={0} component="form" onSubmit={onSubmit}>
        <Typography variant="h5" fontWeight={700} mb={2}>Criar conta</Typography>
        {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}
        <Stack spacing={2}>
            <TextField label="Nome" value={nome} onChange={e=>setNome(e.target.value)} required />
            <TextField label="E-mail" value={email} onChange={e=>setEmail(e.target.value)} required />
            <TextField label="Senha" type="password" value={senha} onChange={e=>setSenha(e.target.value)} required />
            <Button type="submit" variant="contained">Cadastrar</Button>
        </Stack>
        </Paper>
    </Page>
);
}
