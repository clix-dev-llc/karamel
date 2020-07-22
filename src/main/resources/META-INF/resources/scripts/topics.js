// Vue app
var client = new Vue({
  el: '#app',
  data: {
        bootstrapShow: false,
        brokerList: null,
        selectedBroker: 'Select',
        limits: [10, 25, 50, 100, 200],
        topicList: [],
        showSpinner: false
  },
  mounted:function(){
    this.onLoadPage();
    },
  methods: {
      onLoadPage: function (event) {
        axios.get('/api/broker').then(response => (this.brokerList = response.data));
      },
      onDropDownBroker: function (event) {
        this.bootstrapShow = !this.bootstrapShow;
      },
      onSelectBroker: function (broker) {
        this.selectedBroker = broker;
        this.topicList = [];
        this.getTopics();
        this.onDropDownBroker();
        this.showSpinner = true;
      },
      getTopics: function (event) {
        axios.get('/api/topic?brokers=' + this.selectedBroker).then(response => {
            this.topicList = response.data;
            this.showSpinner = false;
        });
      },
    },
});
