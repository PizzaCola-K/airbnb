package codesquad.team17.gnb.like.repository;

import codesquad.team17.gnb.like.model.Like;

import java.util.Optional;

public interface LikeRepository {
    Like insert(Like like);

    Optional<Like> findByUserIdAndPlaceId(Long userId, Long placeId);

    void delete(Long userId, Long placeId);
}
