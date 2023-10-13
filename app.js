const vm = new Vue({
  el: "#app",
  data: {
    produtos: []
  },
  filters: {
    formatarMoeda(valor) {
      return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL"});
    }
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