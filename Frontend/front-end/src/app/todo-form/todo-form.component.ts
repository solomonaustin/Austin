import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_API_URL = 'http://localhost:8000/todos';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() duedate: string = '';

  @Output() saveClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  save() {
    this.saveClicked.emit();
  }

  register() {
    let bodyData = {
      title: this.title,
      description: this.description,
      duedate: this.duedate,
    };

    this.http.post(BASE_API_URL, bodyData).subscribe(
      (resultData: any) => {
        console.log(resultData);
        if (resultData && resultData.status === true) {
          alert('Registered Successfully');
          this.saveClicked.emit();
        } else {
          console.error('Invalid response from the server:', resultData);
          alert('Error creating user. Please try again.');
        }
      },
      (error) => {
        console.error('Error creating user:', error);
        alert('Error creating user. Please try again.');
      }
    );
  }
}

