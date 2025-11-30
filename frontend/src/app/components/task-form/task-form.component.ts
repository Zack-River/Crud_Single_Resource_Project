import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TaskService } from "../../services/task.service";
import { Task } from "../../models/task.model";

@Component({
  selector: "app-task-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./task-form.component.html",
  styleUrls: ["./task-form.component.css"],
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode: boolean = false;
  taskId: string | null = null;
  loading: boolean = false;
  error: string = "";

  statuses = [
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ["", [Validators.required, Validators.maxLength(100)]],
      description: ["", Validators.maxLength(500)],
      status: ["pending", Validators.required],
    });
  }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get("id");

    if (this.taskId && this.taskId !== "new") {
      this.isEditMode = true;
      this.loadTask();
    }
  }

  loadTask(): void {
    if (!this.taskId) return;

    this.loading = true;
    this.taskService.getTask(this.taskId).subscribe({
      next: (task) => {
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          status: task.status,
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = "Failed to load task. Please try again.";
        this.loading = false;
        console.error("Error loading task:", err);
      },
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = "";

    const task: Task = this.taskForm.value;

    if (this.isEditMode && this.taskId) {
      this.taskService.updateTask(this.taskId, task).subscribe({
        next: () => {
          this.router.navigate(["/"]);
        },
        error: (err) => {
          this.error = "Failed to update task. Please try again.";
          this.loading = false;
          console.error("Error updating task:", err);
        },
      });
    } else {
      this.taskService.createTask(task).subscribe({
        next: () => {
          this.router.navigate(["/"]);
        },
        error: (err) => {
          this.error = "Failed to create task. Please try again.";
          this.loading = false;
          console.error("Error creating task:", err);
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(["/"]);
  }

  get title() {
    return this.taskForm.get("title");
  }
  get description() {
    return this.taskForm.get("description");
  }
}
