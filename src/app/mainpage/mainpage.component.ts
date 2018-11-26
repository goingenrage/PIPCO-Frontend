import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pipco-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  private videoSource: string = "http://127.0.0.1:8002/videostream";
                                //"http://192.168.0.35/cgi-bin/videostream.cgi?user=admin&pwd=admin";
                                //"http://eckardtscholz.viewnetcam.com/nphMotionJpeg?Resolution=640x480";
                                //"https://en.ipcams.ch/getCamHandlerMjpg.aspx?nr=2954&rand=3935";

  constructor() { }

  ngOnInit() {
  }

}
