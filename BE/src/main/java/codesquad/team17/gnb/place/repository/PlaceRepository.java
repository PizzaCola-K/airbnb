package codesquad.team17.gnb.place.repository;

import codesquad.team17.gnb.place.domain.Place;
import codesquad.team17.gnb.place.dto.PlaceQueries;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface PlaceRepository {

    Optional<Place> findById(Long id);

    List<Place> findBy(PlaceQueries placeQueries);

    List<Place> findAllByStayPeriod(LocalDate checkIn, LocalDate checkOut);

    void like(Long id);
}
