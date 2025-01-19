<template>
<LuckyWheel ref="myLucky" width="300px" height="300px"
    :prizes="prizes" :blocks="blocks" :buttons="buttons"
    @start="startCallback" @end="endCallback" />
</template>

<script setup>
import { ref, onMounted } from 'vue';

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
    
});
</script>
