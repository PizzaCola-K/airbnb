package codesquad.team17.gnb.auth.interceptor;

import codesquad.team17.gnb.auth.service.JwtUtils;
import codesquad.team17.gnb.exception.NoAuthorizationException;
import codesquad.team17.gnb.user.domain.User;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class PlaceInterceptor implements HandlerInterceptor {

    private final JwtUtils jwtUtils;
    private final Logger logger = LoggerFactory.getLogger(PlaceInterceptor.class);

    public PlaceInterceptor(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = getJwt(request);
        if (token == null) {
            logger.info("인터셉터");
            request.setAttribute("user", null);
            return true;
        }
        DecodedJWT jwt = jwtUtils.verify(token);
        User user = jwtUtils.getUserFromJwt(jwt);

        request.setAttribute("user", user);
        return true;
    }

    private String getJwt(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer")) {
            return authorizationHeader.substring("Bearer".length()).trim();
        }

        return null;
    }
}
