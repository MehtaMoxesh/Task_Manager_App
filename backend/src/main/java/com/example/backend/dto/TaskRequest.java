package com.example.backend.dto;

import com.example.backend.entity.Task;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskRequest {
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    
    private Task.Priority priority;
    
    private Task.Status status;
    
    private LocalDateTime dueDate;
}
