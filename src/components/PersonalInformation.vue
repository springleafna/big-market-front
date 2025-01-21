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
            <button class="action-button lottery-button" @click="showLotteryRecords">
                中奖记录
            </button>
        </div>
    </div>
</div>
<!-- 弹窗组件 -->
<div v-if="isLotteryRecordsVisible" class="lottery-records-modal">
    <div class="modal-content">
        <span class="close" @click="closeLotteryRecords">&times;</span>
        <h3>中奖记录</h3>
        <ul class="records-list">
            <li v-for="(record, index) in lotteryRecords" :key="index">{{ record }}</li>
        </ul>
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

// 中奖记录弹窗可见性控制
const isLotteryRecordsVisible = ref(false);

// 中奖记录信息
const lotteryRecords = ref([
    '2023-10-01 中奖10积分',
    '2023-10-05 中奖20积分',
    '2023-10-10 中奖30积分',
    '2023-10-15 中奖50积分'
]);

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

// 显示中奖记录
const showLotteryRecords = () => {
    isLotteryRecordsVisible.value = true;
};

// 关闭中奖记录弹窗
const closeLotteryRecords = () => {
    isLotteryRecordsVisible.value = false;
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

.lottery-button {
    background-color: #ffc107;
    color: #fff;
}

.lottery-button:hover {
    background-color: #d39e00;
    transform: translateY(-2px);
}

.action-button:active {
    transform: translateY(0);
}

/* 弹窗样式 */
.lottery-records-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    position: relative;
    width: 300px;
    max-height: 80vh;
    overflow-y: auto;
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 24px;
    color: #999;
}

.close:hover {
    color: #333;
}

.modal-content h3 {
    margin-top: 0;
    font-size: 20px;
    color: #333;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
}

.records-list {
    list-style-type: none;
    padding: 0;
    margin: 10px 0 0;
}

.records-list li {
    padding: 8px 12px;
    border-bottom: 1px solid #eee;
    color: #555;
}

.records-list li:last-child {
    border-bottom: none;
}

.records-list li:hover {
    background-color: #f9f9f9;
}
</style>