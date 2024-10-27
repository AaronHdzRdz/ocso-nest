import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Repository } from 'typeorm';
import { Manager } from './entities/manager.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>
  ) { }
  create(createManagerDto: CreateManagerDto) {
    return this.managerRepository.save(createManagerDto);
  }

  findAll() {
    return this.managerRepository.find();
  }

  findOne(id: string) {
    const manager = this.managerRepository.findOne({
      where: { managerId: id },
      relations: {
        location: true,
        user: true,
      }
    })
    if (!manager) throw new NotFoundException("No manager found")
    return manager;
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const manager = await this.managerRepository.preload({
      managerId: id,
      ...updateManagerDto,
    });
    return this.managerRepository.save(manager);
  }

  remove(id: string) {
    return this.managerRepository.delete({
      managerId: id
    });
  }
}
