import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-insulin-calculator',
  templateUrl: './insulin-calculator.component.html',
  styleUrl: './insulin-calculator.component.css',
})
export class InsulinCalculatorComponent {
  formGroup: FormGroup;
  meal: string = 'breakfast'; // Początkowa wartość dla Meal
  insulin_dose: number | null = null;
  carbohydrateExchanges: number;
  conversionFactor: number = 1; // Początkowa wartość dla Conversion Factor
  correctionValue: number = 30; // Początkowa wartość dla Correction Value

  onSubmit() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value.carbohydrateExchanges);
      console.log(this.formGroup.value.conversionFactor);
      console.log(this.formGroup.value.correctionValue);
      this.insulin_dose =
        this.formGroup.value.carbohydrateExchanges *
          this.formGroup.value.conversionFactor +
        this.formGroup.value.correctionValue * 0.1;
    }
  }

  public ngOnInit() {
    this.initForm();
  }

  private initForm() {
    //TODO:
    //to ma być ztypowane generyk
    //wszedzie gdzie FormGroup, FormControl <typ>
    this.formGroup = new FormGroup({
      meal: new FormControl('', [Validators.required]),
      carbohydrateExchanges: new FormControl('', [Validators.required]),
      conversionFactor: new FormControl('', [Validators.required]),
      correctionValue: new FormControl('', [Validators.required]),
    });
  }
}
