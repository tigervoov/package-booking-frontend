import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    ordersList: [],
    nowPage: 'all',
  },
  getters: {
    getOrderList: state => {
      if (state.nowPage === 'all') {
        return state.ordersList
      } if (state.nowPage === 'unbooked') {
        return state.ordersList.filter(item => item.order_status === '未预约')
      } if (state.nowPage === 'booked') {
        return state.ordersList.filter(item => item.order_status === '已预约')
      }
      if (state.nowPage === 'received') {
        return state.ordersList.filter(item => item.order_status === '已取件')
      }
    },

  },
  mutations: {
    changeNowPage(state, nowPage) {
      state.nowPage = nowPage
    },
    initData(state, data) {
      state.ordersList = data
    },
  },
  actions: {
    async getAllItem({ commit }) {
      await axios({
        method: "get",
        url: "http://localhost:9999/expressOrders"
      })
        .then((res) => {
          console.log(res.data)
          commit('initData', res.data)
        })
        .catch(function (err) {
        });
    },
    
    async addOrderToBackend({ commit }, addNewItem) {
      await axios({
        method: "post",
        url: "http://localhost:9999/expressOrders/",
        data: JSON.stringify(addNewItem),
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      })
      .then((res) => {
        console.log(res)
      })
      .catch(function (err) {
      });

    },
    async checkReceived({ commit }, changeItem) {
      await axios({
        method: 'patch',
        url: "http://localhost:9999/expressOrders/" + changeItem.id,

      })
        .then((res) => {
          console.log('状态改变成功', res)
        })
        .catch((err) => {
        })
    },
    async expressTakeOrdersTime({ commit }, order) {
      await axios({
        method: "put",
        url: "http://localhost:9999/expressOrders/"+order.order_number,
        data: JSON.stringify(order),
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      })
      .then((res) => {
        console.log(res)
      })
      .catch(function (err) {
      });

    },
  }
})

export default store