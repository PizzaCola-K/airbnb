package codesquad.team17.gnb.user.repository;

import codesquad.team17.gnb.user.domain.User;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class JdbcUserRepository implements UserRepository {

    private static final RowMapper<User> USER_ROW_MAPPER = (rs, rowNum) -> User.of(
            rs.getLong("user_id"),
            rs.getString("github"),
            rs.getBoolean("host"),
            rs.getBoolean("admin")
    );

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public JdbcUserRepository(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }

    @Override
    public Optional<User> findByGithub(String github) {
        SqlParameterSource namedParameters = new MapSqlParameterSource("github", github);
        List<User> users = namedParameterJdbcTemplate.query(UserSql.FIND_BY_GITHUB, namedParameters, USER_ROW_MAPPER);

        if (users.isEmpty()) {
            return Optional.empty();
        }

        return Optional.of(users.get(0));
    }

    @Override
    public User insert(User user) {
        SqlParameterSource namedParameters = new MapSqlParameterSource("github", user.getGithub());
        KeyHolder keyHolder = new GeneratedKeyHolder();
        namedParameterJdbcTemplate.update(UserSql.INSERT, namedParameters, keyHolder);
        return user.withId(keyHolder.getKeyAs(Long.class));
    }
}
