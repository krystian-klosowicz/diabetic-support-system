import {
  Component,
  Inject,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chart, registerables } from 'chart.js';
import * as moment from 'moment';
import 'chartjs-adapter-moment';
import * as dateFns from 'date-fns';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-chart-dialog',
  templateUrl: './chart-dialog.component.html',
  styleUrls: ['./chart-dialog.component.css'],
})
export class ChartDialogComponent implements AfterViewInit {
  @ViewChild('sugarChart') sugarChart: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<ChartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { sugarMeasurements: any }
  ) {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    console.log(this.data.sugarMeasurements);
    const ctx = this.sugarChart.nativeElement.getContext('2d');

    const sugarData = this.data.sugarMeasurements.map((measurement: any) => ({
      x: new Date(measurement.measurement_date),
      y: measurement.sugar_level,
    }));

    new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Blood Sugar Level',
            data: sugarData,
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'hour',
              displayFormats: {
                hour: 'HH:mm',
              },
            },
            title: {
              display: true,
              text: 'Time',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Blood Sugar Level',
            },
          },
        },
      },
    });
  }
}
