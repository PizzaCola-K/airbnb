package codesquad.team17.gnb.reservation.service;

import codesquad.team17.gnb.exception.BadRequest;
import codesquad.team17.gnb.exception.NotFoundException;
import codesquad.team17.gnb.place.domain.Place;
import codesquad.team17.gnb.place.repository.PlaceRepository;
import codesquad.team17.gnb.reservation.dto.ReservationRequest;
import codesquad.team17.gnb.reservation.dto.ReservationResult;
import codesquad.team17.gnb.reservation.model.Reservation;
import codesquad.team17.gnb.reservation.repository.ReservationRepository;
import codesquad.team17.gnb.user.domain.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final PlaceRepository placeRepository;

    public ReservationService(ReservationRepository reservationRepository, PlaceRepository placeRepository) {
        this.reservationRepository = reservationRepository;
        this.placeRepository = placeRepository;
    }

    @Transactional
    public Reservation reserve(User user, ReservationRequest reservationRequest) {
        Place place = placeRepository.findById(reservationRequest.getPlaceId(), user.getId())
                .orElseThrow(() -> new NotFoundException("장소 없음"));

        place.checkNumberOfPeople(reservationRequest);

        if (!reservationRepository.canBeReserved(reservationRequest)) {
            throw new BadRequest("다른 예약이 있음");
        }

        Reservation reservation = new Reservation.Builder()
                .placeId(reservationRequest.getPlaceId())
                .guestId(user.getId())
                .checkIn(reservationRequest.getCheckIn())
                .checkOut(reservationRequest.getCheckOut())
                .adult(reservationRequest.getAdult())
                .child(reservationRequest.getChild())
                .infant(reservationRequest.getInfant())
                .price(place.calculateTotalPrice(reservationRequest))
                .build();

        return reservationRepository.insert(reservation);
    }

    public List<ReservationResult> reservations(User user) {
        return reservationRepository.findByUserId(user.getId());
    }

    public void cancel(User user, Long reservationId) {
        reservationRepository.findByIdAndUserId(reservationId, user.getId())
                .orElseThrow(() -> new NotFoundException("예약 없음"));

        reservationRepository.deleteById(reservationId);
    }
}
