package com.example.backend.config;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Create/Update Admin user
        User admin = userRepository.findByEmail("admin@test.com").orElse(new User());
        if (admin.getId() == null) {
            admin.setName("Admin User");
            admin.setEmail("admin@test.com");
            admin.setRole(User.Role.ADMIN);
        }
        admin.setPassword(passwordEncoder.encode("admin123"));
        userRepository.save(admin);
        System.out.println("Seeded/Updated Admin user: admin@test.com / admin123");

        // Create/Update Regular user
        User user = userRepository.findByEmail("user@test.com").orElse(new User());
        if (user.getId() == null) {
            user.setName("Dummy User");
            user.setEmail("user@test.com");
            user.setRole(User.Role.USER);
        }
        user.setPassword(passwordEncoder.encode("password123"));
        userRepository.save(user);
        System.out.println("Seeded/Updated Regular user: user@test.com / password123");
    }
}
