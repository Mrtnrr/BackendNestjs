import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShowDTO } from './show.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IShow } from './show.entity';

/**
 * Injectable
 * ShowService
 */
@Injectable()
export class ShowService {    private service: string = 'ShowService';
    /**
     * Creates an instance of user service.
     * @param reqShow
     */
    constructor(
        @InjectModel("Shows")
        private readonly reqShow: Model<IShow>,
    ) {}

    /**
     * Gets all shows
     * @returns {Promise<IShow[]>} shows un database
     */
    async getAll(): Promise<IShow[]> {
        return await this.reqShow.find({},"_id serie title _user active createdAt updatedAt");
    }

      /**
     * Gets one user
     * @param {number} id  key  to user serched
     * @returns {Promise<IShow[]>} shows un database
     */
    async getFavoritesByID(id: string ): Promise<IShow[]> {
        // await this.reqShow.find()
        return await this.reqShow.find({_user: id},"_id serie title _user active createdAt updatedAt");
    }

    /**
     * Creates user service
     * @param {ShowDTO} newUser data to create new user
     * @returns  { Promise<IShow>} user created
     */
    async created(newUser: Partial<ShowDTO>): Promise<IShow> {
        const user = await this.reqShow.create(newUser as IShow);
        return user
    }

    
}
