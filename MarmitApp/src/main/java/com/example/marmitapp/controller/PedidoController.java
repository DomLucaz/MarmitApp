package com.example.marmitapp.controller;

import com.example.marmitapp.dto.AuthDtos.*;
import com.example.marmitapp.model.*;
import com.example.marmitapp.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "http://localhost:5173")
public class PedidoController {

    private final PedidoRepository pedidoRepo;
    private final UsuarioRepository usuarioRepo;
    private final ProdutoRepository produtoRepo;

    public PedidoController(PedidoRepository pr, UsuarioRepository ur, ProdutoRepository prodR) {
        this.pedidoRepo = pr;
        this.usuarioRepo = ur;
        this.produtoRepo = prodR;
    }

    @PostMapping
    @Transactional
    public ResponseEntity<?> criarPedido(@RequestBody PedidoReq dados) {
        Usuario usuario = usuarioRepo.findById(dados.idUsuario())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setEnderecoEntrega(dados.endereco()); // SALVA O ENDEREÇO AQUI

        List<ItemPedido> itensParaSalvar = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (var itemReq : dados.itens()) {
            Produto prod = produtoRepo.findById(itemReq.idProduto())
                    .orElseThrow(() -> new RuntimeException("Produto não existe"));

            ItemPedido item = new ItemPedido(pedido, prod, itemReq.quantidade(), prod.getPreco());
            itensParaSalvar.add(item);

            BigDecimal subtotal = prod.getPreco().multiply(new BigDecimal(itemReq.quantidade()));
            total = total.add(subtotal);
        }

        pedido.setItens(itensParaSalvar);
        pedido.setValorTotal(total);

        pedidoRepo.save(pedido);

        return ResponseEntity.ok("Pedido realizado com sucesso! ID: " + pedido.getId());
    }
}