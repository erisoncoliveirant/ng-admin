import {UserModel} from "../models/user.model";
import {Observable} from "rxjs";

export abstract class UserRepository {
  abstract login(params: {username: string, password: string}): Observable<UserModel>;
  abstract register(params: {phoneNum: string, password: string}): Observable<UserModel>;
  abstract getUserProfile(): Observable<UserModel>;
}
