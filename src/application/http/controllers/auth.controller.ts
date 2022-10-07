import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import AuthService from '../../../domain/use-cases/auth.service';
import { PublicResponseTypes } from '../../docs/swagger/response-types.decorator';
import SigninDto from '../dtos/signin.dto';
import SignupDto from '../dtos/signup.dto';
import TokenDto from '../dtos/token.dto';
import ApiVersionEnum from '../enums/api-version.enum';

@ApiTags('[Public API] Authorization')
@Controller({
  version: ApiVersionEnum.V1,
  path: '/auth',
})
@PublicResponseTypes()
@UseInterceptors(ClassSerializerInterceptor)
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ description: 'Запрос на вход в систему' })
  @ApiOkResponse({ type: TokenDto })
  public async signin(@Body() incomingData: SigninDto): Promise<TokenDto> {
    const token = await this.authService.signin(incomingData);

    return new TokenDto(token);
  }

  @Post('signup')
  @ApiOperation({ description: 'Запрос на регистрацию в системе' })
  @ApiOkResponse({ type: Boolean })
  public create(@Body() incomingData: SignupDto): Promise<boolean> {
    return this.authService.signup(incomingData);
  }
}
