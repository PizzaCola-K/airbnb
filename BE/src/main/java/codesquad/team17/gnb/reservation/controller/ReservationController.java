package codesquad.team17.gnb.reservation.controller;

import codesquad.team17.gnb.reservation.dto.ReservationDto;
import codesquad.team17.gnb.reservation.dto.ReservationRequest;
import codesquad.team17.gnb.reservation.model.Reservation;
import codesquad.team17.gnb.user.domain.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {

    private final Logger logger = LoggerFactory.getLogger(ReservationController.class);

    @PostMapping
    public ReservationRequest reserve(
            @RequestAttribute User user,
            @RequestBody ReservationRequest reservationRequest) {
        logger.info("user: {}",user.getGithub());
        return reservationRequest;
    }
}
