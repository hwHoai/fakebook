package com.ooadproj;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/**").anonymous()
                        .requestMatchers(HttpMethod.POST, "/**").anonymous()
                )
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.disable());

        return http.build();
    }

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().
//                authorizeRequests().antMatchers(HttpMethod.GET, "/**").hasAnyRole("ADMIN", "USER")
//                .antMatchers(HttpMethod.POST, "/routeA/**").hasAnyRole("ADMIN", "USER")
//                .antMatchers(HttpMethod.POST, "/routeB/**").hasRole("ADMIN")
//                .antMatchers(HttpMethod.DELETE, "/routeB/**").hasRole("ADMIN").and().
//                requestCache().requestCache(new NullRequestCache()).and().
//                httpBasic().authenticationEntryPoint(authenticationEntryPoint).and().
//                cors().and().
//                csrf().disable();
//    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user =
                User.withDefaultPasswordEncoder()
                        .username("root")
                        .password("root")
                        .roles("USER")
                        .build();

        return new InMemoryUserDetailsManager(user);
    }
}
