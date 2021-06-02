package codesquad.team17.gnb.auth.service;

import codesquad.team17.gnb.auth.dto.AccessTokenRequest;
import codesquad.team17.gnb.auth.dto.AccessTokenResponse;
import codesquad.team17.gnb.auth.dto.AuthJwt;
import codesquad.team17.gnb.auth.dto.GithubUser;
import codesquad.team17.gnb.exception.NotFoundException;
import codesquad.team17.gnb.user.domain.User;
import codesquad.team17.gnb.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
public class AuthService {

    private final String WEB_CLIENT_ID;
    private final String WEB_CLIENT_SECRET;
    private final String WEB_REDIRECT_URI;
    private final String IOS_CLIENT_ID;
    private final String IOS_CLIENT_SECRET;
    private final String IOS_REDIRECT_URI;
    private final String ACCESS_TOKEN_URI;
    private final String USER_URI;

    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;

    private final Logger logger = LoggerFactory.getLogger(AuthService.class);

    public AuthService(@Value("${auth.github.web.clientId}") String WEB_CLIENT_ID,
                       @Value("${auth.github.web.clientSecret}") String WEB_CLIENT_SECRET,
                       @Value("${auth.github.web.redirectUri}") String WEB_REDIRECT_URI,
                       @Value("${auth.github.ios.clientId}") String IOS_CLIENT_ID,
                       @Value("${auth.github.ios.clientSecret}") String IOS_CLIENT_SECRET,
                       @Value("${auth.github.ios.redirectUri}") String IOS_REDIRECT_URI,
                       @Value("${auth.github.accessTokenUri}") String ACCESS_TOKEN_URI,
                       @Value("${auth.github.userUri}") String USER_URI,
                       UserRepository userRepository,
                       JwtUtils jwtUtils) {
        this.WEB_CLIENT_ID = WEB_CLIENT_ID;
        this.WEB_CLIENT_SECRET = WEB_CLIENT_SECRET;
        this.WEB_REDIRECT_URI = WEB_REDIRECT_URI;
        this.IOS_CLIENT_ID = IOS_CLIENT_ID;
        this.IOS_CLIENT_SECRET = IOS_CLIENT_SECRET;
        this.IOS_REDIRECT_URI = IOS_REDIRECT_URI;
        this.ACCESS_TOKEN_URI = ACCESS_TOKEN_URI;
        this.USER_URI = USER_URI;
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
    }

    public AuthJwt issueTokenForWeb(String code) {
        return issueToken(code, WEB_CLIENT_ID, WEB_CLIENT_SECRET, WEB_REDIRECT_URI);
    }

    public AuthJwt issueTokenForIos(String code) {
        return issueToken(code, IOS_CLIENT_ID, IOS_CLIENT_SECRET, IOS_REDIRECT_URI);
    }

    private AuthJwt issueToken(String code, String clientId, String clientSecret, String redirectUri) {
        RestTemplate request = new RestTemplate();
        AccessTokenResponse accessToken = getAccessToken(code, clientId, clientSecret, redirectUri, request)
                .orElseThrow(() -> new NotFoundException("요청 바디 없음"));
        logger.info("accessToken: {}", accessToken.getAccessToken());

        GithubUser githubUser = getUserFromOauth(accessToken, request)
                .orElseThrow(() -> new NotFoundException("요청 바디 없음"));

        User user = userRepository.findByGithub(githubUser.getLogin())
                .orElseThrow(() -> new NotFoundException("유저 없음"));

        return jwtUtils.getJwt(user);
    }

    private Optional<AccessTokenResponse> getAccessToken(String code, String clientId, String clientSecret, String redirectUri, RestTemplate restTemplate) {
        RequestEntity<AccessTokenRequest> request = RequestEntity
                .post(ACCESS_TOKEN_URI)
                .header("Accept", "application/json")
                .body(new AccessTokenRequest(clientId, clientSecret, code, redirectUri));

        ResponseEntity<AccessTokenResponse> response = restTemplate
                .exchange(request, AccessTokenResponse.class);

        return Optional.ofNullable(response.getBody());
    }

    private Optional<GithubUser> getUserFromOauth(AccessTokenResponse accessToken, RestTemplate gitHubRequest) {
        RequestEntity<Void> request = RequestEntity
                .get(USER_URI)
                .header("Accept", "application/json")
                .header("Authorization", "token " + accessToken.getAccessToken())
                .build();

        ResponseEntity<GithubUser> response = gitHubRequest
                .exchange(request, GithubUser.class);

        return Optional.ofNullable(response.getBody());
    }
}
