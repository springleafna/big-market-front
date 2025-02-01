<template>
    <div class="drawing-report">
      <h2>🎉 中奖播报 🎉</h2>
      <div class="scroll-container">
        <ul>
          <li v-for="(item, index) in visibleWinnings" :key="index">
            <div class="item-content">
              <span class="username">{{ item.username }}</span>
              <span class="prize">{{ item.prize }}</span>
              <span class="date">{{ item.date }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const winnings = ref([
    { username: '恭喜 爱丽水的前端', prize: '抽中随机矿石', date: '2025-01-19' },
    { username: '恭喜 Xiaoru...', prize: '抽中随机矿石', date: '2025-01-20' },
    { username: '恭喜 小明', prize: '抽中随机矿石', date: '2025-01-21' },
    { username: '恭喜 小红', prize: '抽中随机矿石', date: '2025-01-22' },
    { username: '恭喜 小刚', prize: '抽中随机矿石', date: '2025-01-23' },
  ]);
  
  const visibleWinnings = computed(() => {
    return winnings.value.slice(0, 5); // 只展示前五条数据
  });
  </script>
  
  <style scoped>
  .drawing-report {
    background-color: #f0f4ff;
    border: 1px solid #007aff;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: fit-content; /* 宽度自适应内容 */
    max-width: 100%; /* 最大宽度为100%，防止溢出 */
    margin: 1rem auto; /* 居中显示 */
  }
  
  h2 {
    color: #007aff;
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .scroll-container {
    overflow: hidden;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin: 0.5rem 0;
    padding: 1rem;
    min-width: 300px; /* 设置最小宽度，确保内容不拥挤 */
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