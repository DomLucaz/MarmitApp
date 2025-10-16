package com.example.marmitapp.controller;

import com.example.marmitapp.model.Produto;
import com.example.marmitapp.repository.ProdutoRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/produtos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProdutoController {

    private final ProdutoRepository repo;

    public ProdutoController(ProdutoRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Produto> listar() {
        return repo.findAll();
    }

    @PostMapping
    public ResponseEntity<Produto> criar(@Valid @RequestBody Produto p) {
        if (p.getPreco() == null) p.setPreco(new BigDecimal("0"));
        if (p.getEstoque() == null) p.setEstoque(0);
        Produto salvo = repo.save(p);
        return ResponseEntity.created(URI.create("/produtos/" + salvo.getId())).body(salvo);
    }
}
