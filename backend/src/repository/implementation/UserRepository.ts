import User, { IUser } from "../../model/user.model";
import IUserRepository from "../IUserRepository";

class UserRepository implements IUserRepository {

    /**
     * Finds a user by email.
     * @param email - The email of the user to find.
     * @returns A promise that resolves to the user if found, or null if not found.
     */

    async findByEmail(email: string): Promise<IUser | null> {
        const user = await User.findOne({ email })
        if (!user) {
            return null;
        }
        return user;
    }

    /**
     * Finds a user by email.
     * @param phoneNumber - The phoneNumber of the user to find.
     * @returns A promise that resolves to the user if found, or null if not found.
     */

    async findByPhoneNumber(phoneNumber: number): Promise<IUser | null> {
        const user = await User.findOne({ phoneNumber });
        if (!user) return null;
        return user;
    }

    /**
     * Creates a new user.
     * @param data - The user data to create.
     * @returns A promise that resolves to the created user or null if an error occurs.
     */

    async createUser(data: IUser): Promise<IUser | null> {
        try {
            const user = new User(data);
            await user.save();
            return user;
        } catch (error) {
            console.error("Error creating user:", error);
            return null;
        }
    }

    /**
     * Updates a user by email.
     * @param email - The email of the user to update.
     * @param data - The data to update the user with.
     * @returns A promise that resolves to the updated user or null if an error occurs.
     */

    async updateUser(email: string, data: Partial<IUser>): Promise<IUser | null> {
        try {
            console.log("data in repo", data)
            const user = await User.findOneAndUpdate({ email }, data, { new: true });
            if (!user) {
                return null;
            }
            console.log(user)
            return user;
        } catch (error) {
            console.error("Error updating user:", error);
            return null;
        }
    }

}
export default UserRepository;
