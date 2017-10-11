import { Injectable } from '@angular/core';

// 页面显示的天数
const totalDay = 42;

@Injectable()
export class DateService {

  constructor() { }

  /**
   * 计算出显示到页面的calendar
   * @memberof DateService
   */
  calculateCalendar(calendarDate: CalendarDate) {
    const dayList = new Array();
    for (let i = 0; i < totalDay / 7; i++) {
      dayList[i] = [];
    }
    const monthStart = calendarDate.weekStart === 0 ? 6 : calendarDate.weekStart === 1 ? 1 : calendarDate.weekStart - 1;
    const preMonthDay = new Date(
      calendarDate.nowMonth === 1 ? calendarDate.nowYear - 1 : calendarDate.nowYear,
      calendarDate.nowMonth - 1, 0).getDate();
    const nextMonthDayInpanel = totalDay - calendarDate.days - monthStart;
    // 页面上一共显示42天
    // 上月显示日期
    for (let x = preMonthDay - monthStart; x < preMonthDay; x++) {
      dayList[0].push(x + 1);
    }
    // 本月显示日期
    for (let z = 1; z <= calendarDate.days; z++) {
      let firstWeek = 7 - monthStart;
      if (z <= firstWeek) {
        // 第一周
        dayList[0].push(z);
      } else {
        // 第二周至最后一周
        let temp = z / 7;
        if (temp <= 1) {
          dayList[Math.ceil(temp)].push(z);
        } else {
          if (dayList[Math.floor(temp)].length < 7) {
            dayList[Math.floor(temp)].push(z);
          } else {
            dayList[Math.ceil(temp)].push(z);
          }
        }
      }
    }
    // 将显示在页面的下个月的日期push至dayList
    for (let y = 0; y < nextMonthDayInpanel; y++) {
      let index = Math.floor(totalDay / 7);
      if (dayList[index - 2].length < 7) {
        dayList[index - 2].push(y + 1);
      } else {
        dayList[index - 1].push(y + 1);
      }
    }
    return dayList;
  }

  /**
   * 初始化calendar
   * @memberof DateService
   */
  initCalendar() {
    const calendarDate = new CalendarDate();
    calendarDate.nowDate = new Date();
    calendarDate.nowDay = Number.parseInt(calendarDate.nowDate.toLocaleString().split('/')[2]);
    calendarDate.nowMonth = calendarDate.nowDate.getMonth() + 1;
    calendarDate.nowYear = calendarDate.nowDate.getFullYear();
    // 获取本月天数
    calendarDate.days = new Date(calendarDate.nowYear, calendarDate.nowMonth, 0).getDate();
    // 获取本月第一天是星期几
    calendarDate.weekStart = new Date(calendarDate.nowYear, calendarDate.nowMonth - 1, 1).getDay();
    return calendarDate;
  }

  /**
   * 判断是否为闰年
   * @param {number} year
   * @returns
   * @memberof DateService
   */
  isLeapYear(year: number) {
    return (year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0) ? true : false;
  }

}

export class CalendarDate {
  public nowDay: number;
  public nowMonth: number;
  public nowYear: number;
  public nowDate: Date;
  public month: number;
  public days: number;
  public year: number;
  public weekStart: number;
}
