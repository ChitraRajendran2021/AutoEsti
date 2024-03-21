import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private endpointId = '4702032888881741824';
  private projectId = '9624344675';
  private endpointUrl = `https://us-central1-aiplatform.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/endpoints/${this.endpointId}:predict`;

  constructor(private http: HttpClient) { }

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
    return 'YOUR_ACCESS_TOKEN';
  }
}
