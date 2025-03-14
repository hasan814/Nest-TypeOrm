import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Between, FindOptionsWhere, ILike, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }
  async create(createDto: CreateUserDto) {
    const { first_name, last_name, email, age } = createDto
    const user = this.userRepository.create({
      first_name: "Hasan",
      last_name: "Moosavi",
      age: 35,
      email: "H.mousavi910@gmail.com"
    })
    return await this.userRepository.save(user);
  }

  async insert(createDto: CreateUserDto) {
    const { first_name, last_name, email, age } = createDto
    return await this.userRepository.insert({
      first_name: "Mohsen",
      last_name: "Moosavi",
      age: 6,
      email: "H.mousavi910@gmail.com"
    })
  }

  async findAll(search?: string, startDate?: string, endDate?: string) {
    let where: FindOptionsWhere<UserEntity> = {};
    if (search) where.first_name = ILike(`%${search}%`);
    if (startDate && endDate) where.created_at = Between(new Date(startDate), new Date(endDate));
    else if (startDate) where.created_at = MoreThanOrEqual(new Date(startDate));
    else if (endDate) where.created_at = LessThanOrEqual(new Date(endDate));

    return await this.userRepository.find({ where });
  }

  async orderData() {
    return await this.userRepository.find({ where: {}, order: { id: "ASC" } })
  }

  async pagination(paginationDto: { page: number; limit: number }) {
    let { page = 1, limit = 5 } = paginationDto;
    if (page < 1) page = 1;
    if (limit < 1) limit = 5;
    const skip = (page - 1) * limit;
    const [data, total] = await this.userRepository.findAndCount({
      where: {},
      order: { first_name: "ASC" },
      take: limit,
      skip,
    });
    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data,
    };
  }

  async selection() {
    return await this.userRepository.find({ where: {}, select: { first_name: true, last_name: true, age: true } })
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
