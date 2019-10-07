import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; /* htmpClient */
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PricerComponent } from './pricer/pricer.component';
import { ApirestService } from './service/apirest.service';
import { HighchartsChartComponent } from 'highcharts-angular';
import { TodoService } from './service/todo.service';
import { TodoComponent } from './Todo/Todo.component';
import { TodoEditComponent } from './TodoEdit/TodoEdit.component';
import { TodoAddComponent } from './TodoAdd/TodoAdd.component';

const routes: Routes = [{
    path: '',
    component: PricerComponent
  },
  {
    path: 'todo',
    component: TodoComponent,
    data: { title: 'List of todos' }
  },
  {
    path: 'todo/add',
    component: TodoAddComponent,
    data: { title: 'Add todo' }
  },
  {
    path: 'todo/edit/:id',
    component: TodoEditComponent,
    data: { title: 'Edit todo' }
  },
];

@NgModule({
   declarations: [
      AppComponent,
      PricerComponent,
      HighchartsChartComponent,
      TodoComponent,
      TodoEditComponent,
      TodoAddComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      ReactiveFormsModule,
      AppRoutingModule,
      RouterModule.forRoot(routes)
   ],
   providers: [
      ApirestService,
      TodoService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
