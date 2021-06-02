package codesquad.team17.gnb.place.repository

import codesquad.team17.gnb.place.dto.PlaceQueries

class PlaceSql {
    public static final String FIND_ALL = """
        SELECT
            p.place_id,
            p.place_name,
            p.image_url,
            p.city,
            p.district,
            p.address1,
            p.address2,
            p.latitude,
            p.longitude,
            p.`option`,
            p.additional_option,
            p.like_count,
            p.host_id,
            p.maximum_number_of_people,
            p.description,
            p.price,
            l.user_id             
        FROM place p LEFT JOIN `like` l ON p.place_id = l.place_id AND l.user_id = :userId 
"""

    public static final String FIND_BY_ID = FIND_ALL + """
        WHERE p.place_id=:id
"""

    public static final String FIND_ALL_BY_STAY_PERIOD = FIND_ALL + RESERVATION_CHECK

    private static final String RESERVATION_CHECK = """
        WHERE place_id NOT IN
        (
            SELECT place_id
            FROM reservation
            WHERE
                (check_in <= :checkIn AND check_out > :checkIn)
            OR
                (check_in < :checkOut AND check_out >= :checkOut)
            OR
                (:checkIn <= check_in AND check_in < :checkOut)  
        ) 
"""

    public static String LIKE_COUNT_UP = "UPDATE place SET like_count = like_count + 1 WHERE place_id = :placeId"
    public static String LIKE_COUNT_DOWN = "UPDATE place SET like_count = like_count - 1 WHERE place_id = :placeId"

    static String findByPlaceQueries(PlaceQueries placeQueries) {
        String SELECT_SQL = FIND_ALL

        if (placeQueries.checkIn != null || placeQueries.checkOut != null) {
            SELECT_SQL += """
            LEFT JOIN reservation r on p.place_id = r.place_id AND ( 1 = 0
            """
            if (placeQueries.checkIn != null) {
                SELECT_SQL += "OR (r.check_in <= :checkIn AND r.check_out > :checkIn) "
            }

            if (placeQueries.checkOut != null) {
                SELECT_SQL += "OR (r.check_in < :checkOut AND r.check_out >= :checkOut) "
            }

            if (placeQueries.checkIn != null && placeQueries.checkOut != null) {
                SELECT_SQL += "OR (:checkIn <= r.check_in AND r.check_in < :checkOut) "
            }

            SELECT_SQL += ")"
        }

        SELECT_SQL += """
                WHERE p.maximum_number_of_people >= :people
        """

        if (placeQueries.minPrice != null) {
            SELECT_SQL += "AND p.price >= :minPrice "
        }

        if (placeQueries.maxPrice != null) {
            SELECT_SQL += "AND p.price <= :maxPrice "
        }

        if (placeQueries.district != null) {
            SELECT_SQL += "AND p.district LIKE :district "
        }

        if (placeQueries.checkIn != null || placeQueries.checkOut != null) {
            SELECT_SQL += "AND r.reservation_id is null "
        }

        return SELECT_SQL
    }
}
