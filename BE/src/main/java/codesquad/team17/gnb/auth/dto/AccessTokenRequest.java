package codesquad.team17.gnb.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AccessTokenRequest {

    private final String clientId;
    private final String clientSecret;
    private final String code;
    private final String redirectUri;

    public AccessTokenRequest(String clientId, String clientSecret, String code, String redirectUri) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.code = code;
        this.redirectUri = redirectUri;
    }

    @JsonProperty("client_id")
    public String getClientId() {
        return clientId;
    }

    @JsonProperty("client_secret")
    public String getClientSecret() {
        return clientSecret;
    }


    @JsonProperty("code")
    public String getCode() {
        return code;
    }

    @JsonProperty("redirect_uri")
    public String getRedirectUri() {
        return redirectUri;
    }
}
