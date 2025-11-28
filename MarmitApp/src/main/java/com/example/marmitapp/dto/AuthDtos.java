package com.example.marmitapp.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AuthDtos {
    public record RegisterReq(@NotBlank String nome,
                              @Email @NotBlank String email,
                              @NotBlank String senha) {}

    public record LoginReq(@Email @NotBlank String email,
                           @NotBlank String senha) {}

    public record UserRes(Long id, String nome, String email) {}

    public record ItemPedidoReq(Long idProduto, Integer quantidade) {}

    public record PedidoReq(
            Long idUsuario,
            String endereco, // O endereço vem aqui
            java.util.List<ItemPedidoReq> itens
    ) {}
}
