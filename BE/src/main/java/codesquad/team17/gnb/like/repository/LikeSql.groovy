package codesquad.team17.gnb.like.repository

class LikeSql {

    public static String INSERT = """
        INSERT INTO `like` 
            (user_id, place_id)
        VALUES
            (:userId, :placeId)
"""

    public static String findByUserIdAndPlaceId = "SELECT user_id, place_id FROM `like`" + WHERE_USER_ID_AND_PLACE_ID

    public static String DELETE = "DELETE FROM `like`" + WHERE_USER_ID_AND_PLACE_ID

    private static String WHERE_USER_ID_AND_PLACE_ID = " WHERE user_id=:userId AND place_id=:placeId"
}
