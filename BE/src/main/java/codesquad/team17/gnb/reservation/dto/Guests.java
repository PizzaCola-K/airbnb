package codesquad.team17.gnb.reservation.dto;

public class Guests {
    private final int adult;
    private final int child;
    private final int infant;

    public Guests(int adult, int child, int infant) {
        this.adult = adult;
        this.child = child;
        this.infant = infant;
    }

    public int getAdult() {
        return adult;
    }

    public int getChild() {
        return child;
    }

    public int getInfant() {
        return infant;
    }
}
