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
        content: imageData.toString().split(',')[1]
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
    return 'ya29.a0Ad52N3-8F96Y-aTpaMHMjuC6KhNCapHWWqjiZDiI53tqiDhP62yk6xkJUv_rjYgQpXxnsPPj7PbCKACHk2uS7XXgcD348aNS-8wpl5yq2IeDTMEJ7j-wOdEbK7TsM3CuF8ueeB6zC8_eddIzOiZ3R9W3SYXkQoq_G9i7HjGTcbCKsGnvSZO0DrOR1K_04IU1-82IbxbWXEU-siWuL7SXK4vzeNFAno0axI8YioodbaeqOL3LNX4SF9q_WEKcEpSzUTa52zP_LCcsigAOiN0sSwqQBPQ5zWe4cl0ttc97YgZgt9ewt0Qe1TEshbhi65zu3XaxelZlXbRQK28JPUMGPLfCnYo2yvEgr_t2G-pTypnqO_PgV1MxNbTb8pGAtpOczLGUXqxladhvDw2JPHCF6xsb4mRR3MAhaCgYKAUISARESFQHGX2MiIfJrsBKrvl-ABf05oStbUg0423';
  }
}
