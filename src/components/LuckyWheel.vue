<template>
<LuckyWheel ref="myLucky" width="300px" height="300px"
    :prizes="prizes" :blocks="blocks" :buttons="buttons"
    @start="startCallback" @end="endCallback" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import request from '@/utils/request';

// 定义响应式数据
const blocks = ref([{ padding: '13px', background: '#617df2' }]);
const prizes = ref([]);
const buttons = ref([{
    radius: '35%',
    background: '#8a9bf3',
    pointer: true,
    fonts: [{ text: '开始', top: '-10px' }]
}]);
const myLucky = ref(null);

// 获取奖品列表
const queryRaffleAwardList = async () => {
    try {
        const res = await request.get('/api/v1/raffle/strategy_armory?strategyId=100003');
        prizes.value = res.data.map(item => ({
            title: item.awardTitle,
            description: item.awardSubtitle,
            image: null,
            fonts: [{ text: item.awardTitle, top: '25%' }],
            background: '#e9e8fe'
        }));
    } catch (error) {
        console.error("获取奖品列表失败:", error);
    }
}

// 抽奖方法
const randomRaffle = async () => {
    try {
        const req = await request.post('/api/v1/raffle/strategy_armory/random_raffle', {
            strategyId: 100003,
        });
        if (req.data) {
            return req.data.awardIndex; // 返回奖品排序索引
        } else {
            console.error("抽奖请求未返回数据");
            return null; // 如果没有数据返回null
        }
    } catch (error) {
        console.error("抽奖失败:", error);
        return null; // 发生错误时返回null
    }
}

// 开始抽奖
const startCallback = async () => {
    myLucky.value.play();
    const awardIndex = await randomRaffle(); // 调用randomRaffle方法并获取awardIndex
    if (awardIndex !== null) {
        setTimeout(() => {
            myLucky.value.stop(awardIndex); // 使用获取到的awardIndex调用stop
        }, 3000);
    }
};

// 结束抽奖
const endCallback = (prize) => {
    console.log(prize);
};

onMounted(() => {
    queryRaffleAwardList();
});
</script>
