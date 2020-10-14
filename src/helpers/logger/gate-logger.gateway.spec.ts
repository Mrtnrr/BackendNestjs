import { Test, TestingModule } from '@nestjs/testing';
import { GateLoggerGateway } from './gate-logger.gateway';

describe('GateLoggerGateway', () => {
  let gateway: GateLoggerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GateLoggerGateway],
    }).compile();

    gateway = module.get<GateLoggerGateway>(GateLoggerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
