import { useEffect, useMemo, useState } from "react";
import { api } from "../api";

// Material UI
    import {
    Box, // usamos no map
    Typography, Paper, Chip, Alert,
    Card, CardContent, List, ListItem, ListItemText,
    Stack, TextField, Button, Divider
    } from "@mui/material";
    import AddIcon from "@mui/icons-material/Add";

    import Page from "../components/Page";

    export default function Marmitas() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    // form
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [estoque, setEstoque] = useState("");

    const temDados = useMemo(
    () => Array.isArray(produtos) && produtos.length > 0,
    [produtos]
    );

    const carregar = async () => {
    setLoading(true);
    setErro("");
    try {
        const { data } = await api.get("/produtos");
        setProdutos(data);
    } catch (e) {
        console.error(e);
        setErro(
        "Não consegui carregar /produtos. Verifique se o backend está rodando em http://localhost:8080."
        );
    } finally {
        setLoading(false);
    }
    };

    useEffect(() => { carregar(); }, []);

    const handleCriar = async (e) => {
    e.preventDefault();
    setErro("");

    const payload = {
        nome: nome?.trim(),
        ...(preco ? { preco: Number(preco) } : {}),
        ...(estoque ? { estoque: Number(estoque) } : {}),
    };

    if (!payload.nome) {
        setErro("Informe ao menos o nome da marmita.");
        return;
    }

    try {
        await api.post("/produtos", payload);
        setNome(""); setPreco(""); setEstoque("");
        await carregar();
    } catch (e) {
        console.error(e);
        setErro(
        "Ainda não consegui salvar. Se o backend não tem POST /produtos, a gente implementa em seguida."
        );
    }
    };

    return (
    <Page maxWidth={false} containerProps={{ disableGutters: true }}>
        {/* card centralizado e largo */}
        <Paper sx={{ p: 3, borderRadius: 3, maxWidth: 1200, mx: "auto" }}>

        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Marmitas
            </Typography>
            <Chip label="Lista + Cadastro" size="small" />
        </Stack>

        {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}

        <Card sx={{ mb: 3, borderRadius: 3 }} variant="outlined">
            <CardContent>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Lista de marmitas
            </Typography>

            {loading ? (
                <Typography>Carregando…</Typography>
            ) : temDados ? (
                <List disablePadding>
                {produtos.map((p, idx) => {
                    const nome = typeof p === "string" ? p : p?.nome ?? "(sem nome)";
                    const preco =
                    typeof p === "object" && p?.preco != null
                        ? `R$ ${Number(p.preco).toFixed(2)}`
                        : null;
                    const estoque =
                    typeof p === "object" && p?.estoque != null
                        ? ` • estoque: ${p.estoque}`
                        : "";

                    return (
                    <Box key={p?.id ?? `${nome}-${idx}`}>
                        <ListItem disableGutters>
                        <ListItemText
                            primary={nome}
                            secondary={[preco, estoque].filter(Boolean).join("")}
                        />
                        </ListItem>
                        {idx < produtos.length - 1 && <Divider />}
                    </Box>
                    );
                })}
                </List>
            ) : (
                <Typography>Nenhum item encontrado.</Typography>
            )}
            </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3 }} variant="outlined">
            <CardContent component="form" onSubmit={handleCriar}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Cadastrar nova marmita
            </Typography>

            <Stack spacing={2}>
                <TextField
                label="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                />

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                    label="Preço (opcional)"
                    type="number"
                    inputProps={{ step: "0.01" }}
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    sx={{ flex: 1 }}
                />
                <TextField
                    label="Estoque (opcional)"
                    type="number"
                    value={estoque}
                    onChange={(e) => setEstoque(e.target.value)}
                    sx={{ flex: 1 }}
                />
                </Stack>

                <Stack direction="row" spacing={2}>
                <Button type="submit" variant="contained" startIcon={<AddIcon />}>
                    Salvar
                </Button>
                <Button
                    variant="text"
                    onClick={() => { setNome(""); setPreco(""); setEstoque(""); }}
                >
                    Limpar
                </Button>
                </Stack>
            </Stack>
            </CardContent>
        </Card>

        </Paper>
    </Page>
    );
}
