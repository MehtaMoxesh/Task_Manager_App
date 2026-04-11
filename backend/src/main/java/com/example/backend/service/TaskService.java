package com.example.backend.service;

import com.example.backend.dto.TaskRequest;
import com.example.backend.dto.TaskResponse;
import com.example.backend.entity.Task;
import com.example.backend.entity.User;
import com.example.backend.repository.TaskRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    // Get all tasks for a specific user (or all tasks for Admin)
    public List<TaskResponse> getAllTasksForUser(User user) {
        List<Task> tasks;
        if (user.getRole() == User.Role.ADMIN) {
            tasks = taskRepository.findAllByOrderByCreatedAtDesc();
        } else {
            tasks = taskRepository.findByUserOrderByCreatedAtDesc(user);
        }
        
        return tasks.stream()
                .map(TaskResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // Get a specific task by ID (ensuring it belongs to the user or user is Admin)
    public TaskResponse getTaskById(Long id, User user) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        
        if (user.getRole() != User.Role.ADMIN && !task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied: This task does not belong to you");
        }
        
        return TaskResponse.fromEntity(task);
    }

    // Create a new task
    @Transactional
    public TaskResponse createModel(TaskRequest request, User user) {
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        if (request.getPriority() != null) task.setPriority(request.getPriority());
        if (request.getStatus() != null) task.setStatus(request.getStatus());
        task.setDueDate(request.getDueDate());
        task.setUser(user);
        
        return TaskResponse.fromEntity(taskRepository.save(task));
    }

    // Update an existing task
    @Transactional
    public TaskResponse updateTask(Long id, TaskRequest request, User user) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        
        if (user.getRole() != User.Role.ADMIN && !task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied: You cannot update this task");
        }
        
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        if (request.getPriority() != null) task.setPriority(request.getPriority());
        if (request.getStatus() != null) task.setStatus(request.getStatus());
        task.setDueDate(request.getDueDate());
        
        return TaskResponse.fromEntity(taskRepository.save(task));
    }

    // Delete a task
    @Transactional
    public void deleteTask(Long id, User user) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        
        if (user.getRole() != User.Role.ADMIN && !task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied: You cannot delete this task");
        }
        
        taskRepository.delete(task);
    }
}
