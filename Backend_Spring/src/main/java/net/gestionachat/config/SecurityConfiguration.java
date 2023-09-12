package net.gestionachat.config;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

  private final JwtAuthenticationFilter jwtAuthFilter;
  private final AuthenticationProvider authenticationProvider;
  private final LogoutHandler logoutHandler;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf()
        .disable()
        .authorizeHttpRequests()
        .requestMatchers("/api/v1/auth/**","/api/v1/roles/**","/api/v1/articles/**","/api/v1/demandeachat/**")
          .permitAll()
            //.requestMatchers("/admin/**").hasRole("ADMIN")
           /* .requestMatchers("/user/**").hasRole("USER")
            .requestMatchers("/responsable1/**").hasAnyRole("admin", " RESPONSABLE_ACHAT")
            .requestMatchers("/responsable2/**").hasAnyRole("admin", "RESPONSABLE_GESTION")
            .requestMatchers("/responsable3/**").hasAnyRole("admin", "RESPONSABLE_QUALITE")
            .requestMatchers("/responsable4/**").hasAnyRole("admin", " CHEF_EXECUTIF_OFFICE")
            .requestMatchers("/user/**").hasAnyRole("admin", "responsable1", "responsable2", "responsable3", "responsable4", "user")*/
        .anyRequest()
          .authenticated()
        .and()
          .sessionManagement()
          .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
        .logout()
        .logoutUrl("/api/v1/auth/logout")
        .addLogoutHandler(logoutHandler)
        .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
    ;

    return http.build();
  }




}
