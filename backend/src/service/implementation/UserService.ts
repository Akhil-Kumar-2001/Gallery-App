import { IUser } from "../../model/user.model";
import IUserRepository from "../../repository/user/IUserRepository";
import IUserService from "../IUserService";

class UserService implements IUserService {
    private _userRepository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this._userRepository = userRepository;
    }

    async findByEmail(email: string): Promise<IUser | null> {
        try {
            const user = await this._userRepository.findByEmail(email);
            return user
        } catch (error) {
            console.error("Error finding user by email:", error);
            return null;
        }
    }

    async findByPhoneNumber(phoneNumber: number): Promise<IUser | null> {
       try {
            const user = await this._userRepository.findByPhoneNumber(phoneNumber);
            return user
        } catch (error) {
            console.error("Error finding user by email:", error);
            return null;
        }
    
    }

    async createUser(data: IUser): Promise<IUser | null> {
        try {
            const user = await this._userRepository.create(data);
            return user;
        } catch (error) {
            console.error("Error creating user:", error);
            return null;

        }
    }

    async updateUser(email: string, data: Partial<IUser>): Promise<IUser | null> {
        try {
            const user = await this._userRepository.updateUser(email, data);
            return user;
        } catch (error) {
            console.error("Error updating user:", error);
            return null;
        }
    }

}
export default UserService;