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
}
