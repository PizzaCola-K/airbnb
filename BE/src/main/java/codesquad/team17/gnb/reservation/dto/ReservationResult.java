package codesquad.team17.gnb.reservation.dto;

import java.time.LocalDate;

public class ReservationResult {
    private final Long reservationId;
    private final LocalDate checkIn;
    private final LocalDate checkOut;
    private final Guests guests;
    private final int price;
    private final ReservedPlaceInformation place;

    public ReservationResult(Long reservationId, LocalDate checkIn, LocalDate checkOut, Guests guests, int price, ReservedPlaceInformation place) {
        this.reservationId = reservationId;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.guests = guests;
        this.price = price;
        this.place = place;
    }

    public Long getReservationId() {
        return reservationId;
    }

    public LocalDate getCheckIn() {
        return checkIn;
    }

    public LocalDate getCheckOut() {
        return checkOut;
    }

    public Guests getGuests() {
        return guests;
    }

    public int getPrice() {
        return price;
    }

    public ReservedPlaceInformation getPlace() {
        return place;
    }
}
