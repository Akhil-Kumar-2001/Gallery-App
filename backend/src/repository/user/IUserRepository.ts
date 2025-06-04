import { IUser } from "../../model/user.model";
import { IBaseRepository } from "../base/IBaseRepository";

interface IUserRepository extends IBaseRepository<IUser> {
    findByEmail(email: string): Promise<IUser | null>;
    findByPhoneNumber(phoneNumber: number): Promise<IUser | null>;
    createUser(data: IUser): Promise<IUser | null>;
    updateUser(email: string, data: Partial<IUser>): Promise<IUser | null>;
}

export default IUserRepository;