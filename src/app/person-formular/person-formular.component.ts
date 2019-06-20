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
  
  selectedFile: File = null;
  person: Person = new Person();
  fileToUpload: File = null;


  saveTask(value:any){
    console.log(value);
  }
  
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}
  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
  }

onUpload(){
  const fd = new FormData();
  fd.append('name', this.person.name);
  fd.append('surname', this.person.surname);
  fd.append('comment', this.person.comment);
  fd.append('image', this.selectedFile, this.selectedFile.name);
  console.log(fd);

  this.personService.addNewPerson(fd).subscribe(res => console.log(res));
}
}
