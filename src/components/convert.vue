<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { list } from "./list"
import './style.css'
interface _list {
    date: object[],
    start_time: string,
    end_time: string,
    opening_time: string,
    time_duration: number, 
    intervals: number
}
const chair_number = list.date.length;//椅子数量
const { date, start_time, end_time, opening_time, time_duration, intervals }:_list = { ...list };
console.log(date, start_time, end_time, opening_time, time_duration, intervals);

const week: string[] = ['一', '二', '三', '四', '五', '六', '日'];//模板显示


let year = ref<number>(new Date().getFullYear());//当前年份
let month = ref<number>(new Date().getMonth() + 1);//当前月份


watch(month, (new_month: number, old_month: number) => {
  if (new_month > 12 || new_month < 1 || typeof(new_month) !== "number") {
    month.value = old_month
  }
})//防止用户输入小于1大于12的月份

let days_state = computed(() => {
  let state = days.value.map(item => {
    if (!item) {
      return false
    }
    return calibration(year.value + "-" + month.value + "-" + item)
  })
  return state
})//计算哪些日期在起始结束日期内




let date_responsive = computed(() => {
  return year.value + "-" + month.value + "-1"
})
const days_computed = (d?: string) => {
  d = d || date_responsive.value;
  let days: any[] = [],
    first_day = new Date(d).getDay();
  first_day = first_day === 0 ? 7 : first_day;
  const month_days = get_month_days(new Date(d).getMonth() + 1, new Date(d).getFullYear())
  for (let i = 0; i < first_day - 1; i++) {
    days.push(null)
  }
  for (let i = 0; i < month_days; i++) {
    days.push(i + 1)
  }
  return days
}
let days = computed(() => {
  return days_computed(date_responsive.value)
})
function get_month_days(m: number, y?: number): number {
  if (m < 1 || m > 12) {
    throw console.error("Months must be within 1-12");
  }
  y = y ? y : new Date().getFullYear()
  const t = [31, y % 4 !== 0 ? 28 : 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return t[m - 1]
}
function calibration(d?: string): boolean {
  d = d || date_responsive.value

  let state = false
  if (auxiliary_calibration(d) >= auxiliary_calibration(start_time) && auxiliary_calibration(d) <= auxiliary_calibration(end_time)) {
    state = true
  }
  return state
}//对比时间戳来确定开始结束之间的日期

/**
 * 返回时间戳
 * @param t
 * e.g:"1990-1-1"
 * @return "631123200000"
 */
function auxiliary_calibration(t: string): number {
  return new Date(t).getTime()
}






let open_state = ref<boolean>(false)
let select_days = ref() //
function open_child(bool: boolean, days: number): void {
  if (!bool) { return }
  select_days.value = days
  open_state.value = true
}//打开小窗



let time_list: any = list.date//初始化数据
let time: any = ref(null);
let display = ref<any[]>([]);
let opening_reg: any = /(?<start_hour>\d+)\:(?<start_minutes>\d+)\-(?<end_hour>\d+?)\:(?<end_minutes>\d+)/g.exec(opening_time),
  exec_time = {
    start_hour: opening_reg?.groups.start_hour,
    start_minutes: opening_reg?.groups.start_minutes,
    start_all_minutes: +opening_reg?.groups.start_hour * 60 + +opening_reg?.groups.start_minutes,
    end_hour: opening_reg?.groups.end_hour,
    end_minutes: opening_reg?.groups.end_minutes,
    end_all_minutes: +opening_reg?.groups.end_hour * 60 + +opening_reg?.groups.end_minutes,
  }
function list_display(index: any) {
  let reg: RegExp = /^(?<start_year>\d+)\-(?<start_month>\d+)\-(?<start_day>\d+)\s(?<start_hour>\d+)\:(?<start_minutes>\d+)\,(?<end_year>\d+)\-(?<end_month>\d+)\-(?<end_day>\d+)\s(?<end_hour>\d+)\:(?<end_minutes>\d+)$/;
  time.value = time_list[index];

  console.log(exec_time);
  display.value = [];
  let filtration_time:any[] = [];
  if (time.value === undefined) {
    return display.value.push("该椅子暂时不能预约")
  }
  if (time.value.reservation_log === null) {
    return display.value.push("无预约")
  }
  time.value.reservation_log.forEach((item: any) => {
    
    if (!reg.exec(item)) {
      throw console.log(index + "号椅子预约信息有误，请联系管理员")
    }
    let t = { ...reg.exec(item)?.groups };
    if (+(t.start_year) === year.value && +(t.end_year) === year.value &&
      +(t.start_month) === month.value && +(t.end_month) === month.value &&
      +(t.start_day) === select_days.value && +(t.end_day) === select_days.value
    ) {
      console.log(item, 'item');
      filtration_time.push(item)
    }
    
    
  });
  // display.value.push(t.start_hour + ":" + t.start_minutes + " 到 " + t.end_hour + ":" + t.end_minutes + "被预约")
  //     console.log(t);
  //     if ((+t.start_hour * 60 + +t.start_minutes - exec_time.start_all_minutes) > 60) {
  //       console.log(`${exec_time.start_hour}:${exec_time.start_minutes}到${t.start_hour}:${t.start_minutes}时间段可预约`);
  //     }
  //     console.log();
  console.log(filtration_time);
  for(let count = 0; count < filtration_time.length; count++){
    let exe = /((\d+)\:(\d+))+/g
    
    console.log(exe.exec(filtration_time[count]));
    
    if(count = filtration_time.length-1){

    }
  }
  if (display.value.length === 0) {
    return display.value.push("无预约")
  }






}//椅子的预约信息


let icon_level = computed(() => {
  let all_time_list: any[] = [],
    result: any = [],
    reg = /(\d+)\-(\d+)\-(\d+)\s(\d+)\:(\d+)\,(\d+)\-(\d+)\-(\d+)\s(\d+)\:(\d+)/g,
    res;
  time_list.forEach((item: any) => {
    if (item.reservation_log) {
      all_time_list.push(...item.reservation_log)
    }
  })
  all_time_list.forEach((_item: any, index: any) => {
    while (res = reg.exec(all_time_list[index])) {
      if (+res[1] === year.value && +res[2] === month.value
        && auxiliary_calibration(`${res[1]}-${res[2]}-${res[3]}`) > auxiliary_calibration(start_time)
        && auxiliary_calibration(`${res[6]}-${res[7]}-${res[8]}`) < auxiliary_calibration(end_time)) {
        result.push(+res[3])
      }
    }
  })
  let arr = days.value.map((item) => {
    if (result.indexOf(item) === -1) { return null }
    let casual_val = item
    item = result.reduce((prev: number, cur: any) => {
      if (cur === casual_val) { return prev + 1 }
      return prev
    }, 0)
    return item
  })
  return arr
})//计算每天有多少预约次数,返回预约状态拥挤程度


</script>

<template>
  <div id="block">
    <div id="header">日期选择
      <p></p>
    </div>

    <div id="main">
      <div id="choose_date">
        <div id="year">
          <input type="text" v-model.number="year" />
        </div>年

        <div id="month">
          <input type="text" v-model.number.lazy="month" />
        </div>月
      </div>
      <div id="day">
        <div id="week">
          <div v-for="day in week" class="week_day">{{ day }}</div>
        </div>
        <div id="framework">
          <template v-for="(day, index) in days">
            <div class="days" :style="{
              visibility: day === null ? 'hidden' : 'visible',
              backgroundColor: days_state[index] === true ? '#582cbe' : '',
              color: days_state[index] === true ? 'white' : '',
            }" @click="open_child(days_state[index], day)">{{ day }}
              <div class="icon" v-if="icon_level[index] > 0" :style="{
                backgroundColor: icon_level[index] > 3 ? icon_level[index] > 5 ? '#e43e32' : '#f7e92c' : '#1aaf64'
              }"></div>
            </div>
          </template>
        </div>

      </div>

    </div>
    <div id="footer"></div>
    <div id="mask" v-if="open_state" @click="open_state = false"></div>
    <div id="pop_up" v-if="open_state">
      <div id="window_header">
        <div v-for="(_chair, index) in chair_number" class="chair" @click="list_display(index)">
          <img src="./chair.svg" alt="" srcset="">
        </div>
        <div id="table"></div>
      </div>
      <div id="window_main">

        <div v-for="item in display"> {{ item }} </div>
      </div>
      <div id="window_footer"></div>
    </div>
  </div>
</template>

<style></style>