import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import {UseCase} from "../../base/use-case";
import {UserImplementationRepository} from "../../data/repositories/user/user-implementation.repository";

export class UserRegisterUseCase implements UseCase<{ phoneNum: string; password: string }, UserModel> {

  constructor(private userRepository: UserImplementationRepository) { }

  execute(
    params: { phoneNum: string; password: string },
  ): Observable<UserModel> {
    return this.userRepository.register(params);
  }
}
