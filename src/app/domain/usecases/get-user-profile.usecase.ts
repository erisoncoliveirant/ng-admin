import {UseCase} from "../../base/use-case";
import {UserModel} from "../models/user.model";
import {UserRepository} from "../repositories/user.repository";
import {Observable} from "rxjs";
import {UserImplementationRepository} from "../../data/repositories/user/user-implementation.repository";

export class GetUserProfileUseCase implements UseCase<void, UserModel> {

  constructor(private userRepository: UserImplementationRepository) { }

  execute(): Observable<UserModel> {
    return this.userRepository.getUserProfile();
  }
}
