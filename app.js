const vm = new Vue({
  el: "#app",
  data: {
    produtos: []
  },
  methods: {
    getProdutos() {
      fetch("./api/produtos.json")
        .then(response => response.json())
        .then(response => {
          this.produtos = response;
        })
    }
  },
  created() {
    this.getProdutos();
  }
});