package codesquad.team17.gnb.reservation.dto;

public class ReservedPlaceLocation {
    private final String city;
    private final String district;
    private final String address1;
    private final String address2;

    public ReservedPlaceLocation(String city, String district, String address1, String address2) {
        this.city = city;
        this.district = district;
        this.address1 = address1;
        this.address2 = address2;
    }

    public String getCity() {
        return city;
    }

    public String getDistrict() {
        return district;
    }

    public String getAddress1() {
        return address1;
    }

    public String getAddress2() {
        return address2;
    }
}
