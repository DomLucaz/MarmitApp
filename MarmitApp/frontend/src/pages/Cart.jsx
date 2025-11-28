import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { api } from "../api";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

import Page from "../components/Page";
import { 
  Paper, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, 
  IconButton, Divider, Box, TextField, Button, Stack, Grid, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Ícone de sucesso

export default function Cart() {
  const { itens, adicionarAoCarrinho, removerDoCarrinho, total, limparCarrinho } = useCart();
  const navigate = useNavigate();
  
  // Estados do Endereço
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [complemento, setComplemento] = useState("");

  const [loadingCep, setLoadingCep] = useState(false);
  
  // Estado do Modal de Sucesso
  const [modalSucesso, setModalSucesso] = useState(false);

  // Busca CEP
  const buscarCep = async () => {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;

    setLoadingCep(true);
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      if (data.erro) {
        alert("CEP não encontrado!");
        return;
      }
      setRua(data.logradouro);
      setBairro(data.bairro);
      setCidade(data.localidade);
      setUf(data.uf);
      document.getElementById("campo-numero")?.focus();
    } catch (error) {
      alert("Erro ao buscar CEP.");
    } finally {
      setLoadingCep(false);
    }
  };

  const finalizarCompra = async () => {
    if (!cep || !rua || !numero) {
      alert("Por favor, preencha o endereço completo.");
      return;
    }

    const userStr = localStorage.getItem("user");
    if (!userStr) {
        alert("Você precisa estar logado!");
        navigate("/login");
        return;
    }
    const user = JSON.parse(userStr);

    const enderecoCompleto = `${rua}, Nº ${numero} - ${bairro}, ${cidade}/${uf} (${cep}). ${complemento}`;

    const payload = {
        idUsuario: user.id,
        endereco: enderecoCompleto,
        itens: itens.map(item => ({
            idProduto: item.id,
            quantidade: item.quantidade
        }))
    };

    try {
        await api.post("/pedidos", payload);
        
        // ABRE O MODAL DE SUCESSO
        setModalSucesso(true);
        
        // Limpa o carrinho
        limparCarrinho(); 
    } catch (error) {
        console.error(error);
        alert("Erro ao finalizar pedido. Tente novamente.");
    }
  };

  // Função para fechar o modal e ir para home ou histórico
  const fecharModal = () => {
      setModalSucesso(false);
      navigate("/"); // Volta para Home
  };

  return (
    <Page>
      <Typography variant="h4" fontWeight={700} mb={3}>Meu Carrinho</Typography>

      {itens.length === 0 ? (
        <Typography color="text.secondary">Seu carrinho está vazio...</Typography>
      ) : (
        <Grid container spacing={3}>
          
          {/* COLUNA ESQUERDA (Produtos + Endereço) */}
          <Grid item xs={12} md={8}>
            
            {/* Lista Produtos */}
            <Paper sx={{ borderRadius: 3, mb: 3, overflow: 'hidden' }}>
              <Box bgcolor="grey.200" p={2}>
                <Typography variant="h6" fontWeight={600}>Itens do Pedido</Typography>
              </Box>
              <List>
                {itens.map((item) => (
                  <Box key={item.id}>
                    <ListItem sx={{ flexWrap: 'wrap', gap: 2 }}>
                      <ListItemAvatar>
                        <Avatar src={item.imagem ? `/assets/images/${item.imagem}` : undefined} variant="rounded">
                          <ShoppingBagIcon />
                        </Avatar>
                      </ListItemAvatar>
                      
                      <ListItemText 
                        primary={<Typography fontWeight={600}>{item.nome}</Typography>}
                        secondary={`Unitário: R$ ${item.preco.toFixed(2)}`}
                        sx={{ flex: 1, minWidth: 150 }} 
                      />

                      <Stack direction="row" alignItems="center" spacing={3}>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ border: '1px solid #ddd', borderRadius: 2, px: 1 }}>
                          <IconButton size="small" onClick={() => removerDoCarrinho(item.id)} color="error">
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography fontWeight="bold" sx={{ minWidth: 20, textAlign: 'center' }}>
                            {item.quantidade}
                          </Typography>
                          <IconButton size="small" onClick={() => adicionarAoCarrinho(item)} color="primary">
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                        <Typography fontWeight={700} sx={{ minWidth: 80, textAlign: 'right' }}>
                          R$ {(item.preco * item.quantidade).toFixed(2)}
                        </Typography>
                      </Stack>
                    </ListItem>
                    <Divider />
                  </Box>
                ))}
              </List>
            </Paper>

            {/* Endereço */}
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <LocalShippingIcon color="primary" />
                <Typography variant="h6" fontWeight={600}>Endereço de Entrega</Typography>
              </Stack>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField 
                    label="CEP" 
                    value={cep} 
                    onChange={(e) => setCep(e.target.value)}
                    onBlur={buscarCep}
                    fullWidth 
                    placeholder="00000-000"
                    size="small"
                    InputProps={{
                      endAdornment: loadingCep && <CircularProgress size={20} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField label="Rua" value={rua} onChange={e=>setRua(e.target.value)} fullWidth disabled size="small" />
                </Grid>
                
                <Grid item xs={4}>
                  <TextField id="campo-numero" label="Número" value={numero} onChange={e=>setNumero(e.target.value)} fullWidth size="small" />
                </Grid>
                <Grid item xs={8}>
                  <TextField label="Bairro" value={bairro} onChange={e=>setBairro(e.target.value)} fullWidth disabled size="small" />
                </Grid>

                <Grid item xs={8}>
                  <TextField label="Cidade" value={cidade} onChange={e=>setCidade(e.target.value)} fullWidth disabled size="small" />
                </Grid>
                <Grid item xs={4}>
                  <TextField label="UF" value={uf} onChange={e=>setUf(e.target.value)} fullWidth disabled size="small" />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Complemento" value={complemento} onChange={e=>setComplemento(e.target.value)} fullWidth size="small" />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* COLUNA DIREITA (Resumo) */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3, position: 'sticky', top: 20 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>Resumo</Typography>
              
              <Stack spacing={2} mb={3}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Subtotal</Typography>
                  <Typography>R$ {total.toFixed(2)}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Frete</Typography>
                  <Typography color="success.main" fontWeight="bold">Grátis</Typography>
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h5" color="primary" fontWeight={800}>
                    R$ {total.toFixed(2)}
                  </Typography>
                </Stack>
              </Stack>

              <Button 
                fullWidth 
                variant="contained" 
                size="large" 
                onClick={finalizarCompra}
                disabled={itens.length === 0}
                sx={{ py: 1.5, fontWeight: 'bold' }}
              >
                Finalizar Pedido
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* --- MODAL DE SUCESSO --- */}
      <Dialog open={modalSucesso} onClose={fecharModal} maxWidth="xs" fullWidth>
        <Box textAlign="center" p={3}>
            <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
            <DialogTitle sx={{ p: 0, mb: 1 }}>Pedido Realizado!</DialogTitle>
            <DialogContent sx={{ p: 0, mb: 3 }}>
                <Typography color="text.secondary">
                    Sua marmita deliciosa já está sendo preparada.
                </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', p: 0 }}>
                <Button onClick={fecharModal} variant="contained" fullWidth>
                    Voltar para Home
                </Button>
            </DialogActions>
        </Box>
      </Dialog>

    </Page>
  );
}