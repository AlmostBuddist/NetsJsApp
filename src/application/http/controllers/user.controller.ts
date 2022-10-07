import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import UserService from '../../../domain/use-cases/user.service';
import { PrivateResponseTypes } from '../../docs/swagger/response-types.decorator';
import IdDto from '../dtos/id.dto';
import UserDto from '../dtos/user.dto';
import UserCreateDto from '../dtos/user-create.dto';
import UserFindFilterDto from '../dtos/user-find-filter.dto';
import UserUpdateDto from '../dtos/user-update.dto';
import ApiVersionEnum from '../enums/api-version.enum';
import AuthJwtGuard from '../guards/auth-jwt.guard';

@ApiTags('[Private API] Users')
@Controller({
  version: ApiVersionEnum.V1,
  path: '/users',
})
@PrivateResponseTypes()
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthJwtGuard)
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ description: 'Запрос на получение пользователей по фильтру' })
  @ApiOkResponse({ type: UserDto, isArray: true })
  public async findMany(@Query() incomingData: UserFindFilterDto): Promise<UserDto[]> {
    const users = await this.userService.findMany(incomingData);

    return users.map((user) => new UserDto(user));
  }

  @Get(':id')
  @ApiOperation({
    description: 'Запрос на получение пользователя по идентификатору',
  })
  @ApiOkResponse({ type: UserDto })
  public async findOneById(@Param() { id }: IdDto): Promise<UserDto> {
    const user = await this.userService.findOneById(id);

    return new UserDto(user);
  }

  @Post()
  @ApiOperation({ description: 'Запрос на создание пользователя' })
  @ApiOkResponse({ type: UserDto })
  public async create(@Body() incomingData: UserCreateDto): Promise<UserDto> {
    const user = await this.userService.create(incomingData);

    return new UserDto(user);
  }

  @Put(':id')
  @ApiOperation({ description: 'Запрос на обновление пользователя' })
  @ApiOkResponse({ type: Boolean })
  public async update(
    @Param() { id }: IdDto,
    @Body() incomingData: UserUpdateDto,
  ): Promise<boolean> {
    return this.userService.update(id, {
      ...incomingData,
    });
  }

  @Delete(':id')
  @ApiOperation({ description: 'Запрос на удаление пользователя' })
  @ApiOkResponse({ type: Boolean })
  public softDeleteById(@Param() { id }: IdDto): Promise<boolean> {
    return this.userService.deleteById(id);
  }
}
