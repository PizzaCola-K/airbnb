package codesquad.team17.gnb.place.repository;

import codesquad.team17.gnb.place.domain.Location;
import codesquad.team17.gnb.place.domain.Option;
import codesquad.team17.gnb.place.domain.Place;
import codesquad.team17.gnb.place.dto.PlaceQueries;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public class JdbcPlaceRepository implements PlaceRepository {

    private static final RowMapper<Place> PLACE_ROWMAPPER = (rs, rowNum) -> new Place.Builder()
            .id(rs.getLong("p.place_id"))
            .name(rs.getString("p.place_name"))
            .imageUrl(rs.getString("p.image_url"))
            .location(new Location.Builder()
                    .city(rs.getString("p.city"))
                    .district(rs.getString("p.district"))
                    .address1(rs.getString("p.address1"))
                    .address2(rs.getString("p.address2"))
                    .latitude(rs.getDouble("p.latitude"))
                    .longitude(rs.getDouble("p.longitude"))
                    .build())
            .option(new Option(rs.getString("p.option"),
                    rs.getString("p.additional_option")))
            .likeCount(rs.getInt("p.like_count"))
            .isLike(rs.getObject("l.user_id") != null)
            .hostId(rs.getLong("p.host_id"))
            .maximumNumberOfPeople(rs.getInt("p.maximum_number_of_people"))
            .description(rs.getString("p.description"))
            .price(rs.getInt("p.price"))
            .build();

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public JdbcPlaceRepository(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }

    @Override
    public Optional<Place> findById(Long id, Long loggedInUserId) {
        SqlParameterSource namedParameters = new MapSqlParameterSource("id", id)
                .addValue("userId", loggedInUserId);

        return namedParameterJdbcTemplate.queryForStream(PlaceSql.FIND_BY_ID, namedParameters, PLACE_ROWMAPPER)
                .findFirst();
    }

    @Override
    public List<Place> findByPlaceQueries(PlaceQueries placeQueries, Long loggedInUserId) {
        SqlParameterSource namedParameters = setNamedParametersByPlaceQueries(placeQueries, loggedInUserId);

        return namedParameterJdbcTemplate.query(PlaceSql.findByPlaceQueries(placeQueries), namedParameters, PLACE_ROWMAPPER);
    }

    private SqlParameterSource setNamedParametersByPlaceQueries(PlaceQueries placeQueries, Long loggedInUserId) {
        return new MapSqlParameterSource()
                .addValue("people", placeQueries.sumOfPeople())
                .addValue("minPrice", placeQueries.getMinPrice())
                .addValue("maxPrice", placeQueries.getMaxPrice())
                .addValue("district", placeQueries.getDistrict() + "%")
                .addValue("checkIn", placeQueries.getCheckIn())
                .addValue("checkOut", placeQueries.getCheckOut())
                .addValue("userId", loggedInUserId);
    }

    @Override
    public List<Place> findAllByStayPeriod(LocalDate checkIn, LocalDate checkOut) {
        SqlParameterSource namedParameters = new MapSqlParameterSource()
                .addValue("checkIn", Date.valueOf(checkIn))
                .addValue("checkOut", Date.valueOf(checkOut));

        return namedParameterJdbcTemplate.query(
                PlaceSql.FIND_ALL_BY_STAY_PERIOD, namedParameters, PLACE_ROWMAPPER
        );
    }

    @Override
    public void like(Long id) {
        SqlParameterSource namedParameters = new MapSqlParameterSource()
                .addValue("placeId", id);

        namedParameterJdbcTemplate.update(PlaceSql.LIKE_COUNT_UP, namedParameters);
    }

    @Override
    public void dislike(Long id) {
        SqlParameterSource namedParameters = new MapSqlParameterSource()
                .addValue("placeId", id);

        namedParameterJdbcTemplate.update(PlaceSql.LIKE_COUNT_DOWN, namedParameters);
    }

}
