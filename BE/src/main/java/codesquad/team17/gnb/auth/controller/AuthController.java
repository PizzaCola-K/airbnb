package codesquad.team17.gnb.auth.controller;

import codesquad.team17.gnb.auth.dto.AuthJwt;
import codesquad.team17.gnb.auth.service.AuthService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/github/web")
    public AuthJwt issueToken(String code) {
        return authService.issueTokenForWeb(code);
    }
}
