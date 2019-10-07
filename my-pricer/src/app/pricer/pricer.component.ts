import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApirestService } from '../service/apirest.service';
import { Obligation } from '../obligation';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-pricer',
  templateUrl: './pricer.component.html',
  styleUrls: ['./pricer.component.css']
})
export class PricerComponent implements OnInit {
  checkoutForm;
  ratecurve;
  highcharts = Highcharts;
  chartOptions ;


  constructor(
      private service: ApirestService,
      public fb: FormBuilder
    ){
    this.addObligation();
    this.sendDataChart();
  }

  ngOnInit(){
    //recuperation des données
    this.sendDataChart();
  }

  addObligation() {
    this.checkoutForm = this.fb.group({
      Nominal: '200',
      Periodicity: '6',
      Taux: '0.23',
      Coupon: '1.5',
      Maturity: '2',
      IssueDate: '2011-01-04'
    });
  }

  //envoie des données dans le chart
  DrawCurve(res){
    this.chartOptions = {
      chart: {
          type: "spline"
      },
      title: {
          text: "Courbe de taux"
      },
      xAxis:{
        title:{
            text: "Maturité "
        },
          categories: res.Duree
      },
      yAxis: {
          title:{
            text: "Taux"
          }
      },
      series: [{
        name: res.Date ,
        data: res.Taux
      }]
    }
  };


  sendDataChart(){
    this.service.getRateCurves().subscribe(res => {
      console.log(res);
      this.DrawCurve(res);
    }, err => {
      console.log(err);
    });
  }

   onSubmit(customerData) {
      console.log(customerData);
      this.service.addObligation(customerData).subscribe(res => {
        console.log(res);
        this.DrawCurve(res);
      });

  }


}
