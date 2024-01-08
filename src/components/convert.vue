<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { list } from "./list"
import './style.css'


const week: string[] = ['一', '二', '三', '四', '五', '六', '日'];
let year = ref<number>();
year.value = new Date().getFullYear();
type _restricted_num = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
let month = ref<number>(new Date().getMonth() + 1);



let date_responsive = computed(() => {
  return year.value + "-" + month.value + "-1"
})
watch(month, (newq,oldq)=>{
  console.log(newq, oldq);
  console.log(date_responsive.value);
  
} )


let days: string[] = [];

const month_days = (m: number, y?: number): number => {
  if (m < 1 || m > 12) {
    throw console.error("Months must be within 1-12");
  }
  y = y ? y : new Date().getFullYear()
  const t = [31, y % 4 !== 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return t[m - 1]
}


const update = () => {
  console.log(year.value, month.value, date_responsive.value);

  console.log(new Date(date_responsive.value).getDay());
}









</script>

<template>
  <div id="block">
    <div id="header">日期选择</div>
    <div id="main">
      <div id="choose_date">
        <div id="year">
          <input type="text" v-model.number="year" />
        </div>年

        <div id="month">
          <input type="text" v-model.number="month" />
        </div>月
        <button @click="update">1</button>
      </div>
      <div id="day">
        <div id="week">
          <div v-for="day in week" class="week_day">{{ day }}</div>
        </div>
        <div id="framework">
          <div id="days" v-for="i in 31">{{ i }}</div>
        </div>
      </div>

    </div>
    <div id="footer"></div>
  </div>
</template>

<style></style>