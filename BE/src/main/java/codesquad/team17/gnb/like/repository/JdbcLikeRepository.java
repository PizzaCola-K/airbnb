package codesquad.team17.gnb.like.repository;

import codesquad.team17.gnb.like.model.Like;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class JdbcLikeRepository implements LikeRepository{

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public JdbcLikeRepository(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }

    @Override
    public Like insert(Like like) {
        SqlParameterSource sqlParameterSource = getUserIdAndPlaceIdParameter(like.getUserId(), like.getPlaceId());

        namedParameterJdbcTemplate.update(LikeSql.INSERT, sqlParameterSource);

        return like;
    }

    @Override
    public Optional<Like> findByUserIdAndPlaceId(Long userId, Long placeId) {
        SqlParameterSource sqlParameterSource = getUserIdAndPlaceIdParameter(userId, placeId);

        return namedParameterJdbcTemplate.query(LikeSql.findByUserIdAndPlaceId, sqlParameterSource,
                (rs, rowNum) -> new Like(rs.getLong("user_id"), rs.getLong("place_id"))).stream()
                .findFirst();
    }

    private SqlParameterSource getUserIdAndPlaceIdParameter(Long userId, Long placeId) {
        return new MapSqlParameterSource()
                .addValue("userId", userId)
                .addValue("placeId", placeId);
    }
}
