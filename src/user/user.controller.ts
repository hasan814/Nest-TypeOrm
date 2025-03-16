import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, ParseIntPipe } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ProfileDto } from './dto/profile.dto';

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

  @Post('/profile')
  createProfile(@Body() profileDto: ProfileDto) {
    return this.userService.createProfile(profileDto);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.userService.findAll(search, startDate, endDate);
  }
  @Get('/blogs/:userId')
  findAllBlogsOfUser(@Param("userId", ParseIntPipe) userId: number) {
    return this.userService.blogsOfuser(userId);
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

  @Get('/selection')
  selectionUser() {
    return this.userService.selection()
  }

  @Get('/profile/:id')
  findUserWithProfile(@Param("id") id: string) {
    return this.userService.findUserWithProfile(+id)
  }

  @Put(':id')
  updateFields(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateChangedFields(+id, updateUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateChangedFields(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
