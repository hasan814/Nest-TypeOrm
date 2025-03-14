import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/create')
  create(@Body() createDto: CreateUserDto) {
    return this.userService.create(createDto);
  }
  @Post('/insert')
  insert(@Body() createDto: CreateUserDto) {
    return this.userService.insert(createDto);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.userService.findAll(search, startDate, endDate);
  }

  @Get('/order')
  orderData() {
    return this.userService.findAll();
  }

  @Get('/pagination')
  paginationUser(@Query() paginationDto: { page?: number; limit?: number }) {
    return this.userService.pagination({
      page: Number(paginationDto.page) || 1,
      limit: Number(paginationDto.limit) || 5,
    });
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
