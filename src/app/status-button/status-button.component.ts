import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pipco-status-button',
  templateUrl: './status-button.component.html',
  styleUrls: ['./status-button.component.css']
})
/**
 * @param text displayed button text
 * @param status determines which symbol is being showed: undefined - loading, true - check mark, false - cross mark
 */
export class StatusButtonComponent implements OnInit {
  @Input() text: string;
  @Input() status: boolean;

  constructor() { }

  ngOnInit() { }
}