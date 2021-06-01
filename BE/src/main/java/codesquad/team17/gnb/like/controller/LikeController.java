package codesquad.team17.gnb.like.controller;

import codesquad.team17.gnb.like.dto.LikeRequest;
import codesquad.team17.gnb.like.model.Like;
import codesquad.team17.gnb.like.service.LikeService;
import codesquad.team17.gnb.user.domain.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping
    public Like like(
            @RequestAttribute User user,
            @RequestBody LikeRequest likeRequest) {
        return likeService.like(user, likeRequest);
    }

}
