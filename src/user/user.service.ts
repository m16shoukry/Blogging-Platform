import { Injectable } from '@nestjs/common';
import { UserRepository } from './entities/user.repository';
import { User, UserDocument } from './entities/user.schema';
import { SignupUserDto } from '../auth/dto/createUser.dto';
import { PaginateDto } from '../common/dto/pagination/paginate-sort-dto';
import { PaginateResultDto } from '../common/dto/pagination/paginate-result-dto';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository) {}

  async create(createUserDTO: SignupUserDto): Promise<UserDocument> {
    const user = await this.usersRepository.create(createUserDTO);
    return user;
  }

  async list(
    basePaginateDto: PaginateDto,
  ): Promise<PaginateResultDto<UserDocument>> {
    return await this.usersRepository.findAllPaginated(basePaginateDto);
  }

  async findOne(data: string): Promise<UserDocument> {
    return await this.usersRepository.findOne({ data });
  }

  async update(id: string, userData: Partial<User>): Promise<UserDocument> {
    return await this.usersRepository.findOneAndUpdate({ _id: id }, userData);
  }

  async remove(id: string): Promise<boolean> {
    return await this.usersRepository.deleteMany({ _id: id });
  }
}
