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
import { ShowService } from './show.service';
import { ShowDTO } from './show.dto';
import { AuthGuard } from '@nestjs/passport';

/**
 * Controller shows
 */
// @UseGuards(AuthGuard('jwt'))
@Controller('api/show')
export class ShowController {
    constructor(private readonly _shows: ShowService) {}

    /**
     * Gets show controller
     * @returns  shows[]
     */
    @Get()
    getAll() {
        return this._shows.getAll();
    }

    /**
    * Posts show controller
    * @param show to new show
    * @returns  new show
    */
   @Get('favorite/:id')
   SaveFavoriteShow(@Param('id') id: string) {
       return this._shows.getFavoritesByID(id)
   }
    /**
     * Posts show controller
     * @param show to new show
     * @returns  new show
     */
    @Post()
    create(@Body() show: ShowDTO) {
        return this._shows.created(show as ShowDTO);
    }

   
   
}
