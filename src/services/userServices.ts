import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



interface RegisterParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const register = async ({ firstName, lastName, email, password }: RegisterParams) => {
    const findUser = await userModel.findOne({ email });

    if (findUser) {
        return { data: "User already exists", statusCode: 400 };
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = new userModel({ firstName, lastName, email, password: hashPassword });
    await newUser.save();
    return {
        data: {
            token: genratejwt({ firstName, lastName, email })
        }, statusCode: 201
    };
}

interface LoginParams {
    email: string;
    password: string;
}

export const login = async ({ email, password }: LoginParams) => {
    const findUser = await userModel.findOne({ email });

    if (!findUser) {
        return { statusCode: 404, data: { message: "User not found" } };
    }

    const passwordMatch = await bcrypt.compare(password, findUser.password);

    if (!passwordMatch) {
        return { statusCode: 400, data: { message: "Invalid password" } };
    }

    return {
        statusCode: 200,
        data: {
            message: "Login success",
            token: genratejwt({ email, firstName: findUser.firstName, lastName: findUser.lastName }),
        },
    };
};

const genratejwt = (data: any) => {
    return jwt.sign(data, 'ibVFBzyN7tO7E6q0maJsOwVsGZ4/nGbaP3fVaCOtZmc=')
}