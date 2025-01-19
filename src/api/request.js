import axios from '@/api/axios'

// 抽奖方法
export const randomRaffle1 = async () => {
    try {
        const req = await axios.post('/strategy_armory/random_raffle', {
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


/**
 * 活动装配 - 数据预热 | 把活动配置的对应的 sku 一起装配
 * @param activityId 活动ID
 * @returns 装配结果
 */
export const armory = async (activityId) => {
    try {
        const response = await axios.get(`/activity/armory`, {
            params: { activityId }
        });
        return response;
    } catch (error) {
        console.error('活动装配，数据预热，失败', error);
        throw error;
    }
};

/**
 * 抽奖接口
 * @param request 请求对象
 * @returns 抽奖结果
 */
export const draw = async (request) => {
    try {
        const response = await axios.post(`/activity/draw`, request);
        return response;
    } catch (error) {
        console.error('活动抽奖失败', error);
        throw error;
    }
};

/**
 * 日历签到返利接口
 * @param userId 用户ID
 * @returns 签到返利结果
 */
export const calendarSignRebate = async (userId) => {
    try {
        const response = await axios.post(`/activity/calendar_sign_rebate`, null, {
            params: { userId }
        });
        return response;
    } catch (error) {
        console.error('日历签到返利失败', error);
        throw error;
    }
};

/**
 * 判断是否签到接口
 * @param userId 用户ID
 * @returns 是否签到
 */
export const isCalendarSignRebate = async (userId) => {
    try {
        const response = await axios.post(`/activity/is_calendar_sign_rebate`, null, {
            params: { userId }
        });
        return response;
    } catch (error) {
        console.error('查询用户是否完成日历签到返利失败', error);
        throw error;
    }
};

/**
 * 查询账户额度
 * @param request 请求对象
 * @returns 账户额度
 */
export const queryUserActivityAccount = async (request) => {
    try {
        const response = await axios.post('/activity/query_user_activity_account', request);
        console.log('查询用户活动账户', response.data);
        return response.data;
    } catch (error) {
        console.error('查询用户活动账户失败', error);
        throw error;
    }
};

/**
 * 根据活动ID查询sku商品集合
 * @param activityId 活动ID
 * @returns sku商品集合
 */
export const querySkuProductListByActivityId = async (activityId) => {
    try {
        const response = await axios.post(`/activity/query_sku_product_list_by_activity_id`, { activityId });
        return response;
    } catch (error) {
        console.error('查询sku商品集合失败', error);
        throw error;
    }
};

/**
 * 查询用户积分值
 * @param userId 用户ID
 * @returns 用户积分值
 */
export const queryUserCreditAccount = async (userId) => {
    try {
        const response = await axios.post(`/activity/query_user_credit_account`, { userId });
        return response;
    } catch (error) {
        console.error('查询用户积分值失败', error);
        throw error;
    }
};

/**
 * 积分兑换商品
 * @param request 请求对象
 * @returns 兑换结果
 */
export const creditPayExchangeSku = async (request) => {
    try {
        const response = await axios.post(`/activity/credit_pay_exchange_sku`, request);
        return response;
    } catch (error) {
        console.error('积分兑换商品失败', error);
        throw error;
    }
};

/**
 * 策略装配，将策略信息装配到缓存中
 * @param strategyId 策略ID
 * @return 装配结果
 */
export const strategyArmory = async (strategyId) => {
    try {
        const response = await axios.get(`/strategy/armory`, { params: { strategyId } });
        return response;
    } catch (error) {
        console.error('策略装配失败', error);
        throw error;
    }
};

/**
 * 查询奖品列表
 * @param request 请求参数 { userId: 'yourUserId', activityId: 1000001 }
 * @return 奖品列表
 */
export const queryRaffleAwardList = async (request) => {
    try {
        const response = await axios.post(`/query_raffle_award_list`, request);
        return response.data;
    } catch (error) {
        console.error('查询抽奖奖品列表配置失败', error);
        throw error;
    }
};

/**
 * 查询抽奖策略权重规则配置
 * @param request 请求参数 { userId: 'yourUserId', activityId: 1000001 }
 * @return 抽奖策略权重规则配置
 */
export const queryRaffleStrategyRuleWeight = async (request) => {
    try {
        const response = await axios.post(`/query_raffle_strategy_rule_weight`, request);
        return response.data;
    } catch (error) {
        console.error('查询抽奖策略权重规则配置失败', error);
        throw error;
    }
};

/**
 * 随机抽奖接口
 * @param requestDTO 请求参数 { strategyId: 1000001 }
 * @return 抽奖结果
 */
export const randomRaffle = async (requestDTO) => {
    try {
        const response = await axios.post(`/random_raffle`, requestDTO);
        return response.data;
    } catch (error) {
        console.error('随机抽奖失败', error);
        throw error;
    }
};
