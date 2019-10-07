import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgForm} from "@angular/forms";
import { TodoService } from '../service/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todoedit.component.html',
  styleUrls: ['./todoedit.component.css']
})
export class TodoEditComponent implements OnInit {

  todoForm: FormGroup;
  id:number= null;

  constructor(
    private formBuilder: FormBuilder,
    private activeAouter: ActivatedRoute,
    private router: Router,
    private api: TodoService
  ) { }

  ngOnInit() {

    this.getDetail(this.activeAouter.snapshot.params['id']);

    this.todoForm = this.formBuilder.group({
      Tag: ['', Validators.compose([Validators.required])],
      Memo: ['', Validators.compose([Validators.required])],
    });
  }

  getDetail(id) {
    this.api.getTodo(id).subscribe(data => {
        this.id = data.id;
        this.todoForm.setValue({
          tag: data.tag,
          memo: data.memo,
        });
        console.log(data);
      });
  }

  updateTodo(form:NgForm) {

    this.api.updateTodo(this.activeAouter.snapshot.params['id'], form).subscribe(res => {
          this.router.navigate(['/todo']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
