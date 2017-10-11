import { CalendarDate, DateService } from '../../services/date.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  private showDays: Array<number>;
  private calendarDate: CalendarDate;

  constructor(private dateService: DateService) { }

  ngOnInit() {
    this.calendarDate = this.dateService.initCalendar();
    this.showDays = this.dateService.calculateCalendar(this.calendarDate);
  }

  preMonth() {
    this.calendarDate.nowMonth = this.calendarDate.nowMonth - 1;
    if (this.calendarDate.nowMonth < 1) {
      this.calendarDate.nowYear = this.calendarDate.nowYear - 1;
      this.calendarDate.nowMonth = 12;
    }
    this.excute();
  }

  preYear() {
    this.calendarDate.nowYear = this.calendarDate.nowYear - 1;
    this.excute();
  }

  nextMonth() {
    this.calendarDate.nowMonth = this.calendarDate.nowMonth + 1;
    if (this.calendarDate.nowMonth > 12) {
      this.calendarDate.nowYear = this.calendarDate.nowYear + 1;
      this.calendarDate.nowMonth = 1;
    }
    this.excute();
  }

  nextYear() {
    this.calendarDate.nowYear = this.calendarDate.nowYear + 1;
    this.excute();
  }

  filpOver(el, director) {

  }

  excute() {
    this.calendarDate.days = new Date(this.calendarDate.nowYear, this.calendarDate.nowMonth, 0).getDate();
    this.calendarDate.weekStart = new Date(this.calendarDate.nowYear, this.calendarDate.nowMonth - 1, 1).getDay();
    this.showDays = this.dateService.calculateCalendar(this.calendarDate);
  }

}
