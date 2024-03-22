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
    return 'ya29.a0Ad52N3-XiLQwAZxH0TDpH8m4VmpImhkmZVRZx6aoOhxZJJIFNqwMU0aLyLsZkiHghx98qCKL_5ZoENkUmYg6cjGLBZoJe2FwSlOZ9-piQt5NXMUYofoIskjpkvYFf2QxY2qfpVjRcr5Zfm6do3Rbg0XN9zEws5fQGYu4zXvjV69TYLE7mqwI1sx6rsB5niX4kfnqgkoVQ3UWZF4HailMdvDvUsGSyTmdmkGj2DiVQx84Dht2idPAlAnm6iyAy_F1LwnCAQlI2lu56DmdJQBUQaSi8e_H7M9RYm6gIvK5bhP9JAbxqwd3dOQ1UwlF--TFbgXWwQKBx72aDxYaGoI0rTn0ozlfJwW_jYsE7N69-GGVTY4O0q_4hY2LC6LhkpERRtYOYwg_1Oxmo0w9X1zLe35GzTQZF_npaCgYKARgSARESFQHGX2Mi1vF2TK-FVKH8ELr0SuV21Q0423';
  }
}
