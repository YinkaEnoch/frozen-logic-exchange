import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesService } from './currencies.service';

describe('CurrenciesService', () => {
  let service: CurrenciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrenciesService],
    }).compile();

    service = module.get<CurrenciesService>(CurrenciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all currency pairs', () => {
    expect(service.findAll()).toEqual([{ base: 'USD', pair: 'NGN' }]);
  });

  it('should create a new currency exchange quote', () => {});

  it('should fail to create a currency exchange quote: missing data', () => {});

  it('should fetch the latest currency exchange quote', () => {});

  it('should fetch a currency exchange quote at a specfied time', () => {});

  it('should convert a currency to another currency', () => {});

  it('should convert a currency to another currency at a specified time', () => {});
});
