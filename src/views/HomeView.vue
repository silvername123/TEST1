<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'

import useTable, { type ColumnType } from '@/components/useTable/useTable.vue'
import { h } from 'vue'

// const OnFindRFIDGoods = ref(/* 初始值 */)
const columns: ColumnType[] = [
  { title: '姓名', dataIndex: 'name' },
  { title: '性别', dataIndex: 'sex' },
  { title: 'id', dataIndex: 'id' },
  {
    title: '出生日期',
    dataIndex: 'date',
    // render: (row: any) => {
    //   return h('span', row.date.split(' ')[0])
    // }
    slotName: 'date'
  },
  {
    title: '操作',
    dataIndex: 'options',
    // render: (row: any) => [
    //   h(
    //     'div',
    //     {
    //       onClick: () => console.log('row', row),
    //       class: 'test',
    //       id: 'ts'
    //     },
    //     '编辑'
    //   ),
    //   h(
    //     'div',
    //     {
    //       onClick: () => console.log('row', row),
    //       class: 'delete'
    //     },
    //     '删除'
    //   )
    // ]
    slotName: 'options'
  }
]
const dataList: { id: string; name: string; sex: string; date: string }[] = [
  { id: '1', name: '小米', sex: '女', date: '2003-1-1 00:00:00' },
  { id: '2', name: '小明', sex: '男', date: '2003-1-1 00:00:00' }
]
</script>

<template>
  <!-- <useTable :columns="columns" :dataList="dataList">
    <template #options>
      <div style="display: flex; justify-content: space-between">
        <div>编辑</div>
        <div>删除</div>
      </div>
    </template>
    <template v-slot:date="{ col }"> {{ col.date.split(' ')[0] }} </template>
  </useTable> -->
  <!-- <main> -->
  <TheWelcome />
  <router-link to="/">Go to Home</router-link>
  <router-link to="/about">Go to About</router-link>
  <router-view></router-view>

  <!-- </main> -->
</template>
