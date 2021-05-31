package codesquad.team17.gnb.reservation.repository

class ReservationSql {

    public static String INSERT = """
        INSERT INTO reservation 
        (place_id, guest_id, check_in, check_out, adult, child, infant, price)
        VALUES
        (:placeId, :guestId, :checkIn, :checkOut, :adult, :child, :infant, :price)
"""
}
