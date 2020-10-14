import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './user.entity';

/**
 * Injectable
 * UserService
 */
@Injectable()
export class UserService {    private service: string = 'UserService';
    /**
     * Creates an instance of user service.
     * @param repUser
     */
    constructor(
        @InjectModel("Users")
        private readonly repUser: Model<IUser>,
    ) {}

    /**
     * Gets all users
     * @returns {Promise<IUser[]>} users un database
     */
    async getAll(): Promise<IUser[]> {
        return await this.repUser.find({},"email _id name active createdAt updatedAt");
    }

    /**
     * Gets one user
     * @param {number} id  key  to user serched
     * @returns {Promise<IUser>} user serched
     */
    async getOne(_id: string): Promise<IUser> {
        const user = await this.repUser.findOne( { _id, deletedAt: null },"email _id name active createdAt" )
        if (!user) {
            throw new HttpException(
                {
                    error: 'No se encontro el usuario',
                    where: this.service + '::getOne',
                },
                HttpStatus.NOT_FOUND,
            );
        }
        return user;
    }

    /**
     * Gets one by user and password
     * @param user user
     * @returns one by user and password
     */
    async getOneByUser(user: string): Promise<IUser> {
        const userFinded = await this.repUser.findOne({ 
            $or:[{user},{email:user}]
        },
        'email _id name active createdAt updatedAt password'
        );
        return userFinded;
    }

    /**
     * Creates user service
     * @param {UserDTO} newUser data to create new user
     * @returns  { Promise<IUser>} user created
     */
    async created(newUser: Partial<UserDTO>): Promise<IUser> {
        const user = await this.repUser.create(newUser as IUser);
        return user
    }

 
}
