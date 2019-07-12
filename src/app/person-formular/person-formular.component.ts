import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Person } from '../shared/models/person';
import { PersonService } from '../shared/person.service';
import { extend } from 'webdriver-js-extender';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pipco-person-formular',
  templateUrl: './person-formular.component.html',
  styleUrls: ['./person-formular.component.css']
})

export class PersonFormularComponent {

  constructor(){} 
  private personService: PersonService;
  private subscriptions: Subscription[] = [];
  submitButtonDisabled: Boolean = true;
  selectedFile: File = null;
  person: Person = new Person();
  fileToUpload: File = null;

  ngOnInit() { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(entry => entry.unsubscribe);
  }

onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    var reader = new FileReader();
    reader.onloadend = (e) => {
      this.person.file = reader.result;
    }
    if (this.selectedFile != null){
      this.submitButtonDisabled=null;
    }else{
      this.submitButtonDisabled=true;
    }

    reader.readAsDataURL(this.selectedFile);
}

onUpload(){
    this.subscriptions.push(this.personService.addNewPerson(this.person).subscribe(result =>{
      if (result["person_id"] != 0){
        this.person.name = "";
        this.person.surname = "";
        this.person.comment = "";
        this.person.file = null;
        this.selectedFile = null;
      }
    }))
}
}
