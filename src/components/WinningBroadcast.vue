<template>
<div class="drawing-report">
    <h2>🎉 中奖播报 🎉</h2>
    <ul>
    <li v-for="(item, index) in winnings" :key="index">
        <div class="item-content">
        <span class="username">{{ item.username }}</span>
        <span class="prize">{{ item.prize }}</span>
        <span class="date">{{ item.date }}</span>
        </div>
    </li>
    </ul>
</div>
</template>

<script setup>
import { ref } from 'vue';

const winnings = ref([
    { username: '恭喜 爱丽水的前端', prize: '抽中随机矿石', date: '2025-01-19' },
    { username: '恭喜 Xiaoru...', prize: '抽中随机矿石', date: '2025-01-19' },
    { username: '恭喜 爱丽水的前端', prize: '抽中随机矿石', date: '2025-01-19' },
    { username: '恭喜 爱丽水的前端', prize: '抽中随机矿石', date: '2025-01-19' },
]);
</script>

<style scoped>
.drawing-report {
    background-color: #f0f4ff;
    border: 1px solid #007aff;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 1rem auto;
}

h2 {
    color: #007aff;
    text-align: center;
    margin-bottom: 1rem;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin: 0.5rem 0;
    padding: 1rem;
    transition: transform 0.2s;
}

li:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.item-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.username {
    color: #007aff;
    font-weight: bold;
}

.prize {
    color: #28a745;
}

.date {
    color: #6c757d;
    font-size: 0.9rem;
}
</style>
