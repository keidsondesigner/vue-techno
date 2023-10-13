const vm = new Vue({
  el: "#app",
  data: {
    produtos: [],
    produto: false
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
    },
    getProdutoPorId(id) {
      fetch(`./api/produtos/${id}/dados.json`)
        .then(response => response.json())
        .then(response => {
          this.produto = response;
        })
    },
    fecharModal(event){
      console.log("aquiii");
      console.log(event.target);
      console.log(event.currentTarget);
      // if(target === currentTarget) {
      //   // fechar o modal só quando meu click for na section onde está meu evento;
      //   this.produto = false;
      // }
    }
  },
  created() {
    this.getProdutos();
  }
});