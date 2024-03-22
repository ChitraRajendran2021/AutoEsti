import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncodeDecodeService {

  constructor() { }

  // Encode a value using base-64 encoding
  public encodeValue(value: string): string {
    return btoa(value);
  }

  // Decode a base-64 encoded value
  public decodeValue(encodedValue: string): string {
    return atob(encodedValue);
  }
}
