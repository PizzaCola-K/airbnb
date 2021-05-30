package codesquad.team17.gnb.reservation.model;

import java.time.LocalDate;

public class Reservation {
    private Long id;
    private Long placeId;
    private Long guestId;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private int adult;
    private int child;
    private int infant;
    private int price;

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
