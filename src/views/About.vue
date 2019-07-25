<template>
  <div class="about">
    <div class="header">
      <h1>菜鸟驿站</h1>
      <div>
        <a-button @click="changePage('all')">All</a-button>
        <a-button @click="changePage('booked')">已预约</a-button>
        <a-button @click="changePage('received')">已取件</a-button>
        <a-button @click="changePage('unbooked')">未预约</a-button>
        <a-button @click="showModal">添加</a-button>
      </div>
      <div class="table">
        <a-table :columns="columns" :dataSource="orderList" :rowKey="record => record.id">
          <template slot="name" slot-scope="name">{{name.first}} {{name.last}}</template>
          <span slot="appointment_time" slot-scope="record">{{ formatData(record.appointment_time)}}</span>
          <span slot="action" slot-scope="record">
            <a href="javascript:;" @click="checkReceived(record)">确认收货</a>
          </span>
        </a-table>
      </div>
      <modal :isShowModal="isShowModal" @update-modalstatus="updateModalStatus"></modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import modal from "../components/modal";
import moment from "moment";
const columns = [
  {
    title: "订单号",
    dataIndex: "order_number",
    key: "order_number",
    width: "20%"
  },
  {
    title: "收件人",
    dataIndex: "receiver",
    key: "recevier",
    width: "20%"
  },
  {
    title: "电话",
    dataIndex: "receiver_phone",
    key: "receiver_phone"
  },
  {
    title: "状态",
    dataIndex: "order_status",
    key: "order_status"
  },
  {
    title: "预约时间",
    dataIndex: "appointment_time",
    key: "appointment_time"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

export default {
  name: "",
  props: [""],
  data() {
    return {
      columns,
      isShowModal: false
    };
  },

  components: {
    modal
  },

  computed: {
    ...mapGetters({
      orderList: "getOrderList"
    })
  },

  created() {
    this.initData();
  },

  beforeMount() {},

  mounted() {},

  methods: {
    initData() {
      this.$store.dispatch("getAllItem");
    },
    checkReceived(item) {
      this.$store.dispatch("checkReceived", item);
      this.$store.dispatch("getAllItem");
    },
    showModal() {
      this.isShowModal = !this.isShowModal;
    },
    updateModalStatus(newValue) {
      this.isShowModal = false;
    },

    changePage(page) {
      this.$store.commit("changeNowPage", page);
    },
    formatData(time) {
      var time = new Date(time);
      var y = time.getFullYear(); //年 
      var m = time.getMonth() + 1;//月 
      var d = time.getDate();//日 
      var h = time.getHours();//时 
      var mm = time.getMinutes();//分 
      var s = time.getSeconds();//秒
      return y+"-"+m+"-"+d+" "+h+":"+mm+":"+s
    }
  }
  // filters: {
  //   filterData: function(val) {
  //     // debugger
  //     console.log(1111111111);
  //     if (val === 0) {
  //       return "";
  //     }
  //     return moment(val).format("YYYY-MM-DD HH:mm:ss");
  //     // return moment.unix(val).format("YYYY-MM-DD HH:mm:ss")
  //   }
  // }
};
</script>
 <style lang='' scoped>
</style>