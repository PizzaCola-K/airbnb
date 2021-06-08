package codesquad.team17.gnb.exception;

public class BadRequest extends RuntimeException{
    public BadRequest(String message) {
        super(message);
    }

    public BadRequest(String message, Throwable cause) {
        super(message, cause);
    }
}
