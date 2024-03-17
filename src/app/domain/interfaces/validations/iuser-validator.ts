import { ValidationResult } from 'ts.validator.fluent/dist';
import {UserEntity} from "../../../data/repositories/user/entities/user-entity";

export abstract class IUserValidator {
  abstract validateFields(param: UserEntity): ValidationResult;
}
