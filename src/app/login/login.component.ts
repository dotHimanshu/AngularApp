import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl(''),
  });

  constructor(private loginService: LoginService, private route: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    this.loginService
      .doLogin(this.userForm.value.userName, this.userForm.value.password)
      .pipe(first())
      .subscribe(
        (data) => {
          this.route.navigate(['home']);
        },
        (err) => {
          alert('Wrong username/password');
          console.log(err);
        }
      );
  }
}
