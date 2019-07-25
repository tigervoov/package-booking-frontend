<template>
  <div class="content">
    <h1>预约取件</h1>
    <label>运单号：</label>
    <a-input size="large" v-model="newOrder.order_number" />
    <!-- <label>预约时间：</label>
    <a-input size="large" v-model="newOrder.appointment_time" />-->
    <a-date-picker
      @change="onChange"
      format="YYYY-MM-DD HH:mm:ss"
      :disabledDate="disabledDate"
      :disabledTime="disabledDateTime"
      :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
    />
    <div class="btngroup">
      <a-button type="primary" class="btn" @click="expressOrdersTime">预约</a-button>
      <a-button type="primary">取消</a-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: "",
  props: [""],
  data() {
    return {
      newOrder: {
        order_number: "",
        appointment_time: "",
      }
    };
  },

  components: {},

  computed: {},

  created() {},

  beforeMount() {},

  mounted() {},

  methods: {
    expressOrdersTime() {
      this.$store.dispatch("expressTakeOrdersTime", this.newOrder);
      this.newOrder={
        order_number: "",
        appointment_time: "",
      }
    },
    moment,
    disabledDate(current) {
      return current && current < moment().endOf("day");
    },

    disabledDateTime() {
      return {
        disabledHours: () => [0,1,2,3,4,5,6,7,22,23,24],
      };
    },
    onChange(time){
        this.newOrder.appointment_time=new Date(time).getTime()
    }
  },

  watch: {}
};
</script>
<style lang="scss" scoped>
.content {
  width: 400px;
  margin: 0 auto;
}
.btngroup {
  margin-top: 40px;
}
.btn {
  margin-right: 40px;
}
</style>