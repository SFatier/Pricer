import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { TodoService } from '../service/todo.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-todo-add',
  templateUrl: './todoadd.component.html',
  styleUrls: ['./todoadd.component.css']
})

export class TodoAddComponent implements OnInit {

  todoForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private api: TodoService) { }


  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      Id: [0],//, Validators.compose([Validators.required])],
      Tag: ['', Validators.compose([Validators.required])],
      Memo: ['', Validators.compose([Validators.required])],
    });
  }

  addTodo() {
    const todo = {
      Id: this.todoForm.controls.Id.value,
      Tag: this.todoForm.controls.Tag.value,
      Memo: this.todoForm.controls.Memo.value,
    };

    this.api.addTodo(todo).subscribe(res => {
          this.router.navigate(['/todo']);
        }, (err) => {
          console.log(err);
        });
  }
}
