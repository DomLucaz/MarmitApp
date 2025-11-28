import { useEffect, useState } from "react";
import { api } from "../api";

// Material UI
import {
    Box, Typography, Paper, Chip, IconButton,
    Card, CardContent, CardMedia, CardActions,
    Grid,
    Stack, TextField, Button, 
    Dialog, DialogTitle, DialogContent, DialogActions,
    Snackbar, Alert
} from "@mui/material";

// Ícones
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

import { useCart } from "../contexts/CartContext";
import Page from "../components/Page";

export default function Marmitas() {
    // --- Estados e Hooks ---
    const { adicionarAoCarrinho } = useCart();
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openForm, setOpenForm] = useState(false);
    const [editandoId, setEditandoId] = useState(null);
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [estoque, setEstoque] = useState("");
    const [imagem, setImagem] = useState(""); 

    const [openDelete, setOpenDelete] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    const [snack, setSnack] = useState({ open: false, msg: "", severity: "success" });

    // --- Carregar Dados ---
    const carregar = async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/produtos");
            setProdutos(data);
        } catch (e) {
            console.error(e);
            showSnack("Erro ao carregar produtos.", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { carregar(); }, []);

    // --- Helpers ---
    const showSnack = (msg, severity = "success") => setSnack({ open: true, msg, severity });
    const handleCloseSnack = () => setSnack({ ...snack, open: false });

    // --- Handlers do Formulário ---
    const handleAbrirNovo = () => {
        setEditandoId(null);
        setNome(""); setPreco(""); setEstoque(""); setImagem("");
        setOpenForm(true);
    };

    const handleAbrirEditar = (p) => {
        setEditandoId(p.id);
        setNome(p.nome);
        setPreco(p.preco);
        setEstoque(p.estoque);
        setImagem(p.imagem || "");
        setOpenForm(true);
    };

    const handleSalvar = async () => {
        const payload = { nome, preco: Number(preco), estoque: Number(estoque), imagem };
        try {
            if (editandoId) {
                await api.put(`/produtos/${editandoId}`, payload);
                showSnack("Produto atualizado com sucesso!");
            } else {
                await api.post("/produtos", payload);
                showSnack("Produto adicionado com sucesso!");
            }
            setOpenForm(false);
            carregar();
        } catch (e) {
            showSnack("Erro ao salvar. Verifique os dados.", "error");
        }
    };

    const confirmarExclusao = (id) => {
        setIdToDelete(id);
        setOpenDelete(true);
    };

    const executarExclusao = async () => {
        try {
            await api.delete(`/produtos/${idToDelete}`);
            showSnack("Produto excluído!");
            carregar();
        } catch (e) {
            showSnack("Erro ao excluir.", "error");
        } finally {
            setOpenDelete(false);
        }
    };

    return (
        <Page maxWidth="lg">
            
            {/* Cabeçalho */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="h4" fontWeight={800} color="primary.main">Cardápio</Typography>
                    <Chip label={`${produtos.length} opções`} />
                </Stack>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleAbrirNovo} size="large">
                    Nova Marmita
                </Button>
            </Stack>

            {/* --- GRID DE CARDS --- */}
            {loading ? (
                <Typography>Carregando...</Typography>
            ) : (
                <Grid container spacing={3} alignItems="stretch"> 
                    {produtos.map((p) => (
                        <Grid item xs={12} sm={6} md={4} key={p.id} sx={{ display: 'flex' }}>
                            <Card 
                                elevation={3} 
                                sx={{ 
                                    width: '100%',
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    borderRadius: 3,
                                    transition: 'transform 0.2s',
                                    '&:hover': { transform: 'scale(1.02)' }
                                }}
                            >
                                {/* Imagem do Card - AJUSTADA */}
                                {p.imagem ? (
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={`/assets/images/${p.imagem}`} 
                                        alt={p.nome}
                                        sx={{ objectFit: "cover" }} // <--- O SEGREDO ESTÁ AQUI
                                    />
                                ) : (
                                    <Box 
                                        height="200px" 
                                        bgcolor="grey.200" 
                                        display="flex" 
                                        alignItems="center" 
                                        justifyContent="center"
                                    >
                                        <RestaurantMenuIcon sx={{ fontSize: 60, color: 'grey.400' }} />
                                    </Box>
                                )}

                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" fontWeight={700} gutterBottom>
                                        {p.nome}
                                    </Typography>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="h5" color="success.main" fontWeight={800}>
                                            R$ {Number(p.preco).toFixed(2)}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Estoque: {p.estoque}
                                        </Typography>
                                    </Stack>
                                </CardContent>

                                {/* Botões de Ação */}
                                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                                    <Button 
                                        variant="contained" 
                                        color="success"
                                        startIcon={<ShoppingCartIcon />}
                                        onClick={() => {
                                            adicionarAoCarrinho(p);
                                            showSnack("Adicionado ao carrinho!");
                                        }}
                                        fullWidth
                                        sx={{ mr: 1 }}
                                    >
                                        Comprar
                                    </Button>

                                    <Stack direction="row">
                                        <IconButton size="small" onClick={() => handleAbrirEditar(p)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton size="small" onClick={() => confirmarExclusao(p.id)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {produtos.length === 0 && !loading && (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography color="text.secondary">Nenhuma marmita cadastrada.</Typography>
                </Paper>
            )}

            {/* --- MODAIS --- */}
            <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
                <DialogTitle>{editandoId ? "Editar Marmita" : "Nova Marmita"}</DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField label="Nome do Produto" value={nome} onChange={e => setNome(e.target.value)} fullWidth autoFocus />
                        <Stack direction="row" spacing={2}>
                            <TextField label="Preço" type="number" value={preco} onChange={e => setPreco(e.target.value)} fullWidth />
                            <TextField label="Estoque" type="number" value={estoque} onChange={e => setEstoque(e.target.value)} fullWidth />
                        </Stack>
                        <TextField 
                            label="Nome do Arquivo da Imagem" 
                            value={imagem} onChange={e => setImagem(e.target.value)} 
                            fullWidth 
                            placeholder="Ex: marmita.jpeg" 
                            helperText="Certifique-se que o arquivo está na pasta public/assets/imagens"
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenForm(false)}>Cancelar</Button>
                    <Button onClick={handleSalvar} variant="contained">Salvar</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                <DialogTitle>Tem certeza?</DialogTitle>
                <DialogContent>
                    <Typography>Esta ação apagará o produto permanentemente.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDelete(false)}>Cancelar</Button>
                    <Button onClick={executarExclusao} color="error" variant="contained" autoFocus>Apagar</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snack.open} autoHideDuration={4000} onClose={handleCloseSnack} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleCloseSnack} severity={snack.severity} variant="filled" sx={{ width: '100%' }}>{snack.msg}</Alert>
            </Snackbar>
        </Page>
    );
}