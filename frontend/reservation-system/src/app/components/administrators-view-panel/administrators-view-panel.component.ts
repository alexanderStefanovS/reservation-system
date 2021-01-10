import { Component, OnInit, ViewChild } from '@angular/core';
import {DataLoaderService} from '../../services/data-loader.service';
import {UserModel} from '../../models/user-model';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { RoleModel } from 'src/app/models/role-model';
import { SystemLogModel } from 'src/app/models/system-log-model';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-administrators-view-panel',
  templateUrl: './administrators-view-panel.component.html',
  styleUrls: ['./administrators-view-panel.component.css']
})
export class AdministratorsViewPanelComponent implements OnInit {

  public users: UserModel[];
  public systemLog: SystemLogModel[];
  public selectedUserId: number = null;
  public date = null;

  @ViewChild('deleteUersSwal') public deleteUersSwal: SwalComponent;

  constructor(private dataLoader: DataLoaderService) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers() {
    this.dataLoader.loadAll(UserModel.urlGetАll)
      .subscribe((data: any) => {
        this.users = [];
        data.value.forEach((user: UserModel) => {
          if (user.rolesId !== 3) {
            this.users.push(new UserModel(user));
          }
        });
        this.selectedUserId = this.users[0].id;
        this.users.forEach(user => {
          this.loadUserRole(user);
        });
      });
  }

  loadUserRole(user: UserModel) {
    this.dataLoader.loadByParam(RoleModel.urlGet, `id=${user.rolesId}`)
      .subscribe((data: any) => {
        user.role = new RoleModel(data.value);
      });
  }

  removeUser(id: number) {
    this.dataLoader.deleteById(UserModel.urlDelete, id)
      .subscribe(() => {
        this.users = this.users.filter((user) => user.id !== id);
        this.deleteUersSwal.fire();
      });
  }

  onClickSearch() {
    let date = null;
    if (this.date) {
      date = this.prepareReservationDate();
    }

    this.dataLoader.loadByParam(SystemLogModel.urlSearch, `usersId=${this.selectedUserId}&date=${date}`)
      .subscribe((data: any) => {
        this.systemLog = [];
        data.value.forEach((log: SystemLogModel) => {
          this.systemLog.push(new SystemLogModel(log));
        });
        this.systemLog.forEach(log => {
          this.loadLogUser(log);
        })
      });
  }

  private loadLogUser(log: SystemLogModel) {
    this.dataLoader.loadByParam(UserModel.urlGet, `id=${log.usersId}`)
      .subscribe((data: any) => {
        log.user = new UserModel(data.value);
      });
  }

  private prepareReservationDate() {
    const dateString = `${this.date.year}-${this.date.month}-${this.date.day}`;
    return dateString;
  }

}
