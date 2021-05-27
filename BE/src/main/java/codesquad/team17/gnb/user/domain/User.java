package codesquad.team17.gnb.user.domain;

public class User {

    private final Long id;
    private final String github;
    private final boolean host;
    private final boolean admin;

    private User(Long id, String github, boolean host, boolean admin) {
        this.id = id;
        this.github = github;
        this.host = host;
        this.admin = admin;
    }

    public Long getId() {
        return id;
    }

    public String getGithub() {
        return github;
    }

    public boolean isHost() {
        return host;
    }

    public boolean isAdmin() {
        return admin;
    }

    public User withId(Long id) {
        return new User(id, this.github, this.host, this.admin);
    }

    public static User newUser(String github) {
        return new User(null, github, false, false);
    }

    public static User of(Long id, String github, boolean host, boolean admin) {
        return new User(id, github, host, admin);
    }
}
