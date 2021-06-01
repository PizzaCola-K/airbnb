package codesquad.team17.gnb.reservation.repository;

import codesquad.team17.gnb.reservation.dto.*;
import codesquad.team17.gnb.reservation.model.Reservation;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
public class JdbcReservationRepository implements ReservationRepository {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public JdbcReservationRepository(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }

    @Override
    public Reservation insert(Reservation reservation) {
        SqlParameterSource namedParameters = new MapSqlParameterSource()
                .addValue("placeId", reservation.getPlaceId())
                .addValue("guestId", reservation.getGuestId())
                .addValue("checkIn", Date.valueOf(reservation.getCheckIn()))
                .addValue("checkOut", Date.valueOf(reservation.getCheckOut()))
                .addValue("adult", reservation.getAdult())
                .addValue("child", reservation.getChild())
                .addValue("infant", reservation.getInfant())
                .addValue("price", reservation.getPrice());

        KeyHolder keyHolder = new GeneratedKeyHolder();
        namedParameterJdbcTemplate.update(ReservationSql.INSERT, namedParameters, keyHolder);
        return reservation.withId(keyHolder.getKeyAs(BigInteger.class).longValue());
    }

    @Override
    public boolean canBeReserved(ReservationRequest reservationRequest) {
        SqlParameterSource namedParameters = new MapSqlParameterSource()
                .addValue("placeId", reservationRequest.getPlaceId())
                .addValue("checkIn", reservationRequest.getCheckIn())
                .addValue("checkOut", reservationRequest.getCheckOut());

        return namedParameterJdbcTemplate
                .queryForObject(ReservationSql.RESERVATION_CHECK, namedParameters, Integer.class) == 0;
    }

    @Override
    public List<ReservationResult> findByUserId(Long userId) {
        SqlParameterSource namedParameters = new MapSqlParameterSource()
                .addValue("userId", userId);

        return namedParameterJdbcTemplate.query(ReservationSql.FIND_BY_USER_ID, namedParameters, RESERVATION_RESULT_ROW_MAPPER);
    }

    @Override
    public Optional<Reservation> findByIdAndUserId(Long reservationId, Long userId) {
        SqlParameterSource namedParameters = new MapSqlParameterSource()
                .addValue("reservationId", reservationId)
                .addValue("guestId", userId);
        return namedParameterJdbcTemplate.query(ReservationSql.FIND_BY_ID_AND_USER_ID, namedParameters, (rs, rowNum) -> new Reservation.Builder()
                .id(rs.getLong("reservation_id")).build()
        ).stream().findFirst();
    }

    @Override
    public void deleteById(Long reservationId) {
        SqlParameterSource namedParameters = new MapSqlParameterSource()
                .addValue("reservationId", reservationId);
        namedParameterJdbcTemplate.update(ReservationSql.DELETE_BY_ID, namedParameters);
    }

    private static final RowMapper<ReservationResult> RESERVATION_RESULT_ROW_MAPPER = (rs, rowNum) -> {
        ReservedPlaceLocation location = new ReservedPlaceLocation(
                rs.getString("city"),
                rs.getString("district"),
                rs.getString("address1"),
                rs.getString("address2")
        );
        ReservedPlaceInformation place = new ReservedPlaceInformation(
                rs.getLong("place_id"),
                rs.getString("image_url"),
                rs.getString("place_name"),
                location,
                rs.getString("github")
        );

        Guests guests = new Guests(
                rs.getInt("adult"),
                rs.getInt("child"),
                rs.getInt("infant")
        );

        return new ReservationResult(
                rs.getLong("reservation_id"),
                rs.getDate("check_in").toLocalDate(),
                rs.getDate("check_out").toLocalDate(),
                guests,
                rs.getInt("price"),
                place
        );
    };
}
