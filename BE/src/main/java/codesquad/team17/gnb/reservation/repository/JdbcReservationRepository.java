package codesquad.team17.gnb.reservation.repository;

import codesquad.team17.gnb.reservation.model.Reservation;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class JdbcReservationRepository implements ReservationRepository{

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public JdbcReservationRepository(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }


    @Override
    public Reservation insert(Reservation reservation) {
        return null;
    }
}
