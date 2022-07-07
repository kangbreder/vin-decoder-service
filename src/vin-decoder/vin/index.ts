import { region } from './region';
import { manufacturer } from './manufacturer';
import { year } from './year';

export function validate(vin) {
  return vin.match(/^[a-zA-Z0-9]+$/);
}

export function getRegion(wmi) {
  return region[wmi] ? region[wmi] : 'not_found';
}

export function getMake(wmi) {
  if (!manufacturer[wmi]) {
    return 'not_found';
  }
  return manufacturer[wmi] ? manufacturer[wmi] : manufacturer[wmi.slice(0, 2)];
}

export function getYear(type, vis) {
  return type.match(/^[0-9]+$/) ? year[vis] - 30 : year[vis];
}

export function sanitize(vin) {
  if (!vin.region) {
    vin.region = this.getRegion(vin.wmi);
  }
  if (!vin.make) {
    vin.make = this.getMake(vin.wmi);
  }
  return vin;
}

export class VinDecoder {

  static validate(vin) {
    return validate(vin);
  }

  static decode(vin) {
    return this.validate(vin)
      ? sanitize({
          vin: vin,
          valid: true,
          wmi: vin.slice(0, 3),
          vds: vin.slice(3, 8),
          checkDigit: vin.slice(8, 9),
          vis: vin.slice(9, 17),
          region: getRegion(vin.slice(0, 2)),
          make: getMake(vin.slice(0, 3)),
          year: getYear(vin.slice(6, 7), vin.slice(9, 10)),
          sequence_id: vin.slice(11, 17),
        })
      : { vin: vin, valid: false };
  }
}
