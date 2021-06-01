package codesquad.team17.gnb.reservation.dto;

import codesquad.team17.gnb.reservation.model.Reservation;

import java.time.LocalDate;

public class ReservationDto {
    private final Long id;
    private final Long placeId;
    private final Long guestId;
    private final LocalDate checkIn;
    private final LocalDate checkOut;
    private final int adult;
    private final int child;
    private final int infant;
    private final int price;

    public ReservationDto(Reservation reservation) {
        this.id = reservation.getId();
        this.placeId = reservation.getPlaceId();
        this.guestId = reservation.getGuestId();
        this.checkIn = reservation.getCheckIn();
        this.checkOut = reservation.getCheckOut();
        this.adult = reservation.getAdult();
        this.child = reservation.getChild();
        this.infant = reservation.getInfant();
        this.price = reservation.getPrice();
    }

    public Long getId() {
        return id;
    }

    public Long getPlaceId() {
        return placeId;
    }

    public Long getGuestId() {
        return guestId;
    }

    public LocalDate getCheckIn() {
        return checkIn;
    }

    public LocalDate getCheckOut() {
        return checkOut;
    }

    public int getAdult() {
        return adult;
    }

    public int getChild() {
        return child;
    }

    public int getInfant() {
        return infant;
    }

    public int getPrice() {
        return price;
    }
}
