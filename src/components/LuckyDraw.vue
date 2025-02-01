<template>
    <div class="lucky-draw-container">
      <!-- 背景装饰 -->
      <div class="decoration-leaf-1"></div>
      <div class="decoration-leaf-2"></div>
      <div class="decoration-leaf-3"></div>
  
      <div class="content-wrapper">
        <!-- 顶部标题 -->
        <div class="header">
          <h1 class="main-title">
            <span class="text-white">大营销</span>
            <span class="text-yellow">福利限量抽</span>
          </h1>
          <div class="header-actions">
            <div class="points-display">
              <el-icon><GoldMedal /></el-icon>
              <span>{{ userPoints }}</span>
            </div>
            <el-button 
              type="warning" 
              class="records-btn"
              @click="showRecords">
              中奖记录
            </el-button>
          </div>
        </div>
  
        <!-- 用户资料卡 -->
        <el-card class="user-profile-card">
          <template #header>
            <div class="card-header">
              <span>用户资料</span>
            </div>
          </template>
          <div class="user-info">
            <div class="avatar-section">
              <el-avatar :size="64" :src="userAvatar" />
              <h3>{{ userName }}</h3>
            </div>
            <div class="stats-section">
              <div class="stat-item">
                <div class="stat-label">抽奖次数</div>
                <div class="stat-value">{{ drawChances }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">幸运值</div>
                <el-progress 
                  :percentage="(luckyValue / maxLuckyValue) * 100"
                  :format="() => `${luckyValue}/${maxLuckyValue}`"
                  :stroke-width="12"
                  class="lucky-progress"
                />
              </div>
            </div>
          </div>
        </el-card>
  
        <!-- 签到和抽奖按钮区域 -->
        <div class="action-buttons">
          <el-button 
            type="success" 
            size="large" 
            class="check-in-btn"
            :disabled="isCheckedIn"
            @click="handleCheckIn">
            <el-icon><Calendar /></el-icon>
            {{ isCheckedIn ? '已签到' : '每日签到' }}
          </el-button>
          <el-button 
            type="danger" 
            size="large" 
            class="draw-btn"
            :disabled="drawChances < 1"
            @click="handleSingleDraw">
            <el-icon><Present /></el-icon>
            单次抽奖
            <small class="cost">消耗1次</small>
          </el-button>
          <el-button 
            type="danger" 
            size="large" 
            class="draw-btn"
            :disabled="drawChances < 10"
            @click="handleMultiDraw">
            <el-icon><Ticket /></el-icon>
            十连抽
            <small class="cost">消耗10次</small>
          </el-button>
        </div>
  
        <!-- 兑换区域 -->
        <el-card class="exchange-card">
          <template #header>
            <div class="card-header">
              <span>积分兑换</span>
            </div>
          </template>
          <div class="exchange-options">
            <div v-for="(option, index) in exchangeOptions" 
                 :key="index" 
                 class="exchange-item"
                 :class="{ 'disabled': userPoints < option.cost }">
              <div class="exchange-info">
                <div class="exchange-title">{{ option.title }}</div>
                <div class="exchange-cost">
                  <el-icon><GoldMedal /></el-icon>
                  {{ option.cost }}
                </div>
              </div>
              <el-button 
                type="primary" 
                :disabled="userPoints < option.cost"
                @click="handleExchange(option)">
                兑换
              </el-button>
            </div>
          </div>
        </el-card>
      </div>
  
      <!-- 中奖记录弹窗 -->
      <el-dialog
        v-model="recordsVisible"
        title="中奖记录"
        width="50%"
        class="records-dialog"
      >
        <el-table :data="prizeRecords" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180" />
          <el-table-column prop="prize" label="奖品" />
          <el-table-column prop="status" label="状态">
            <template #default="{ row }">
              <el-tag :type="row.status === '已领取' ? 'success' : 'warning'">
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { GoldMedal, Present, Ticket, Calendar } from '@element-plus/icons-vue'
  import { ElMessage } from 'element-plus'
  
  const userPoints = ref(81)
  const userName = ref('幸运用户')
  const userAvatar = ref('https://placekitten.com/100/100')
  const drawChances = ref(15)
  const luckyValue = ref(100)
  const maxLuckyValue = ref(6000)
  const recordsVisible = ref(false)
  const isCheckedIn = ref(false)
  
  const exchangeOptions = [
    { title: '抽奖券 x1', cost: 200, value: 1 },
    { title: '抽奖券 x10', cost: 2000, value: 10 },
    { title: '抽奖券 x100', cost: 18000, value: 100 }
  ]
  
  const prizeRecords = ref([
    { date: '2025-02-01 12:30:45', prize: 'iPhone 13', status: '已领取' },
    { date: '2025-02-01 10:15:30', prize: '限定手办', status: '待领取' },
    { date: '2025-01-31 18:20:10', prize: '50积分', status: '已领取' },
  ])
  
  const handleExchange = (option) => {
    if (userPoints.value >= option.cost) {
      userPoints.value -= option.cost
      drawChances.value += option.value
      ElMessage.success(`成功兑换 ${option.value} 次抽奖机会`)
    }
  }
  
  const showRecords = () => {
    recordsVisible.value = true
  }
  
  const handleSingleDraw = () => {
    if (drawChances.value >= 1) {
      drawChances.value--
      ElMessage.success('抽奖成功！')
      // 这里添加抽奖逻辑
    }
  }
  
  const handleMultiDraw = () => {
    if (drawChances.value >= 10) {
      drawChances.value -= 10
      ElMessage.success('十连抽成功！')
      // 这里添加抽奖逻辑
    }
  }
  
  const handleCheckIn = () => {
    if (!isCheckedIn.value) {
      isCheckedIn.value = true
      drawChances.value++
      ElMessage.success('签到成功！获得1次抽奖机会')
    }
  }
  </script>
  
  <style scoped>
  .lucky-draw-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #1665D8 0%, #1E80FF 100%);
    position: relative;
    overflow: hidden;
    padding: 20px;
  }
  
  .decoration-leaf-1,
  .decoration-leaf-2,
  .decoration-leaf-3 {
    position: absolute;
    background-image: url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-x9bDHE1yo4l2pEadpCyTDBG9yFRgC9.png');
    opacity: 0.1;
    pointer-events: none;
  }
  
  .decoration-leaf-1 {
    width: 200px;
    height: 200px;
    top: 10%;
    left: 5%;
    transform: rotate(-30deg);
  }
  
  .decoration-leaf-2 {
    width: 150px;
    height: 150px;
    top: 30%;
    right: 10%;
    transform: rotate(45deg);
  }
  
  .decoration-leaf-3 {
    width: 180px;
    height: 180px;
    bottom: 15%;
    left: 15%;
    transform: rotate(15deg);
  }
  
  .content-wrapper {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  
  .header-actions {
    display: flex;
    gap: 15px;
    align-items: center;
  }
  
  .main-title {
    font-size: 32px;
    font-weight: bold;
  }
  
  .text-white {
    color: white;
  }
  
  .text-yellow {
    color: #FFD700;
  }
  
  .points-display {
    background: rgba(255, 255, 255, 0.2);
    padding: 8px 16px;
    border-radius: 20px;
    color: white;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .records-btn {
    background: transparent;
    border: 1px solid #FFD700;
    color: #FFD700;
  }
  
  .records-btn:hover {
    background: rgba(255, 215, 0, 0.1);
  }
  
  .user-profile-card,
  .exchange-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    margin-bottom: 20px;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  }
  
  .action-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 30px 0;
  }
  
  .check-in-btn,
  .draw-btn {
    position: relative;
    min-width: 120px;
    height: 50px;
    font-size: 16px;
    border: none;
    overflow: hidden;
  }
  
  .check-in-btn:hover,
  .draw-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  .draw-btn .cost {
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    opacity: 0.8;
  }
  
  .card-header {
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }
  
  .user-info {
    display: flex;
    gap: 20px;
    padding: 10px;
  }
  
  .avatar-section {
    text-align: center;
  }
  
  .avatar-section h3 {
    margin-top: 10px;
    color: #333;
  }
  
  .stats-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .stat-label {
    width: 80px;
    color: #666;
  }
  
  .lucky-progress {
    flex: 1;
  }
  
  .exchange-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .exchange-item {
    background: #f5f7fa;
    border-radius: 8px;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;
  }
  
  .exchange-item:hover:not(.disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .exchange-item.disabled {
    opacity: 0.6;
  }
  
  .exchange-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .exchange-title {
    font-weight: bold;
    color: #333;
  }
  
  .exchange-cost {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #ff9900;
  }
  
  :deep(.el-progress-bar__outer) {
    background-color: rgba(0, 0, 0, 0.1) !important;
  }
  
  :deep(.el-progress-bar__inner) {
    background-color: #1E80FF !important;
  }
  
  .records-dialog {
    :deep(.el-dialog__header) {
      border-bottom: 1px solid #eee;
      margin-right: 0;
      padding-bottom: 15px;
    }
  }
  </style>