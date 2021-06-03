package codesquad.team17.gnb.exception;

import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NoAuthorizationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse errorResponse(NoAuthorizationException exception) {
        return new ErrorResponse(exception.getMessage());
    }

    @ExceptionHandler({BadRequest.class, JWTVerificationException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse errorResponse(RuntimeException exception) {
        return new ErrorResponse(exception.getMessage());
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse errorResponse(NotFoundException exception) {
        return new ErrorResponse(exception.getMessage());
    }

}
