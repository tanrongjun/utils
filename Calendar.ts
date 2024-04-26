/**
 * 当月日历组件 补齐了上月月底和下月月初的几天
 */
import dayjs, { Dayjs } from 'dayjs';

interface DayInfo {
  dayOfWeek: number;
  year: number;
  month: number;
  day: number;
  dateString: string;
  dayjsOrigin: Dayjs;
  isToday: boolean;
  isPast: boolean;
  isFuture: boolean;
}

function getDays(dayjsObj: Dayjs = dayjs()): DayInfo[] {
  const daysInMonth = dayjsObj.daysInMonth();
  const firstDay = dayjsObj.startOf('month').day();
  const result: DayInfo[] = [];

  for (let i = 0; i < daysInMonth; i++) {
    const dayjsOrigin = dayjsObj.date(i + 1);
    const dayOfWeek = dayjsOrigin.day();
    const year = dayjsOrigin.year();
    const month = dayjsOrigin.month() + 1;
    const day = dayjsOrigin.date();
    const dateString = dayjsOrigin.format('YYYY-MM-DD');

    result.push({
      dayOfWeek,
      year,
      month,
      day,
      dateString,
      dayjsOrigin,
      isToday: dateString === dayjsObj.format('YYYY-MM-DD'),
      isPast: dayjsObj.isAfter(dayjsOrigin),
      isFuture: dayjsOrigin.isAfter(dayjsObj)
    });
  }

  // 补齐前面的空白日期
  const beforeDays = []
  for (let i = 0; i < firstDay; i++) {
    const dayjsOrigin = dayjsObj.date(-firstDay + i + 1);
    const dayOfWeek = dayjsOrigin.day();
    const year = dayjsOrigin.year();
    const month = dayjsOrigin.month() + 1;
    const day = dayjsOrigin.date();
    const dateString = dayjsOrigin.format('YYYY-MM-DD');

    beforeDays.push({
      dayOfWeek,
      year,
      month,
      day,
      dateString,
      dayjsOrigin,
      isToday: dateString === dayjsObj.format('YYYY-MM-DD'),
      isPast: dayjsObj.isAfter(dayjsOrigin),
      isFuture: dayjsOrigin.isAfter(dayjsObj)
    });
  }

  result.unshift(...beforeDays)

  // 补齐后面的空白日期
  const lastDay = dayjsObj.endOf('month').day();
  for (let i = 0; i < 6 - lastDay; i++) {
    const dayjsOrigin = dayjsObj.date(daysInMonth + i + 1);
    const dayOfWeek = dayjsOrigin.day();
    const year = dayjsOrigin.year();
    const month = dayjsOrigin.month() + 1;
    const day = dayjsOrigin.date();
    const dateString = dayjsOrigin.format('YYYY-MM-DD');

    result.push({
      dayOfWeek,
      year,
      month,
      day,
      dateString,
      dayjsOrigin,
      isToday: dateString === dayjsObj.format('YYYY-MM-DD'),
      isPast: dayjsObj.isAfter(dayjsOrigin),
      isFuture: dayjsOrigin.isAfter(dayjsObj)
    });
  }

  return result;
}

const d = new Date(2024, 2, 1)
const day = dayjs(d)
console.log('getDays', dayjs(), getDays(day));

export default getDays
