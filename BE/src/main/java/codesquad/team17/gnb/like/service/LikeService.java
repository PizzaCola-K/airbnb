package codesquad.team17.gnb.like.service;

import codesquad.team17.gnb.exception.NotFoundException;
import codesquad.team17.gnb.like.dto.LikeRequest;
import codesquad.team17.gnb.like.model.Like;
import codesquad.team17.gnb.like.repository.LikeRepository;
import codesquad.team17.gnb.place.repository.PlaceRepository;
import codesquad.team17.gnb.user.domain.User;
import org.springframework.stereotype.Service;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final PlaceRepository placeRepository;

    public LikeService(LikeRepository likeRepository, PlaceRepository placeRepository) {
        this.likeRepository = likeRepository;
        this.placeRepository = placeRepository;
    }

    public Like like(User user, LikeRequest likeRequest) {
        placeRepository.findById(likeRequest.getPlaceId()).orElseThrow(() -> new NotFoundException("숙소 없음"));

        likeRepository.findByUserIdAndPlaceId(user.getId(), likeRequest.getPlaceId()).ifPresent(like -> {
            //TODO: 예외처리
            throw new RuntimeException("이미 좋아요를 추가함");
        });

        Like like = new Like(user.getId(), likeRequest.getPlaceId());
        return likeRepository.insert(like);
    }
}
