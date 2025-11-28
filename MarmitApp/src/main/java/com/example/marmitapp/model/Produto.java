package com.example.marmitapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

@Entity
@Table(name = "produto")
public class Produto {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nome; // Funciona como o seu "Título"

    @Positive
    private BigDecimal preco;

    @Min(0)
    private Integer estoque;

    @Column(length = 500) // Aumenta o tamanho para caber links grandes
    private String imagem;

    public Produto() {}

    public Produto(String nome, BigDecimal preco, Integer estoque, String imagem) {
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
        this.imagem = imagem;
    }

    // Getters e Setters existentes...
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public BigDecimal getPreco() { return preco; }
    public void setPreco(BigDecimal preco) { this.preco = preco; }
    public Integer getEstoque() { return estoque; }
    public void setEstoque(Integer estoque) { this.estoque = estoque; }
    public String getImagem() { return imagem; }
    public void setImagem(String imagem) { this.imagem = imagem; }
}