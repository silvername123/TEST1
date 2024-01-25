<script lang="ts">
export type ColumnType = {
  width?: string
  align?: 'left' | 'center' | 'right'
  filterType?: 'search' | 'select' | 'range' | 'date'
  sortable?: boolean
  filterData?: any[]
  title?: string
  dataIndex: string
  pageSize?: number
  pageNum?: number
  currentPage?: number
  render?: Function
  slotName?: string
}
</script>

<script setup lang="ts">
import Customize from '@/components/useTable/render'
import { h, type VNode } from 'vue'
withDefaults(defineProps<{ columns: ColumnType[]; dataList: any[] }>(), {
  columns: () => [],
  dataList: () => []
})

// const columns: ColumnType[] = [
//   { title: '姓名', dataIndex: 'name' },
//   { title: '性别', dataIndex: 'sex' },
//   { title: 'id', dataIndex: 'id' },
//   {
//     title: '出生日期',
//     dataIndex: 'date',
//     render: (row: any) => {
//       return h('span', row.date.split(' ')[0])
//     }
//   },
//   {
//     title: '操作',
//     dataIndex: 'options',
//     render: (row: any) => [
//       h(
//         'div',
//         {
//           onClick: () => console.log('row', row),
//           class: 'test',
//           id: 'ts'
//         },
//         '编辑'
//       ),
//       h(
//         'div',
//         {
//           onClick: () => console.log('row', row),
//           class: 'delete'
//         },
//         '删除'
//       )
//     ]
//   }
// ]
// const dataList: { id: string; name: string; sex: string; date: string }[] = [
//   { id: '1', name: '小米', sex: '女', date: '2003-1-1 00:00:00' },
//   { id: '2', name: '小明', sex: '男', date: '2003-1-1 00:00:00' }
// ]
const getDataItem = (data: Record<string, string | number>, dataIndex: string) => data[dataIndex]
</script>
<template>
  <table>
    <thead>
      <tr>
        <th v-for="item in columns" :key="item.dataIndex">{{ item.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="data in dataList" :key="data.id">
        <td v-for="item in columns" :key="item.dataIndex">
          <template v-if="item.render">
            <!-- {{ item.t() }} -->

            <Customize :title="data.name" :render="item.render" :col="data"></Customize>
          </template>
          <template v-else-if="item.slotName">
            <slot :name="item.slotName" :item="item" :col="data"></slot>
          </template>
          <div v-else>
            {{ item.dataIndex && getDataItem(data, item.dataIndex) }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped lang="scss">
table {
  border-collapse: collapse;
  width: 100%;
  empty-cells: show;
  border: 1px solid #e9e9e9;
  th {
    background-color: #f7f7f7;
    color: #5c6b77;
    font-weight: 600;
  }
  td,
  th {
    padding: 8px;
    border: 1px solid #e9e9e9;
    text-align: center;
    button {
      color: #5c6b77;
      border: 0;
    }
    .test {
      color: red;
    }
    #ts {
      color: aqua;
    }
  }
}
</style>
