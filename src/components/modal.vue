<template>
  <div>
    <a-modal title="包裹入库" v-model="isShowModal1" @ok="hideModal" okText="确认" cancelText="取消">
      运单号：
      <a-input size="large" v-model="newOrder.order_number" />收件人：
      <a-input size="large" v-model="newOrder.receiver" />电话：
      <a-input size="large" v-model="newOrder.receiver_phone" />
      <!-- 重量：<a-input size="large" /> -->
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "modal",
  props: ["isShowModal"],
  data() {
    return {
      newOrder: {
        order_number: "",
        receiver: "",
        receiver_phone: ""
      }
    };
  },

  components: {},

  computed: {
    isShowModal1: {
      get: function() {
        return this.isShowModal;
      },
      // setter
      set: function(newValue) {
        this.$emit("update-modalstatus", newValue);
        console.log(newValue);
      }
    }
  },

  created() {},

  beforeMount() {},

  mounted() {},

  methods: {
    hideModal() {
      if (
        this.newOrder.order_number &&
        this.newOrder.receiver &&
        this.newOrder.receiver_phone
      ) {
        this.$store.dispatch("addOrderToBackend", this.newOrder);
        this.$store.dispatch("getAllItem");
        this.isShowModal1 = false;
      }
    }
  },

  watch: {}
};
</script>
<style lang='' scoped>
</style>