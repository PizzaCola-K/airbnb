package codesquad.team17.gnb.user.repository;

import codesquad.team17.gnb.user.domain.User;

import java.util.Optional;

public interface UserRepository {

    Optional<User> findByGithub(String github);

    User insert(User user);
}
