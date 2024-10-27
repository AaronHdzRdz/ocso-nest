import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providersRepository: Repository<Provider>,
  ) { }
  create(createProviderDto: CreateProviderDto) {
    return this.providersRepository.save(createProviderDto);
  }

  findAll() {
    return this.providersRepository.find();
  }

  findOne(id: string) {
    return this, this.providersRepository.findOne({
      where: {
        providerId: id,
      }
    });
  }

  findOneByName(name: string) {
    const provider = this.providersRepository.findBy({
      providerName: Like(`%${name}%`)
    })
    if (!provider) throw new NotFoundException();
    return provider;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const product = await this.providersRepository.preload({
      providerId: id,
      ...updateProviderDto
    });
    return this.providersRepository.save(product);
  }

  remove(id: string) {
    this.providersRepository.delete({
      providerId: id
    })
    return {
      message: "Provider deleted"
    }
  }
}