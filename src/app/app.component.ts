import { Component, ElementRef, ViewChild } from '@angular/core';
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
  isEnaleModel: boolean = false;
  imageData: string | ArrayBuffer | null = null; 

  // Properties for user input
  username: string = '';
  email: string = '';
  insuranceProviders: string = '';
  number: string = '';
  carBrand: string = '';
  insuranceProvidersList: string[] = ['State Farm', 'GEICO', 'Progressive', 'Allstate'];
  selectedInsuranceProvider: string = ''; 

  @ViewChild('predictionsModal') predictionsModal!: ElementRef;

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
       // this.predictions = response;
       console.log(response);
       this.predictions = [
        { ItemName: 'Bumper', LabourCharge: '$200', InsuranceEligibility: 'Not Required'},
        { ItemName: 'WindShield', LabourCharge: '$150', InsuranceEligibility: '$500'},
        { ItemName: 'Paint', LabourCharge: '$500', InsuranceEligibility: '$1500'}
      ];
        this.loading = false;
        this.isEnaleModel = true;
      },
      (error) => {
        // Handle error if any
        this.predictions = [
          { ItemName: 'Bumper', LabourCharge: '$200', InsuranceEligibility: 'Not Required'},
          { ItemName: 'WindShield', LabourCharge: '$150', InsuranceEligibility: '$500'},
          { ItemName: 'Paint', LabourCharge: '$500', InsuranceEligibility: '$1500'}
        ];
        console.error('Prediction failed:', error);
        this.loading = false;
        this.isEnaleModel = true;
      }
    );
  }

  fileChanged(event: any) {
    this.isEnale = true;
    const input = event.target;
    if (input && input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onloadstart = () => {
        this.loading = true;
      };

      reader.onload = (e) => {
        if (e.target?.result) {
          // Set the image data
          this.imageData = e.target.result;
        }
        this.loading = false; // Hide loading symbol
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  sendToInsurance() {
    // Display the message within the modal
    const message = `Request has been sent to your insurance company - ${this.selectedInsuranceProvider}. You will receive an email at ${this.email}.`;
    this.showMessageInModal(message);
    this.isEnaleModel = false;
  }

  showMessageInModal(message: string) {
    // Update the modal body to display the message
    const modalBody = this.predictionsModal.nativeElement.querySelector('.modal-body');
    modalBody.innerHTML = `<p>${message}</p>`;
    // Close the modal after displaying the message
  }

  closeModal() {
    // Close the modal
    const modal = this.predictionsModal.nativeElement;
    modal.classList.remove('show');
    modal.setAttribute('aria-modal', 'false');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.body.style.paddingRight = '0px';
    const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
  }
}
