package codesquad.team17.gnb.reservation.dto;

public class ReservedPlaceInformation {

    private final Long placeId;
    private final String imageUrl;
    private final String name;
    private final ReservedPlaceLocation location;
    private final String hostGithub;

    public ReservedPlaceInformation(Long placeId, String imageUrl, String name, ReservedPlaceLocation location, String hostGithub) {
        this.placeId = placeId;
        this.imageUrl = imageUrl;
        this.name = name;
        this.location = location;
        this.hostGithub = hostGithub;
    }

    public Long getPlaceId() {
        return placeId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getName() {
        return name;
    }

    public ReservedPlaceLocation getLocation() {
        return location;
    }

    public String getHostGithub() {
        return hostGithub;
    }
}
