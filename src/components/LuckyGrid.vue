<template>
    <LuckyGrid ref="myLucky" width="300px" height="300px"
        :prizes="prizes" :blocks="blocks" :buttons="buttons"
        @start="startCallback" @end="endCallback" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 定义响应式数据
const blocks = ref([{ padding: '10px', background: '#869cfa' }]);
const prizes = ref([]);
const buttons = ref([{ x: 1, y: 1, background: "#7f95d1", fonts: [{ text: '开始', top: '35%' }] }]);

// 动态请求数据
const getDate = async () => {
try {
    const res = await axios.get('https://mock.apipost.net/mock/3aa45cf4e87c000/api/v1/raffle/query_raffle_award_list?apipost_id=2a463d44bdc001');
    console.log(res.data.data);

    // 封装数据
    let prizeIndex = 0;
    prizes.value = Array.from({ length: 9 }, (_, index) => {
    if (index === 4) {
        // 跳过中间的方格（索引为4）
        return null;
    } else {
        const item = res.data.data[prizeIndex++];
        const row = Math.floor(index / 3); // 假设每行3个元素
        const col = index % 3; // 假设每行3个元素
        return {
        x: col,
        y: row,
        fonts: [{ text: item.awardTitle, top: '35%' }],
        background: '#e9e8fe'
        };
    }
    }).filter(item => item !== null); // 过滤掉null值
} catch (error) {
    console.error('获取数据失败:', error);
}
};

// 在组件挂载时调用getDate函数
onMounted(() => {
    getDate();
});

// 定义方法
const startCallback = () => {
// 调用抽奖组件的play方法开始游戏
myLucky.value.play();
// 模拟调用接口异步抽奖
setTimeout(() => {
    // 假设后端返回的中奖索引是随机的
    const index = Math.floor(Math.random() * prizes.value.length);
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