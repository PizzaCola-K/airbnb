package codesquad.team17.gnb.auth.dto;

public class AuthJwt {

    public static String tokenType = "Bearer";
    public String jwt;

    public AuthJwt(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return jwt;
    }

    public String getTokenType() {
        return tokenType;
    }
}
