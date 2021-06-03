package codesquad.team17.gnb.like.service;

import codesquad.team17.gnb.exception.NotFoundException;
import codesquad.team17.gnb.like.dto.LikeRequest;
import codesquad.team17.gnb.like.model.Like;
import codesquad.team17.gnb.like.repository.LikeRepository;
import codesquad.team17.gnb.place.dto.PlaceSummary;
import codesquad.team17.gnb.place.repository.PlaceRepository;
import codesquad.team17.gnb.user.domain.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final PlaceRepository placeRepository;

    public LikeService(LikeRepository likeRepository, PlaceRepository placeRepository) {
        this.likeRepository = likeRepository;
        this.placeRepository = placeRepository;
    }

    @Transactional
    public Like like(User user, LikeRequest likeRequest) {
        Long placeId = likeRequest.getPlaceId();
        Long userId = user.getId();
        placeRepository.findById(placeId, userId).orElseThrow(() -> new NotFoundException("숙소 없음"));

        likeRepository.findByUserIdAndPlaceId(userId, likeRequest.getPlaceId()).ifPresent(like -> {
            //TODO: 예외처리
            throw new RuntimeException("이미 좋아요를 추가함");
        });

        placeRepository.like(placeId);
        Like like = new Like(userId, placeId);
        return likeRepository.insert(like);
    }

    @Transactional
    public void delete(User user, Long placeId) {
        Long userId = user.getId();

        placeRepository.findById(placeId, userId).orElseThrow(() -> new NotFoundException("숙소 없음"));
        likeRepository.findByUserIdAndPlaceId(userId, placeId).orElseThrow(() -> new NotFoundException("좋아요 없음"));

        placeRepository.dislike(placeId);
        likeRepository.delete(userId, placeId);
    }

    public List<PlaceSummary> getLikesPlaces(User user) {
        return placeRepository.findLikesPlacesByUserId(user.getId())
                .map(PlaceSummary::new)
                .collect(Collectors.toList());
    }
}
