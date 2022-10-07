import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import * as config from 'config';

@Controller({
  path: 'health',
  version: VERSION_NEUTRAL,
})
@ApiTags('health')
export default class HealthController {
  private readonly healthChecks = [...this.getDatabaseHealthCheck()].filter(Boolean);

  constructor(
    private readonly health: HealthCheckService,
    private readonly databaseHealthIndicator: TypeOrmHealthIndicator,
  ) {}

  @Get('/check')
  @HealthCheck()
  public check(): Promise<HealthCheckResult> {
    const { healthChecks } = this;

    return this.health.check(healthChecks);
  }

  private getDatabaseHealthCheck() {
    const isDatabaseHealthCheckFlag: string = config.get('app.health.is_db_check');
    const isDatabaseHealthCheck = this.toBoolean(isDatabaseHealthCheckFlag);

    return isDatabaseHealthCheck
      ? [() => this.databaseHealthIndicator.pingCheck(TypeOrmHealthIndicator.name)]
      : [];
  }

  private toBoolean(flag: string): boolean {
    return [true, '1'].includes(flag);
  }
}
