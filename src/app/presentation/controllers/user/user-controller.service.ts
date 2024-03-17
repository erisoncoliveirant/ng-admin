import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {UserLoginUseCase} from "../../../domain/usecases/user-login.usecase";
import {UserRegisterUseCase} from "../../../domain/usecases/user-register.usecase";

import {UserModel} from "../../../domain/models/user.model";
import {UserRepository} from "../../../domain/repositories/user.repository";
import {UserLogoutUseCase} from "../../../domain/usecases/user-logout.usecase";

@Injectable({
  providedIn: "root"
})
export class UsuarioControllerService implements UserRepository {

  constructor(
    private userLoginUseCase: UserLoginUseCase,
    private userRegisterUseCase: UserRegisterUseCase,
    private useLogoutUseCase: UserLogoutUseCase
  ) { }

  register(params: { phoneNum: string; password: string; }): Observable<UserModel> {
    return this.userRegisterUseCase.execute(params);
  }
  getUserProfile(): Observable<UserModel> {
    throw new Error("Method not implemented.");
  }

  login(params: { username: string; password: string } ): Observable<UserModel> {
    return this.userLoginUseCase.execute(params);
  }

  logout(): Observable<boolean> {
    return this.useLogoutUseCase.execute();
  }

}
