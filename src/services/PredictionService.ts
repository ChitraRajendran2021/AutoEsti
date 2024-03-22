import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EncodeDecodeService } from './EncodeDecodeService';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  
    private decprojectId = this.encodeAndDecodeValue('OTYyNDM0NDY3NQ==');
    private decendpointId = this.encodeAndDecodeValue('NDcwMjAzMjg4ODg4MTc0MTgyNA==');
    
    private endpointUrl = `https://us-central1-aiplatform.googleapis.com/v1/projects/${this.decprojectId}/locations/us-central1/endpoints/${this.decendpointId}:predict`;
    
    constructor(private http: HttpClient,private encodeDecodeService: EncodeDecodeService) { }
    
    encodeAndDecodeValue(encodedValue: string) {
       return this.encodeDecodeService.decodeValue(encodedValue);
    }
  predict(imageData: string | ArrayBuffer): Observable<any> {
    const requestBody = {
      instances: [{
        content: imageData
      }],
      parameters: {
        confidenceThreshold: 0.5,
        maxPredictions: 5
      }
    };

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.getAccessToken()}`)
      .set('Content-Type', 'application/json');

    return this.http.post(this.endpointUrl, requestBody, { headers });
  }

  private getAccessToken(): string {
    // Call gcloud auth print-access-token and return the access token
    return 'ya29.a0Ad52N3-xN9X8icnkrwuyXgufEKkBk_jxLMJokgXfl6z8TRXqAxcevz-IcDluWNct2TiI5iQxuHYxax81I3Oh8xbBR6boL115nodVCrZV5tlhHUME8EPiWmROCCjkoDoVRwNajA1Jc81AePDkv6IbWSpML6lQWdaKZ03G-DwvVkeqQ6xrwGBi1PusjZGvwPL6M72uILwXpYOztEezQbl768Mt-RgsvZ2LZSTn4mTTqzPQ6lBygfudu1Ss1NCBcUnW0QL8pKc_tcc1D1fxa6h1RKUQxOn_VMxEJiziJdFPSTdtHNl7dBhWuWOa1fA7ORjC8jTf7LXtgr1x2jxHMw0DJVTHgrtrHxEf2Pj4lH5mbPJTDP5QzBGEUOX4MHqwMl-Xxvjpp4za8U3j7UKMbX9P0032g8Tk44UaCgYKAe0SARESFQHGX2MiBUU0Gak_6D7fEcZb9cuP9w0422';
  }
}
