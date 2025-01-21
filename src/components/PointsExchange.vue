<template>
<div class="prize-container">
    <div class="card" v-for="(item, index) in prizeOptions" :key="index">
    <h2>{{ item.label }}</h2>
    <p class="price">{{ item.price }}积分</p>
    <button @click="redeem(item)" class="redeem-button">
        🛒 兑换
    </button>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';

const prizeOptions = ref([
    { label: '1次抽奖', price: 5 },
    { label: '5次抽奖', price: 10 },
    { label: '10次抽奖', price: 20 },
]);

const redeem = (item) => {
    alert(`成功兑换：${item.label}，花费：${item.price}积分`);
};
</script>

<style>
.prize-container {
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
}

.card {
    background: linear-gradient(180deg, #00BFFF, #5C6BC0);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    color: white;
    width: 150px; /* 可根据需求调整 */
    margin-left: 20px;
}

.price {
    font-size: 28px;
    color: #FFD700;
}

.redeem-button {
    background: #1976D2;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
}

.redeem-button:hover {
    background: #12569C;
}
</style>
