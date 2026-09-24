import type { User } from "../models/user";

export interface IUserService {
  getAllUsers(): Promise<User[]>;
}
