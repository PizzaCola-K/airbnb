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
            .id(rs.getLong("place_id"))
            .name(rs.getString("place_name"))
            .imageUrl(rs.getString("image_url"))
            .location(new Location.Builder()
                    .city(rs.getString("city"))
                    .district(rs.getString("district"))
                    .address1(rs.getString("address1"))
                    .address2(rs.getString("address2"))
                    .latitude(rs.getDouble("latitude"))
                    .longitude(rs.getDouble("longitude"))
                    .build())
            .option(new Option(rs.getString("option"),
                    rs.getString("additional_option")))
            .likeCount(rs.getInt("like_count"))
            .hostId(rs.getLong("host_id"))
            .maximumNumberOfPeople(rs.getInt("maximum_number_of_people"))
            .description(rs.getString("description"))
            .price(rs.getInt("price"))
            .build();

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public JdbcPlaceRepository(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }

    @Override
    public Optional<Place> findById(Long id) {
        SqlParameterSource namedParameters = new MapSqlParameterSource("id", id);
        List<Place> places = namedParameterJdbcTemplate.query(PlaceSql.FIND_BY_ID, namedParameters, PLACE_ROWMAPPER);

        if (places.isEmpty()) {
            return Optional.empty();
        }

        return Optional.of(places.get(0));
    }

    @Override
    public List<Place> findByPlaceQueries(PlaceQueries placeQueries) {
        SqlParameterSource namedParameters = setNamedParametersByPlaceQueries(placeQueries);

        return namedParameterJdbcTemplate.query(PlaceSql.findBy(placeQueries), namedParameters, PLACE_ROWMAPPER);
    }

    private SqlParameterSource setNamedParametersByPlaceQueries(PlaceQueries placeQueries) {
        return new MapSqlParameterSource()
                .addValue("people", placeQueries.sumOfPeople())
                .addValue("minPrice", placeQueries.getMinPrice())
                .addValue("maxPrice", placeQueries.getMaxPrice())
                .addValue("district", placeQueries.getDistrict() + "%")
                .addValue("checkIn", placeQueries.getCheckIn())
                .addValue("checkOut", placeQueries.getCheckOut());
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
