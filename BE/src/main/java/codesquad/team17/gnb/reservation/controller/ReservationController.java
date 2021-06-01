package codesquad.team17.gnb.reservation.controller;

import codesquad.team17.gnb.reservation.dto.ReservationRequest;
import codesquad.team17.gnb.reservation.dto.ReservationResult;
import codesquad.team17.gnb.reservation.model.Reservation;
import codesquad.team17.gnb.reservation.service.ReservationService;
import codesquad.team17.gnb.user.domain.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public Reservation reserve(
            @RequestAttribute User user,
            @RequestBody ReservationRequest reservationRequest) {
        return reservationService.reserve(user, reservationRequest);
    }

    @GetMapping
    public List<ReservationResult> reservations(@RequestAttribute User user) {
        return reservationService.reservations(user);
    }
}
