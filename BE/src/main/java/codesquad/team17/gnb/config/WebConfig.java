package codesquad.team17.gnb.config;

import codesquad.team17.gnb.auth.interceptor.AuthInterceptor;
import codesquad.team17.gnb.auth.interceptor.PlaceInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final AuthInterceptor authInterceptor;
    private final PlaceInterceptor placeInterceptor;

    public WebConfig(AuthInterceptor authInterceptor, PlaceInterceptor placeInterceptor) {
        this.authInterceptor = authInterceptor;
        this.placeInterceptor = placeInterceptor;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("GET", "HEAD", "POST", "OPTIONS")
                .allowedOrigins("http://localhost:3000");
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authInterceptor).addPathPatterns("/api/reservations/**")
                .addPathPatterns("/api/likes/**");

        registry.addInterceptor(placeInterceptor).addPathPatterns("/api/places");
    }
}
