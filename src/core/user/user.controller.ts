import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    UseGuards,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { generateStorageMulter } from '../../config/constants';

/**
 * Controller users
 */
// @UseGuards(AuthGuard('jwt'))
@Controller('api/users')
export class UserController {
    constructor(private readonly _users: UserService) {}

    /**
     * Gets user controller
     * @returns  users[]
     */
    @Get()
    getAll() {
        return this._users.getAll();
    }
    /**
     * Gets user controller
     * @param id by user
     * @returns  user
     */
    @Get(':id')
    getOne(@Param('id') id: string) {
        return this._users.getOne(id);
    }
    /**
     * Posts user controller
     * @param user to new user
     * @returns  new user
     */
    @Post()
    create(@Body() user: UserDTO) {
        // console.log(user,'==================')
        return this._users.created(user as UserDTO);
    }
  
}
