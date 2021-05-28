package codesquad.team17.gnb.user.repository;

import codesquad.team17.gnb.exception.NotFoundException;
import codesquad.team17.gnb.user.domain.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import static org.assertj.core.api.Assertions.as;
import static org.assertj.core.api.Assertions.assertThat;

@JdbcTest
class UserRepositoryTest {

    private UserRepository userRepository;

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @BeforeEach
    void setUp() {
        userRepository = new JdbcUserRepository(namedParameterJdbcTemplate);
    }

    @Test
    void getUser() {
        String github = "PizzaCola-K";
        User user = userRepository.findByGithub(github).orElseThrow(() -> new NotFoundException("유저 없음"));

        assertThat(user.getId()).isEqualTo(1L);
        assertThat(user.getGithub()).isEqualTo(github);
    }

    @Test
    void insertUser() {
        User user = User.newUser("TestUser");
        user = userRepository.insert(user);
        assertThat(user.getId()).isNotNull();
    }
}
