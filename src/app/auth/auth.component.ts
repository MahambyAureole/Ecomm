import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  currentDate = new Date();
  currentTime = new Date();
  futureDate = new Date(this.currentDate.getTime());

  constructor(private route: Router, private location: Location){
    this.futureDate.setDate(this.currentDate.getDate());
  }

  seConnecter(){
    this.route.navigateByUrl("authentification/connection");
    this.location.replaceState("authentification/connection")
  }

  inscrire(){
    this.route.navigateByUrl("authentification/inscription");
    this.location.replaceState("authentification/inscription");
  }

  ngOnInit(){
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }
  
}
