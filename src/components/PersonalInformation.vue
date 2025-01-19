<template>
<div class="user-dashboard">
    <h2 class="dashboard-title">用户积分抽奖面板</h2>
    <div class="dashboard-content">
    <div class="user-info">
        <div class="info-item">
        <span class="info-label">用户 ID:</span>
        <span class="info-value">{{ userId }}</span>
        </div>
        <div class="info-item">
        <span class="info-label">我的积分:</span>
        <span class="info-value">{{ points }}</span>
        </div>
        <div class="info-item">
        <span class="info-label">抽奖次数:</span>
        <span class="info-value">{{ lotteryCount }}</span>
        </div>
        <div class="info-item">
        <span class="info-label">当前日期:</span>
        <span class="info-value">{{ currentDate }}</span>
        </div>
    </div>
    <div class="actions">
        <button class="action-button sign-button" @click="handleSignIn">
        签到
        </button>
        <button class="action-button refresh-button" @click="handleRefresh">
        刷新
        </button>
    </div>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { queryUserActivityAccount } from '@/api/request';

// 用户信息
const userId = ref('123456');
const points = ref(0);
const lotteryCount = ref(5);

// 当前日期
const currentDate = ref('');

// 获取当前日期
const getCurrentDate = () => {
    const now = new Date();
    currentDate.value = now.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};

// 签到逻辑
const handleSignIn = () => {
    points.value += 10; // 签到增加 10 积分
    alert('签到成功！积分 +10');
};

// 刷新逻辑
const handleRefresh = () => {
    getCurrentDate(); // 刷新当前日期
        alert('页面已刷新！');
};

const UserActivityAccountRequestDTO = {
    userId: "xiaofuge",
    activityId: 100301
}

// 初始化时获取当前日期
onMounted(() => {
    getCurrentDate();
    queryUserActivityAccount(UserActivityAccountRequestDTO); // 获取账户额度用户信息
});
</script>

<style scoped>
.user-dashboard {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dashboard-title {
    font-size: 24px;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
}

.dashboard-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.user-info {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
}

.info-label {
    font-size: 14px;
    color: #666;
}

.info-value {
    font-size: 16px;
    font-weight: bold;
    color: #333;
}

.actions {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

.action-button {
    padding: 12px 24px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.sign-button {
    background-color: #28a745;
    color: #fff;
}

.sign-button:hover {
    background-color: #218838;
    transform: translateY(-2px);
}

.refresh-button {
    background-color: #007bff;
    color: #fff;
}

.refresh-button:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
}

.action-button:active {
    transform: translateY(0);
}
</style>