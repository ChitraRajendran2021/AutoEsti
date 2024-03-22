import { Component } from '@angular/core';
import { PredictionService } from '../services/PredictionService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GenEsti';
  description = 'An AutoAid EstimateAssistant';
  predictions: any[] = [];
  loading: boolean = false;
  isEnale: boolean = false;
  imageData: string | ArrayBuffer | null = 'null'; 

    // Properties for user input
    username: string = '';
    email: string = '';
    insuranceProviders: string = '';
    carBrand: string = '';
    insuranceProvidersList: string[] = ['State Farm', 'GEICO', 'Progressive', 'Allstate']; // Predefined list of insurance providers
    selectedInsuranceProvider: string = ''; 

  constructor(private predictionService: PredictionService) {}
  predict() {
    this.loading = true;
        // Prepare user input data
        const userInput = {
          username: this.username,
          email: this.email,
          insuranceProviders: this.insuranceProviders.split(','), // Convert comma-separated string to an array
          carBrand: this.carBrand
        };
    
    if (!this.imageData) {
      console.error('No image data available.');
      return;
    }
     this.predictionService.predict(this.imageData).subscribe(
        (response) => {
          // Handle the response from the prediction service
          this.predictions = response;
          this.loading = false;
        },
        (error) => {
          // Handle error if any
          console.error('Prediction failed:', error);
          this.loading = false;
        }
      );
  }
 /* predict() {
    // Simulating a delay for demonstration purposes
    this.loading = true;
    setTimeout(() => {
      // Your predict function logic here
      // For demonstration, populating predictions with sample data
      this.predictions = [
        { ItemName: 'Bumper', LabourCharge: '$200', InsuranceEligibility: '80%'},
        { ItemName: 'WindShield', LabourCharge: '$150', InsuranceEligibility: '100%'},
        { ItemName: 'Paint', LabourCharge: '$500', InsuranceEligibility: '60%'}
      ];
      this.loading = false;
    }, 2000);
  } */


  fileChanged(event: any) {
    this.isEnale = true
    var input = event.target;
    if (input && input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onloadstart = () => {
        this.loading = true;
      };

      reader.onload = (e) => {
        if (e.target?.result) {
          this.imageData = e.target.result;
        }
        this.loading = false; // Hide loading symbol
      };

      reader.readAsDataURL(input.files[0]);
    }
  }
}