import { Between, FindOptionsWhere, ILike, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { isEmail, isNumber } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ProfileDto } from './dto/profile.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity) private profileRepository: Repository<ProfileEntity>) { }
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

  async blogsOfuser(userId: number) {
    return await this.userRepository.findOne({ where: { id: userId }, relations: { blogs: true } })
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

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) throw new NotFoundException()
    return user;
  }

  async updateChangedFields(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id)
    const { age, email, first_name, last_name } = updateUserDto
    if (age && isNumber(age)) user.age = age
    if (email && isEmail(email)) user.email = email
    if (first_name) user.first_name = first_name
    if (last_name) user.last_name = last_name
    await this.userRepository.save(user)
    return { message: "Updated Successfully" }
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    await this.userRepository.remove(user)
    return { message: "Data Remove Successfully" };
  }

  async createProfile(profileDto: ProfileDto) {
    const { bio, photo, userId } = profileDto
    const user = await this.userRepository.findOneBy({ id: userId })
    if (user) {
      const profile = await this.profileRepository.findOneBy({ userId })
      if (profile) {
        if (bio) profile.bio = bio
        if (photo) profile.photo = photo
        await this.profileRepository.save(profile)
      } else {
        let newProfile = this.profileRepository.create({ bio, photo, userId })
        newProfile = await this.profileRepository.save(newProfile)
        user.profileId = newProfile.id
        await this.userRepository.save(user)
      }
      return { message: "Profile Created/Update Successfully" }
    }
    throw new NotFoundException()
  }

  async findUserWithProfile(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { profile: true }
    })
    if (!user) throw new NotFoundException()
    return user
  }
}
