package com.example.backend.repository;

import com.example.backend.entity.Task;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserOrderByCreatedAtDesc(User user);
    List<Task> findAllByOrderByCreatedAtDesc();
    List<Task> findByUserAndStatus(User user, Task.Status status);
}
