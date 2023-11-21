import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

const BASE_API_URL = 'http://localhost:8000/todos';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  page: number = 1;
  pageSize: number = 5;
  userArray: any[] = [];
  currentuserID = '';

  title: string = '';
  description: string = '';
  duedate: string = '';

  showForm: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && !this.router.url.includes('edit')) {
        this.showUserDetails(id);
      }
    });

    this.getAllData();
  }

  getAllData() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const apiUrl = `${BASE_API_URL}?page=${this.page}&pageSize=${this.pageSize}`;

    this.http.get(apiUrl)
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.userArray = resultData.data.slice(startIndex, endIndex);
      });
  }

  showUserDetails(id: string) {
    const apiUrl = `${BASE_API_URL}/${id}`;
    this.http.get(apiUrl)
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.userArray = [resultData.data];
        this.title = resultData.data.title;
        this.description = resultData.data.description;
        this.duedate = resultData.data.duedate;
        this.currentuserID = id;
        this.showForm = true;
      });
  }

  save() {
    if (this.currentuserID) {
      this.updateUser();
    } else {
      this.register();
    }
  }

  register() {
    const bodyData = {
      title: this.title,
      description: this.description,
      duedate: this.duedate,
    };

    this.http.post(BASE_API_URL, bodyData).subscribe(
      (resultData: any) => {
        console.log(resultData);
        if (resultData && resultData.status === true) {
          alert('Registered Successfully');
          this.resetForm();
          this.getAllData();
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

  updateUser() {
    const bodyData = {
      title: this.title,
      description: this.description,
      duedate: this.duedate,
    };

    const apiUrl = `${BASE_API_URL}/${this.currentuserID}`;
    this.http.patch(apiUrl, bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Data Updated');
        this.resetForm();
        this.getAllData();
      });
  }

  loadNextPage() {
    this.page++;
    this.getAllData();
  }

  loadPreviousPage() {
    if (this.page > 1) {
      this.page--;
      this.getAllData();
    }
  }

  setUpdate(data: any) {
    this.title = data.title;
    this.description = data.description;
    this.duedate = data.duedate;

    this.currentuserID = data._id;
    this.showForm = true;
  }

  setDelete(data: any) {
    this.http.delete(`${BASE_API_URL}/${data._id}`).subscribe((resultData: any) => {
      console.log(resultData);
      alert('Database Deleted');
      this.getAllData();
    });
  }

  resetForm() {
    this.title = '';
    this.description = '';
    this.duedate = '';
    this.currentuserID = '';
    this.showForm = false;
  }
}

