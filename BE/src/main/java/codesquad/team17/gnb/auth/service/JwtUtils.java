package codesquad.team17.gnb.auth.service;

import codesquad.team17.gnb.auth.dto.AuthJwt;
import codesquad.team17.gnb.user.domain.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtils {

    private static final String ISSUER = "gnb";
    private final Algorithm ALGORITHM;

    public JwtUtils(@Value("${auth.jwt.secret}") String SECRET) {
        ALGORITHM = Algorithm.HMAC256(SECRET);
    }

    public AuthJwt getJwt(User user) {
        String token = JWT.create()
                .withClaim("id", user.getId())
                .withClaim("github", user.getGithub())
                .withClaim("isHost", user.isHost())
                .withClaim("isAdmin", user.isAdmin())
                .withIssuer(ISSUER)
                .sign(ALGORITHM);

        return new AuthJwt(token);
    }
}
