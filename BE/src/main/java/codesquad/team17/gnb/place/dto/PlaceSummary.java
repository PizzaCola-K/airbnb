package codesquad.team17.gnb.place.dto;

import codesquad.team17.gnb.place.domain.Place;

public class PlaceSummary {
    private final Long id;
    private final String imageUrl;
    private final LocationDto location;
    private final String name;
    private final OptionDto options;
    private final int maximumNumberOfPeople;
    private final int likeCount;
    private final boolean isLike;
    private final int price;

    public PlaceSummary(Place place) {
        this.id = place.getId();
        this.imageUrl = place.getImageUrl();
        this.location = new LocationDto(place.getLocation());
        this.name = place.getName();
        this.options = new OptionDto(place.getOption());
        this.maximumNumberOfPeople = place.getMaximumNumberOfPeople();
        this.likeCount = place.getLikeCount();
        this.isLike = place.isLike();
        this.price = place.getPrice();
    }

    public Long getId() {
        return id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public LocationDto getLocation() {
        return location;
    }

    public String getName() {
        return name;
    }

    public String getOption() {
        return "최대 " + maximumNumberOfPeople + "명 · " + options.getRooms();
    }

    public String getAdditionalOption() {
        return options.getAdditional();
    }

    public int getLikeCount() {
        return likeCount;
    }

    public boolean isLike() {
        return isLike;
    }

    public int getPrice() {
        return price;
    }
}
