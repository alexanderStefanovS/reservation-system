import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgbDate, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EventModel} from '../../models/event-model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  @ViewChild('addEvent', { static: false }) public addEvent: AddEventComponent;
  @Output() saveEvent: EventEmitter<any> = new EventEmitter<any>();

  private modalReference: any;
  public event = '';
  public date: NgbDate;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  open() {
    this.modalReference = this.modalService.open(this.addEvent, { centered: true, backdrop: 'static', keyboard: false });
  }

  close() {
    this.modalReference.close();
  }

  onSaveEvent() {
    const dateString = `${this.date.year}-${this.date.month}-${this.date.day}`;
    const date = new Date(Date.parse(dateString));
    const eventModel = new EventModel({name: this.event, date});
    this.saveEvent.emit(eventModel);

    this.event = null;
    this.date = null;
  }
}
