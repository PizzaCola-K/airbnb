package codesquad.team17.gnb.place.service;

import codesquad.team17.gnb.place.repository.PlaceRepository;
import codesquad.team17.gnb.place.dto.PlaceQueries;
import codesquad.team17.gnb.place.dto.PlaceSummary;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaceService {

    private final PlaceRepository placeRepository;

    public PlaceService(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    public List<PlaceSummary> placeSummaries(PlaceQueries placeQueries) {
        return placeRepository.findByPlaceQueries(placeQueries).stream()
                .map(PlaceSummary::new)
                .collect(Collectors.toList());
    }

}
