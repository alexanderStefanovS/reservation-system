import { Component, OnInit } from '@angular/core';
import {DataLoaderService} from '../../services/data-loader.service';
import {UserModel} from '../../models/user-model';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { RoleModel } from 'src/app/models/role-model';
import { SystemLogModel } from 'src/app/models/system-log-model';

@Component({
  selector: 'app-administrators-view-panel',
  templateUrl: './administrators-view-panel.component.html',
  styleUrls: ['./administrators-view-panel.component.css']
})
export class AdministratorsViewPanelComponent implements OnInit {

  public users: UserModel[] = [];
  public selectedUser: UserModel;
  public id: number = 15;
  public date: NgbDate;
  public firstName: string;
  public lastName: string;
  public isVisible = false;
  public isVisibleToast = false;

  constructor(private dataLoader: DataLoaderService) {
    const today = new Date();
    this.date = new NgbDate(today.getFullYear(), today.getMonth(), today.getDate());
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers() {
    this.dataLoader.loadAll(UserModel.urlGetАll)
      .subscribe((data: any) => {
        data.value.forEach((user: any) => {
          this.users.push(new UserModel(user));
        });
        this.users.forEach(user => {
          this.loadUserRole(user);
        });
        this.selectedUser = this.users[0];
      });
  }

  loadUserRole(user: UserModel) {
    this.dataLoader.loadByParam(RoleModel.urlGet, `id=${user.rolesId}`)
      .subscribe((data: any) => {
        user.role = new RoleModel(data.value);
      });
  }

  removeUser(email: string) {
    this.users = this.users.filter((user) => user.email !== email);
    this.isVisibleToast = true;
  }

  onClickSearch() {
    const date = this.prepareReservationDate();
    this.dataLoader.loadByParam(SystemLogModel.urlSearch, `usersId=${this.selectedUser.id}&date=${date}`)
      .subscribe((data: any) => {
        console.log(data);
      });
  }

  private prepareReservationDate() {
    const dateString = `${this.date.year}-${this.date.month}-${this.date.day}`;
    return new Date(Date.parse(dateString));
  }

}
