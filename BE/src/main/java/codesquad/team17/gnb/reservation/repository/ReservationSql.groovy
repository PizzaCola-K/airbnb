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
    public static String FIND_BY_USER_ID = """
        SELECT
            r.reservation_id,
            r.check_in,
            r.check_out,
            r.adult,
            r.child,
            r.infant,
            r.price,
            p.place_id,
            p.image_url,
            p.place_name,
            p.city,
            p.district,
            p.address1,
            p.address2,
            p.host_id,
            u.github
        FROM reservation r
        JOIN place p ON r.place_id = p.place_id AND r.guest_id = :userId
        JOIN user u ON p.host_id = u.user_id
"""
    public static String FIND_BY_ID_AND_USER_ID = """
        SELECT reservation_id FROM reservation WHERE reservation_id = :reservationId AND guest_id = :guestId
"""
    public static String DELETE_BY_ID = "DELETE FROM reservation WHERE reservation_id = :reservationId"
}
