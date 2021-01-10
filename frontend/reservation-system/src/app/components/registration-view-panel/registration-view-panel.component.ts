import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { PlaceModel } from 'src/app/models/place-model';
import { PlaceTypesModel } from 'src/app/models/place-types-model';
import { RoleModel } from 'src/app/models/role-model';
import { UserModel } from 'src/app/models/user-model';
import { DataLoaderService } from 'src/app/services/data-loader.service';

@Component({
  selector: 'app-registration-view-panel',
  templateUrl: './registration-view-panel.component.html',
  styleUrls: ['./registration-view-panel.component.css']
})
export class RegistrationViewPanelComponent implements OnInit {

  public user: UserModel = new UserModel({});
  public place: PlaceModel = new PlaceModel({});
  public roles: RoleModel[];
  public placeTypes: PlaceTypesModel[];
  public rePass: string;

  public isVisibleToast = false;
  public isManager = false;

  @ViewChild('form') public form: NgForm;
  @ViewChild('successSwal') public successSwal: SwalComponent;

  constructor(
    private router: Router,
    private dataLoader: DataLoaderService
  ) {}

  ngOnInit(): void {
    this.loadRoles();
    this.loadPlaceTypes();
  }

  private loadRoles() {
    this.dataLoader.loadAll(RoleModel.urlLoad)
      .subscribe((data: any) => {
        this.roles = data.value;
      })
  }

  private loadPlaceTypes() {
    this.dataLoader.loadAll(PlaceTypesModel.urlLoad)
      .subscribe((data: any) => {
        this.placeTypes = data.value;
      })
  }

  private savePlace(usersId: number) {
    const place = {
      description: this.place.description,
      name: this.place.name,
      usersId,
      placeTypesId: this.place.placeTypesId
    }
    this.dataLoader.create(PlaceModel.urlCreate, place)
      .subscribe(data => {
        this.successSwal.fire();
      });
  }

  onClickRegister() {
    const saveUser = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phone: this.user.phone,
      password: this.user.password,
      rolesId: this.user.rolesId
    }
    this.dataLoader.create(UserModel.urlCreate, saveUser)
      .subscribe((data: any) => {
        if (this.isManager) {
          this.savePlace(data.value);
        } else {
          this.successSwal.fire();
        }
      })
  }

  onRoleChanged(role: RoleModel) {
    if (role?.code === 'MANAGER') {
      this.isManager = true;
    } else {
      this.isManager = false;
    }
  }

  onSuccessRegistration() {
    this.router.navigate(['login']);
  }

}
