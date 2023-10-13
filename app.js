const vm = new Vue({
  el: "#app",
  data: {
    produtos: [],
    produto: false,
    carrinhoDeCompras: [],
    msgDoItem: "",
    msgMostrar: false,
    carrinhoAtivo: false
  },
  filters: {
    formatarMoeda(valor) {
      return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL"});
    }
  },
  computed: {
    valorTotalDoCarrinho() {
      let total = 0;
      if (this.carrinhoDeCompras.length) {
        this.carrinhoDeCompras.forEach(item => {
          total += item.preco;
        })
      }
      return total;
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
      // console.log("aquiii");
      // console.log(event.target);
      // console.log(event.currentTarget);
      if(event.target === event.currentTarget) {
        // fechar o modal só quando meu click for na section onde está meu evento;
        this.produto = false;
      }
    },
    clickForaCarrinho(event){
      if(event.target === event.currentTarget) {
        this.carrinhoAtivo = false;
      }
    },
    addItemNoCarrinho() {
      console.log("carrinho")
      // Quando adicionar item, deve subitrair do produto.estoque
      this.produto.estoque--;
      // Quando adicionar item, deve adicionar no carrinho
      const { id, nome, preco } = this.produto;
      console.log(id, nome, preco);
      this.carrinhoDeCompras.push({id, nome, preco});
      this.alertaMsg(`${nome} foi adicionado ao carrinho.`);

    },
    removerItemDoCarrinho(index) {
      //Quando Remover item
      this.carrinhoDeCompras.splice(index, 1);
    },
    checarLocalStorage() {
      if(window.localStorage.carrinho) {
        // existe "carrinho" no localStorage???
        this.carrinhoDeCompras = JSON.parse(window.localStorage.carrinho);
        // transforme "carrinho" que está como "String" para "Array"
      }
    },
    alertaMsg(mensagem) {
      console.log("alertaMsg",mensagem);
      this.msgDoItem = mensagem;
      this.msgMostrar = true;

      //ocultar a msg depois 1.5s;
      setTimeout(() => {
        this.msgMostrar = false;
      }, 1500);
    }
  },
  watch: {
    carrinhoDeCompras() {
      // Toda vez que houver alteração no carrinhoDeCompras, salve no localStorage;
      console.log("carrinhoDeCompras teve mudança")
      // Primeiro vamos transformar nosso Array ou Objeto em uma "String" com JSON.stringfy;
      // nosso "Key" vai ser "carrinho" & nosso "Value" vai ser "carrinhoDeCompras";
      window.localStorage.carrinho = JSON.stringify(this.carrinhoDeCompras);
    }

  },
  created() {
    this.getProdutos();
    this.checarLocalStorage();
  }
});