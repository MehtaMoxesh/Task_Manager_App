-- Seed a dummy user for testing
-- Password is 'password123' (BCrypt hashed)
INSERT INTO users (name, email, password, role)
SELECT 'Dummy User', 'user@test.com', '$2a$10$8.UnVuG9HHgffUDAlk8q7Ou5f2LpN36fG.7ApgjBy.7Gq./AgyWJK', 'USER'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'user@test.com');

-- Seed a dummy admin for testing
-- Password is 'admin123' (BCrypt hashed)
INSERT INTO users (name, email, password, role)
SELECT 'Admin User', 'admin@test.com', '$2a$10$XmSJR.vC2.K8VbTq9x5Nee5.vK8O8jN6j7.K.1/1n/G/I.Zl.S/y.', 'ADMIN'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@test.com');
