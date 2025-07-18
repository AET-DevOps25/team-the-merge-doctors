package com.mentorpulse.mentorshipservice.config;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class Rolefilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String role = request.getHeader("X-User-Role");

        if (role != null && !role.isEmpty()) {
            List<SimpleGrantedAuthority> authorityList = Collections.singletonList(
                    new SimpleGrantedAuthority("ROLE_" + role)    // ROLE_MENTOR || ROLE_MENTEE.
            );

            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(null, null, authorityList);

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            filterChain.doFilter(request, response);
        } else {
            throw new AccessDeniedException("The request header X-User-Role is missing");
        }
    }
}
