import { useState, useEffect } from "react";
import { Box, Paper, Typography, Container, CardMedia, IconButton, Stack } from "@mui/material";
import Grid from "@mui/material/Grid"; 
import Page from "../components/Page";

// Ícones
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SavingsIcon from '@mui/icons-material/Savings';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircleIcon from '@mui/icons-material/Circle';

export default function Home() {
  // --- CONFIGURAÇÃO DO CARROSSEL ---
  const itens = [
    { id: 1, imagem: "/assets/images/hero.png" },
    { id: 2, imagem: "/assets/images/2.png" },
    { id: 3, imagem: "/assets/images/1.jpg" }  
  ];

  const [ativo, setAtivo] = useState(0);


  useEffect(() => {
    const timer = setInterval(() => {
      proximoSlide();
    }, 5000); 
    return () => clearInterval(timer);
  }, [ativo]);

  const proximoSlide = () => {
    setAtivo((prev) => (prev + 1) % itens.length);
  };

  const slideAnterior = () => {
    setAtivo((prev) => (prev - 1 + itens.length) % itens.length);
  };

  return (
    <Page maxWidth={false} containerProps={{ disableGutters: true }}>
      
      {/* --- CARROSSEL PERSONALIZADO --- */}
      <Box sx={{ position: 'relative', width: '100%', height: { xs: '50vh', md: '70vh' }, overflow: 'hidden', bgcolor: 'grey.900' }}>
        
        {/* Renderiza TODAS as imagens, mas controla a opacidade */}
        {itens.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              position: 'absolute',
              top: 0, left: 0, width: '100%', height: '100%',
              opacity: index === ativo ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              zIndex: index === ativo ? 1 : 0
            }}
          >
            {/* Imagem de Fundo */}
            <Box
              component="img"
              src={item.imagem}
              alt="Slide"
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Overlay Escuro */}
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(0,0,0,0.4)' }} />
          </Box>
        ))}

        {/* Botão Anterior */}
        <IconButton 
          onClick={slideAnterior}
          sx={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: 'white', zIndex: 2, bgcolor: 'rgba(0,0,0,0.3)', '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' } }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        {/* Botão Próximo */}
        <IconButton 
          onClick={proximoSlide}
          sx={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', color: 'white', zIndex: 2, bgcolor: 'rgba(0,0,0,0.3)', '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' } }}
        >
          <ArrowForwardIosIcon />
        </IconButton>

        {/* Indicadores (Bolinhas) */}
        <Stack direction="row" spacing={1} sx={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
          {itens.map((_, index) => (
            <CircleIcon 
              key={index} 
              sx={{ fontSize: 12, cursor: 'pointer', color: index === ativo ? 'primary.main' : 'rgba(255,255,255,0.5)' }} 
              onClick={() => setAtivo(index)}
            />
          ))}
        </Stack>
      </Box>

      {/* --- GRID DE INFORMAÇÕES (MANTIDO IGUAL) --- */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight={700} textAlign="center" mb={4} color="primary.main">
          Por que escolher o MarmitApp?
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(5, 1fr)' },
            gridTemplateRows: { xs: 'auto', md: 'repeat(3, 1fr)' },
            gap: 2,
            minHeight: 400
          }}
        >
          <InfoCard area="1 / 1 / 2 / 2" titulo="Entrega Rápida" icon={<LocalShippingIcon />} cor="#e3f2fd" />
          <InfoCard area="1 / 2 / 2 / 3" titulo="Segurança" icon={<SecurityIcon />} cor="#ffebee" />
          <InfoCard area="2 / 2 / 3 / 3" titulo="Qualidade" icon={<StarIcon />} cor="#fff3e0" />
          <InfoCard area="2 / 1 / 3 / 2" titulo="Pontualidade" icon={<AccessTimeIcon />} cor="#e8f5e9" />
          <InfoCard area="3 / 1 / 4 / 2" titulo="Preço Justo" icon={<SavingsIcon />} cor="#f3e5f5" />
          <InfoCard area="3 / 2 / 4 / 3" titulo="Sabor Caseiro" icon={<SoupKitchenIcon />} cor="#fff8e1" />

          {/* Vídeo */}
          <Paper
            elevation={0}
            sx={{
              gridArea: { xs: 'auto', md: '1 / 3 / 4 / 6' },
              bgcolor: 'black',
              borderRadius: 4,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: { xs: 250, md: 'auto' }
            }}
          >
            <CardMedia
              component="video"
              image="/assets/videos/ajudapopular.mp4" 
              controls
              loop
              muted
              sx={{ width: '100%', height: '100%', objectFit: 'cover', border: 'none' }}
            />
          </Paper>
        </Box>
      </Container>
    </Page>
  );
}

function InfoCard({ area, titulo, icon, cor }) {
  return (
    <Paper
      elevation={2}
      sx={{
        gridArea: { xs: 'auto', md: area },
        bgcolor: cor,
        borderRadius: 3,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: '0.3s',
        '&:hover': { transform: 'scale(1.05)' }
      }}
    >
      <Box sx={{ color: 'grey.800', mb: 1 }}>{icon}</Box>
      <Typography variant="subtitle2" fontWeight={700} textAlign="center">{titulo}</Typography>
    </Paper>
  );
}