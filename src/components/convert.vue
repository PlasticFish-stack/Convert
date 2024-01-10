<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { list } from "./list"
import './style.css'

const chair_number = 10
const week: string[] = ['一', '二', '三', '四', '五', '六', '日'];
let year = ref<number>();
year.value = new Date().getFullYear();
let month = ref<number>(new Date().getMonth() + 1);
watch(month, (new_month: number, old_month: number) => {
  if (new_month > 12 || new_month < 1) {
    month.value = old_month
  }
})
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
  const start_time = list.start_time,
    end_time = list.end_time;
  let state = false
  if (auxiliary_calibration(d) >= auxiliary_calibration(start_time) && auxiliary_calibration(d) <= auxiliary_calibration(end_time)) {
    state = true
  }
  return state
}
function auxiliary_calibration(t: string): number {
  return new Date(t).getTime()
}

let days_state = computed(() => {
  let state = days.value.map(item => {
    if (!item) {
      return false
    }
    return calibration(year.value + "-" + month.value + "-" + item)
  })
  return state
})
let days_state_level = computed(() => {
  let level = days_state.value.map(item => {



    return calibration(year.value + "-" + month.value + "-" + item)
  })
  return level
})
console.log(days_state_level);
console.log(days_state);
watch(days_state, (n) => {
  console.log(n);
})
let open_state = ref<boolean>(false)
function open_child(bool: boolean, day: number): void {
  if (!bool) { return }
  open_state.value = true
  console.log(day);


  ///////
}
let time_list:any = list.date
let time:any = ref(null)
function list_display(index: any){
  time.value = time_list[index]
}
let all_time_list: any[] = [];
function reservation_date(){
  time_list.forEach((item: any) => {
    if(item.reservation_log){
      all_time_list.push(...item.reservation_log)
    }
  })
  let reg = /(\d+)\-(\d+)\-(\d+)\s(\d+)\:(\d+)/g
  let result = [],
      res;
  console.log('1');
  all_time_list.forEach((_item: any, index: any) => {
    while(res = reg.exec(all_time_list[index])){
    if(+res[1] === year.value && +res[2] === month.value){
      result.push(+res[3])
    }
  }
  })
  
  console.log(result, 'res');
  console.log( reg.exec(all_time_list[0]));
  console.log( reg.exec(all_time_list[0]));
}
reservation_date();
console.log(days.value,'days');



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
              <div class="icon" v-if="days_state[index] === true"></div>
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

        <div v-if="time"> {{ time.reservation_log }} </div>
      </div>
      <div id="window_footer"></div>
    </div>
  </div>
</template>

<style></style>