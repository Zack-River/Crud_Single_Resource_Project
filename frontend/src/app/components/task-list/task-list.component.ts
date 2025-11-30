import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TaskService } from "../../services/task.service";
import { Task } from "../../models/task.model";

@Component({
  selector: "app-task-list",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.css"],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading: boolean = false;
  error: string = "";

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.error = "";
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = "Failed to load tasks. Please try again.";
        this.loading = false;
        console.error("Error loading tasks:", err);
      },
    });
  }

  deleteTask(id: string | undefined): void {
    if (!id) return;

    if (confirm("Are you sure you want to delete this task?")) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.loadTasks();
        },
        error: (err) => {
          this.error = "Failed to delete task. Please try again.";
          console.error("Error deleting task:", err);
        },
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case "completed":
        return "status-completed";
      case "in-progress":
        return "status-in-progress";
      default:
        return "status-pending";
    }
  }
}
