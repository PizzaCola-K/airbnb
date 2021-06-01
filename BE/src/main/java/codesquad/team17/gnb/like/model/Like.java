package codesquad.team17.gnb.like.model;

public class Like {

    private final Long userId;
    private final Long placeId;

    public Like(Long userId, Long placeId) {
        this.userId = userId;
        this.placeId = placeId;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getPlaceId() {
        return placeId;
    }
}
