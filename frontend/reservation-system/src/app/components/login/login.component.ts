import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UserModel } from 'src/app/models/user-model';
import { DataLoaderService } from 'src/app/services/data-loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public errMessage: string;
  public model = { email: '', password: ''};

  @ViewChild('errorSwal') public errorSwal: SwalComponent;

  constructor(
    private router: Router,
    private dataLoader: DataLoaderService
  ) { }

  ngOnInit(): void {
  }

  onClickLogin() {
    this.dataLoader.create(UserModel.urlLogin, this.model)
      .subscribe( (data: any) => {
        if (data.success) {
          const value = JSON.parse(data.value);
          this.redirectOnLogin(+value.rolesId);
          sessionStorage.setItem('usersId', value.id);
        } else {
          this.errMessage = data.message;
          this.errorSwal.fire();
        }
      });
  }

  redirectToRegisterPage() {
    this.router.navigate(['registration']);
  }

  redirectOnLogin(rolesId: number) {
    let url: string;

    if (rolesId === 1) {
      url = 'users-view';
    } else if (rolesId === 2) {
      url = 'managers-view';
    } else {
      url = 'administrators-view';
    }

    this.router.navigate([url]);
  }

}
