<script setup>
import LuckyGrid from "@/components/LuckyGrid.vue";
import LuckyWheel from "@/components/LuckyWheel.vue";
import PointsExchange from "@/components/PointsExchange.vue";
import WinningBroadcast from "@/components/WinningBroadcast.vue";
import PersonalInformation from "@/components/PersonalInformation.vue";

import { armory } from "@/api/request";

import { ref, onMounted } from "vue";

onMounted(() => {
  armory(100301);
});
</script>

<template>
<div class="container">
  <div class="header">大营销平台 - 抽奖展示</div>
  <PersonalInformation />
  <div class="content">
    <LuckyWheel />
    <LuckyGrid />
  </div>
  <PointsExchange />
  <WinningBroadcast />
</div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  color: #333;
  padding: 20px 0;
  margin-top: 150px;
}

.header {
  font-size: 24px;
  font-weight: bold;
  color: #4a90e2;
}

.content {
  display: flex;
  gap: 60px;
  margin-top: 80px;
}
</style>