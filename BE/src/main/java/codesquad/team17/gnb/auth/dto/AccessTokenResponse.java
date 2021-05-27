package codesquad.team17.gnb.auth.dto;

import com.fasterxml.jackson.annotation.JsonSetter;

public class AccessTokenResponse {
    private String accessToken;
    private String tokenType;
    private String scope;

    public AccessTokenResponse() {
    }

    public String getAccessToken() {
        return accessToken;
    }

    @JsonSetter("access_token")
    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    @JsonSetter("token_type")
    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public String getScope() {
        return scope;
    }

    @JsonSetter("scope")
    public void setScope(String scope) {
        this.scope = scope;
    }
}
