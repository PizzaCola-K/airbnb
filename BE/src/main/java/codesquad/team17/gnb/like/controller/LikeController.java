package codesquad.team17.gnb.like.controller;

import codesquad.team17.gnb.like.dto.LikeRequest;
import codesquad.team17.gnb.like.model.Like;
import codesquad.team17.gnb.like.service.LikeService;
import codesquad.team17.gnb.place.dto.PlaceSummary;
import codesquad.team17.gnb.user.domain.User;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @GetMapping
    public List<PlaceSummary> getLikesPlaces(@RequestAttribute User user) {
        return likeService.getLikesPlaces(user);
    }

    @PostMapping
    public Like like(
            @RequestAttribute User user,
            @RequestBody LikeRequest likeRequest) {
        return likeService.like(user, likeRequest);
    }

    @DeleteMapping("/{placeId}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteLike (
            @RequestAttribute User user,
            @PathVariable Long placeId ) {
        likeService.delete(user, placeId);
    }

}
