package com.example.marmitapp.controller;

import com.example.marmitapp.dto.AuthDtos;
import com.example.marmitapp.model.Usuario;
import com.example.marmitapp.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final UsuarioRepository repo;
    private final PasswordEncoder encoder;
    public AuthController(UsuarioRepository r, PasswordEncoder e){ this.repo=r; this.encoder=e; }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody AuthDtos.RegisterReq body) {
        if (repo.findByEmail(body.email()).isPresent())
            return ResponseEntity.badRequest().body(Map.of("error","E-mail já cadastrado"));
        var u = new Usuario(body.nome(), body.email(), encoder.encode(body.senha()));
        repo.save(u);
        return ResponseEntity.ok(new AuthDtos.UserRes(u.getId(), u.getNome(), u.getEmail()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthDtos.LoginReq body) {
        var u = repo.findByEmail(body.email())
                .filter(user -> encoder.matches(body.senha(), user.getSenhaHash()))
                .orElse(null);
        if (u == null) return ResponseEntity.status(401).body(Map.of("error","Credenciais inválidas"));
        return ResponseEntity.ok(new AuthDtos.UserRes(u.getId(), u.getNome(), u.getEmail()));
    }
}
