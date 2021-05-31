package codesquad.team17.gnb.auth.service;

import codesquad.team17.gnb.auth.dto.AuthJwt;
import codesquad.team17.gnb.user.domain.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.LocalDate;

@Component
public class JwtUtils {

    private static final String ISSUER = "gnb";
    private static final String ID = "id";
    private static final String GITHUB = "github";
    private static final String IS_HOST = "isHost";
    private static final String IS_ADMIN = "isAdmin";

    private final Algorithm ALGORITHM;
    private final JWTVerifier jwtVerifier;

    public JwtUtils(@Value("${auth.jwt.secret}") String SECRET) {
        ALGORITHM = Algorithm.HMAC256(SECRET);
        jwtVerifier = JWT.require(ALGORITHM)
                .acceptExpiresAt(0)
                .withIssuer(ISSUER)
                .build();
    }

    public JWTVerifier getJwtVerifier() {
        return jwtVerifier;
    }

    public AuthJwt getJwt(User user) {
        String token = JWT.create()
                .withClaim(ID, user.getId())
                .withClaim(GITHUB, user.getGithub())
                .withClaim(IS_HOST, user.isHost())
                .withClaim(IS_ADMIN, user.isAdmin())
                .withIssuer(ISSUER)
                .withExpiresAt(Date.valueOf(LocalDate.now().plusDays(2)))
                .sign(ALGORITHM);

        return new AuthJwt(token);
    }

    public User getUserFromJwt(DecodedJWT jwt) {
        return User.of(
                jwt.getClaim(ID).asLong(),
                jwt.getClaim(GITHUB).asString(),
                jwt.getClaim(IS_HOST).asBoolean(),
                jwt.getClaim(IS_ADMIN).asBoolean()
        );
    }

    public DecodedJWT verify(String token) {
        return jwtVerifier.verify(token);
    }
}
