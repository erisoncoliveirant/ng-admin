import {Observable, of} from 'rxjs';
import { UserModel } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import {UseCase} from "../../base/use-case";
import {UserImplementationRepository} from "../../data/repositories/user/user-implementation.repository";

export class UserLogoutUseCase implements UseCase<void, boolean> {

  constructor(private userRepository: UserImplementationRepository) { }

  execute(): Observable<boolean> {
    return of(true);
  }
}
