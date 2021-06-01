package codesquad.team17.gnb.reservation.repository;

import codesquad.team17.gnb.reservation.dto.ReservationRequest;
import codesquad.team17.gnb.reservation.model.Reservation;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.sql.Date;

@Repository
public class JdbcReservationRepository implements ReservationRepository {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public JdbcReservationRepository(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }

    @Override
    public Reservation insert(Reservation reservation) {
        SqlParameterSource namedParameters = getSqlParameterSourceFromReservation(reservation);
        KeyHolder keyHolder = new GeneratedKeyHolder();
        namedParameterJdbcTemplate.update(ReservationSql.INSERT, namedParameters, keyHolder);
        return reservation.withId(keyHolder.getKeyAs(BigInteger.class).longValue());
    }

    @Override
    public boolean canBeReserved(ReservationRequest reservationRequest) {
        SqlParameterSource namedParameters = getSqlParameterSourceFromReservationRequest(reservationRequest);
        return namedParameterJdbcTemplate
                .queryForObject(ReservationSql.RESERVATION_CHECK, namedParameters, Integer.class) == 0;
    }

    private SqlParameterSource getSqlParameterSourceFromReservation(Reservation reservation) {
        return new MapSqlParameterSource()
                .addValue("placeId", reservation.getPlaceId())
                .addValue("guestId", reservation.getGuestId())
                .addValue("checkIn", Date.valueOf(reservation.getCheckIn()))
                .addValue("checkOut", Date.valueOf(reservation.getCheckOut()))
                .addValue("adult", reservation.getAdult())
                .addValue("child", reservation.getChild())
                .addValue("infant", reservation.getInfant())
                .addValue("price", reservation.getPrice());
    }

    private SqlParameterSource getSqlParameterSourceFromReservationRequest(ReservationRequest reservationRequest) {
        return new MapSqlParameterSource()
                .addValue("placeId", reservationRequest.getPlaceId())
                .addValue("checkIn", reservationRequest.getCheckIn())
                .addValue("checkOut", reservationRequest.getCheckOut());
    }
}
