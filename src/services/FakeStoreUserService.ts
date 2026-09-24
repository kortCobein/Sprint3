import type { User } from "../core/models/user";
import type { IUserService } from "../core/services/IUserService";

export class FakeStoreUserService implements IUserService {
  private readonly baseUrl = "https://fakestoreapi.com";

  async getAllUsers(): Promise<User[]> {
    const response = await fetch(`${this.baseUrl}/users`);

    if (!response.ok) {
      throw new Error("No se pudieron obtener los usuarios.");
    }

    const users: User[] = await response.json();

    return users;
  }
}
