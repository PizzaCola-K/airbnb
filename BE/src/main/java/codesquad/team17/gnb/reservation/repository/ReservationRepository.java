package codesquad.team17.gnb.reservation.repository;

import codesquad.team17.gnb.reservation.dto.ReservationRequest;
import codesquad.team17.gnb.reservation.model.Reservation;

public interface ReservationRepository {

    Reservation insert(Reservation reservation);

    boolean canBeReserved(ReservationRequest reservationRequest);

}
