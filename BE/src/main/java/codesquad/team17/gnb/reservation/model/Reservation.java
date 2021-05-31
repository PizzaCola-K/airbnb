package codesquad.team17.gnb.reservation.model;

import java.time.LocalDate;

public class Reservation {
    private final Long id;
    private final Long placeId;
    private final Long guestId;
    private final LocalDate checkIn;
    private final LocalDate checkOut;
    private final int adult;
    private final int child;
    private final int infant;
    private final int price;

    public Reservation(Builder builder) {
        this.id = builder.id;
        this.placeId = builder.placeId;
        this.guestId = builder.guestId;
        this.checkIn = builder.checkIn;
        this.checkOut = builder.checkOut;
        this.adult = builder.adult;
        this.child = builder.child;
        this.infant = builder.infant;
        this.price = builder.price;
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

    public Reservation withId(Long id) {
        return new Builder()
                .id(id)
                .placeId(this.placeId)
                .guestId(this.guestId)
                .checkIn(this.checkIn)
                .checkOut(this.checkOut)
                .adult(this.adult)
                .child(this.child)
                .infant(this.infant)
                .price(this.price)
                .build();
    }

    public static class Builder {
        private Long id;
        private Long placeId;
        private Long guestId;
        private LocalDate checkIn;
        private LocalDate checkOut;
        private int adult;
        private int child;
        private int infant;
        private int price;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder placeId(Long placeId) {
            this.placeId = placeId;
            return this;
        }

        public Builder guestId(Long guestId) {
            this.guestId = guestId;
            return this;
        }

        public Builder checkIn(LocalDate checkIn) {
            this.checkIn = checkIn;
            return this;
        }

        public Builder checkOut(LocalDate checkOut) {
            this.checkOut = checkOut;
            return this;
        }

        public Builder adult(int adult) {
            this.adult = adult;
            return this;
        }

        public Builder child(int child) {
            this.child = child;
            return this;
        }

        public Builder infant(int infant) {
            this.infant = infant;
            return this;
        }

        public Builder price(int price) {
            this.price = price;
            return this;
        }

        public Reservation build() {
            return new Reservation(this);
        }
    }
}
