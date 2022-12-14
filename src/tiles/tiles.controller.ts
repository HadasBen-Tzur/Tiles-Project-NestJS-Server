import { Controller, Get, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TilesService } from './tiles.service';
import { UpdateTileDto } from './dto/update-tile.dto';
import { ObjectId } from 'mongodb';
import { AuthJwtGuard } from 'src/guards/jwt.guard';

@UseGuards(AuthJwtGuard)
@Controller('tiles')
export class TilesController {
  constructor(private readonly tilesService: TilesService) {}

  @Get()
  async getAllTiles() {
    return this.tilesService.getAllTiles();
  }

  @Put()
  async updateTilesServic(@Body() updateTileDto: UpdateTileDto) {
    console.log(updateTileDto);
    return this.tilesService.updateTilesServic(updateTileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.tilesService.remove(+id);
  }
}
