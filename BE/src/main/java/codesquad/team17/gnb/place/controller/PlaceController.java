package codesquad.team17.gnb.place.controller;

import codesquad.team17.gnb.place.dto.PlaceQueries;
import codesquad.team17.gnb.place.dto.PlaceSummary;
import codesquad.team17.gnb.place.service.PlaceService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/places")
public class PlaceController {

    private final PlaceService placeService;

    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }

    @GetMapping
    public List<PlaceSummary> placeSummaries(PlaceQueries placeQueries) {
        return placeService.placeSummaries(placeQueries);
    }
}
