package codesquad.team17.gnb.exception;

public class NoAuthorizationException extends RuntimeException {
    public NoAuthorizationException(String message) {
        super(message);
    }

    public NoAuthorizationException(String message, Throwable cause) {
        super(message, cause);
    }
}
