-- Task Manager App - Database Schema
-- Run this in MySQL Workbench or MySQL CLI before starting the backend

CREATE DATABASE IF NOT EXISTS taskmanager_db;

USE taskmanager_db;

-- Users table (auto-created by Hibernate, this is for reference)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ADMIN') DEFAULT 'USER',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
