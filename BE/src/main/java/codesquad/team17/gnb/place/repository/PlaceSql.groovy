package codesquad.team17.gnb.place.repository

import codesquad.team17.gnb.place.dto.PlaceQueries

class PlaceSql {
    public static final String FIND_ALL = """
        SELECT
            place_id,
            place_name,
            image_url,
            city,
            district,
            address1,
            address2,
            latitude,
            longitude,
            `option`,
            additional_option,
            like_count,
            host_id,
            maximum_number_of_people,
            description,
            price             
        FROM place
"""

    public static final String FIND_BY_ID = FIND_ALL + """
        WHERE place_id=:id
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

    static String findBy(PlaceQueries placeQueries) {
        String SELECT_SQL = FIND_ALL + " WHERE maximum_number_of_people >= :people "

        if (placeQueries.minPrice != null) {
            SELECT_SQL += "AND price >= :minPrice "
        }

        if (placeQueries.maxPrice != null) {
            SELECT_SQL += "AND price <= :maxPrice "
        }

        if (placeQueries.district != null) {
            SELECT_SQL += "AND district LIKE :district "
        }

        if (placeQueries.checkIn != null || placeQueries.checkOut != null) {
            SELECT_SQL += """
            AND place_id NOT IN
            (
                SELECT place_id
                FROM reservation
                WHERE 1=0 
            """
            if (placeQueries.checkIn != null) {
                SELECT_SQL += "OR (check_in <= :checkIn AND check_out > :checkIn) "
            }

            if (placeQueries.checkOut != null) {
                SELECT_SQL += "OR (check_in < :checkOut AND check_out >= :checkOut) "
            }

            if (placeQueries.checkIn != null && placeQueries.checkOut != null) {
                SELECT_SQL += "OR (:checkIn <= check_in AND check_in < :checkOut) "
            }

            SELECT_SQL += ")"
        }

        return SELECT_SQL
    }
}
