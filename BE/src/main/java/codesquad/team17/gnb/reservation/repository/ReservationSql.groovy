package codesquad.team17.gnb.reservation.repository

class ReservationSql {

    public static String INSERT = """
        INSERT INTO reservation 
        (place_id, guest_id, check_in, check_out, adult, child, infant, price)
        VALUES
        (:placeId, :guestId, :checkIn, :checkOut, :adult, :child, :infant, :price)
"""

    public static String RESERVATION_CHECK = """
        SELECT COUNT(place_id)
            FROM reservation
        WHERE place_id = :placeId
        AND (
                (check_in <= :checkIn AND check_out > :checkIn)
            OR
                (check_in < :checkOut AND check_out >= :checkOut)
            OR
                (:checkIn <= check_in AND check_in < :checkOut)
        ) 
"""
}
