package com.example.marmitapp.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class PingController {
    @GetMapping("/ping")
    public String ping() { return "ok"; }
}
