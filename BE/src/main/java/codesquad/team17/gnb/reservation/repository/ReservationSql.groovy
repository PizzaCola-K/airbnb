package codesquad.team17.gnb.reservation.repository

class ReservationSql {

    public String INSERT = """
        INSERT INTO reservation 
        (place_id, check_in, check_out, adult, child, infant, price)
        VALUES
        (:placeId, :checkIn, :checkOut, :adult, :child, :infant, :price)
"""
}
