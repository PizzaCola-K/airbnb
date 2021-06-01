package codesquad.team17.gnb.like.repository

class LikeSql {

    public static String INSERT = """
        INSERT INTO `like` 
            (user_id, place_id)
        VALUES
            (:userId, :placeId)
"""

    public static String findByUserIdAndPlaceId = """
        SELECT user_id, place_id FROM `like` WHERE user_id=:userId AND place_id=:placeId
"""
}
