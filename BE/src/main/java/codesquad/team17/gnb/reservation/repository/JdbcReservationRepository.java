package codesquad.team17.gnb.reservation.repository;

import codesquad.team17.gnb.reservation.model.Reservation;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class JdbcReservationRepository implements ReservationRepository {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public JdbcReservationRepository(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }

    @Override
    public Reservation insert(Reservation reservation) {
        SqlParameterSource namedParameters = getSqlParameterSource(reservation);
        KeyHolder keyHolder = new GeneratedKeyHolder();
        namedParameterJdbcTemplate.update(ReservationSql.INSERT, namedParameters, keyHolder);
        return reservation.withId(keyHolder.getKeyAs(Long.class));
    }

    private SqlParameterSource getSqlParameterSource(Reservation reservation) {
        return new MapSqlParameterSource()
                .addValue("placeId", reservation.getPlaceId())
                .addValue("guestId", reservation.getGuestId())
                .addValue("checkIn", reservation.getCheckIn())
                .addValue("checkOut", reservation.getCheckOut())
                .addValue("adult", reservation.getAdult())
                .addValue("child", reservation.getChild())
                .addValue("infant", reservation.getInfant())
                .addValue("price", reservation.getPrice());
    }
}
