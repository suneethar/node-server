import { Response, Request } from 'express';
import { IUser } from '../types/user';
import User from '../models/user';
import bycrypt from 'bcryptjs';

const registerUser = async(req: Request, res: Response): Promise<void> => {
    const salt = await bycrypt.genSalt(10);
    const {name, password, email} = req.body as Pick<IUser, "name" | "password" | "email">
    const hashpassword = await bycrypt.hash(password, salt);

    try {
        const emailExist = await User.findOne({email: req.body.email})

        if (emailExist) {
            res.status(400).json({"error":'Email already Exist'});
        }

        else {
            const user: IUser = new User({
                name: name,
                email: email,
                password: hashpassword
            })
    
            const id = await User.create(user);
            user.id = id;
            res.status(200).json(user);
        }

    } catch (error) {
        res.status(500).json(error);
    }
}

export { registerUser }