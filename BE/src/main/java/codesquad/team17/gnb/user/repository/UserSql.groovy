package codesquad.team17.gnb.user.repository

class UserSql {

    public static final String FIND_BY_GITHUB = """
        SELECT 
            user_id,
            github,
            host,
            admin
        FROM
            `user`
        WHERE
            github = :github
"""
    public static final String INSERT = """
        INSERT INTO
            `user`
        (github)
        VALUES (:github);
"""

}
