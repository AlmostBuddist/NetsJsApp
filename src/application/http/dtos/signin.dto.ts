import { PickType } from '@nestjs/swagger';

import UserCreateDto from './user-create.dto';

export default class SigninDto extends PickType(UserCreateDto, ['login', 'password']) {}
