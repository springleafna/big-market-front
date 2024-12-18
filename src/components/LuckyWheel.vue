<template>
<LuckyWheel ref="myLucky" width="300px" height="300px"
    :prizes="prizes" :blocks="blocks" :buttons="buttons"
    @start="startCallback" @end="endCallback" />
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
// 动态请求数据

const getDate = async () => {
const res = await axios.get('https://mock.apipost.net/mock/3aa45cf4e87c000/api/v1/raffle/query_raffle_award_list?apipost_id=2a463d44bdc001');
console.log(res.data.data);
// 封装数据
prizes.value = res.data.data.map(item => ({
    title: item.awardTitle,
    description: item.awardSubtitle,
    image: null, // 假设没有图片字段，可以设置为null或空字符串
    fonts: [{ text: item.awardTitle, top: '25%' }],
    background: '#e9e8fe'
}));
}
getDate()

// 定义响应式数据
// 背景色
const blocks = ref([{ padding: '13px', background: '#617df2' }]);
// 奖项数据
const prizes = ref([
    { fonts: [{ text: '0', top: '10%' }], background: '#e9e8fe' },
    { fonts: [{ text: '1', top: '10%' }], background: '#b8c5f2' },
    { fonts: [{ text: '2', top: '10%' }], background: '#e9e8fe' },
    { fonts: [{ text: '3', top: '10%' }], background: '#b8c5f2' },
    { fonts: [{ text: '4', top: '10%' }], background: '#e9e8fe' },
    { fonts: [{ text: '5', top: '10%' }], background: '#b8c5f2' },
    { fonts: [{ text: '6', top: '10%' }], background: '#e9e8fe' },
    { fonts: [{ text: '7', top: '10%' }], background: '#b8c5f2' },
]);
const buttons = ref([{
    radius: '35%',
    background: '#8a9bf3',
    pointer: true,
    fonts: [{ text: '开始', top: '-10px' }]
}]);

// 定义方法
const startCallback = () => {
// 调用抽奖组件的play方法开始游戏
myLucky.value.play();
// 模拟调用接口异步抽奖
setTimeout(() => {
    // 假设后端返回的中奖索引是0
    const index = 5;
    // 调用stop停止旋转并传递中奖索引
    myLucky.value.stop(index);
}, 3000);
};

const endCallback = (prize) => {
console.log(prize);
};

// 定义ref以引用子组件
const myLucky = ref(null);
</script>