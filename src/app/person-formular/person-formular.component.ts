import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Person } from '../shared/models/person';
import { PersonService } from '../shared/person.service';
import { extend } from 'webdriver-js-extender';
import { Injectable } from '@angular/core';

@Component({
  selector: 'pipco-person-formular',
  templateUrl: './person-formular.component.html',
  styleUrls: ['./person-formular.component.css']
})

@Injectable({
  providedIn: 'root',
})

export class PersonFormularComponent {

  constructor( private personService: PersonService  ){} 
  submitButtonDisabled: Boolean = true;
  selectedFile: File = null;
  person: Person = new Person();
  fileToUpload: File = null;

onFileSelected(event, setFileHash){
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
    this.personService.addNewPerson(this.person).subscribe();
}
}
