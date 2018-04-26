import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import index from "@angular/cli/lib/cli";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat: number = 51.50853;
  lng: number = -0.12574;
  from:string;
  to:string;
  status:boolean =true;
  sourceFrom:any[]=[];
  formAuto:FormGroup;
  markers:any = []



  constructor(private api:ApiService,private fb:FormBuilder) {
    this.createForm()
  }

  createForm(){
     this.formAuto =this.fb.group(
        {
          from:['',Validators.required],
          to:['',Validators.required],
          date :[''],
          phone :[''],
      }
     )
  }

  From(event){
     if(event.target.value.length > 2){

      this.api.findCity(event.target.value).subscribe(data=> {
        data = JSON.parse(data)
        data['predictions'].map(val=>{


          this.sourceFrom.push(val.description)

        })

      });

    }

  }
  Next(){
     if(this.formAuto.valid){
        this.status =false;
        console.log("continue")
      }
  }
  getPostiton(event){

   if(this.markers.length < 2){
      this.markers.push({
          'lat': event.coords.lat,
           'lng': event.coords.lng
      })

   }
   }
   delete(){
     this.from = "";
     this.to ="";
     this.markers =[]
     this.status = true
   }

  ngOnInit() {

  }


}
