import { HttpService, Injectable } from '@nestjs/common';
import { VinDecoder } from './vin';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

export interface Result {
  Value: string;
  ValueId: string;
  Variable: string;
  VariableId: number;
}

export interface NHTSAResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: Result[];
}

@Injectable()
export class VinDecoderService {
  constructor(private readonly httpService: HttpService) {}

  decode(vin: string): string {
    const searchValues = [
      'Vehicle Type',
      'Make',
      'Model',
      'Body Class',
      'Vehicle Type',
    ];
    return this.getExtended(vin).pipe(
      map((response: any) => {
        const data = response?.data as NHTSAResponse;
        const responseObject = {};
        for (const item of data?.Results?.filter((value) => value.Value)
          ?.filter((value) => searchValues.includes(value.Variable))
          ?.filter((value) => value.Value !== 'Not Applicable')) {
          let key = item.Variable.replace(' ', '');
          key = key[0].toLowerCase() + key.slice(1);
          responseObject[key] = item.Value;
        }
        return { ...VinDecoder.decode(vin), ...responseObject };
      }),
      catchError((err) => of(VinDecoder.decode(vin))),
    );
  }

  nhtsaDecode(vin: string): string {
    return VinDecoder.decode(vin);
  }

  getExtended(vin: string): any {
    return this.httpService.get(
      `https://vpic.nhtsa.dot.gov/api//vehicles/DecodeVin/${vin}?format=json`,
    );
  }
}
