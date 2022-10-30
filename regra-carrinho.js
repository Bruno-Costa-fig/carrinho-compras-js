/*
  $ -> aqui temos um encapsulamento do query selector, com isso
      não precisamos escrever ele sempre
  
  $_id -> aqui temos um encapsulamento do getElementById
*/
var $ = document.querySelector.bind(document)
var $_id = document.getElementById.bind(document)

var itemsArray = []
var itemsCarrinho = []

var btnAdicionar = $("#btn-adicionar")
var btnFecharPedido = $("#btn-fechar-pedido")
var btnNovoPedido = $("#btn-novo-pedido")
btnAdicionar.addEventListener("click", adicionarItemLista)
btnFecharPedido.addEventListener("click", concluirPedido)
btnNovoPedido.addEventListener("click", novoPedido)


// adiciona item na lista de items
function adicionarItemLista() {
  var item = $("#input-item")

  // valida se o input não veio vazio
  if(item.value == "" || item.value == undefined){
    return
  }

  itemsArray.push(item.value)
  item.value = null
  atualizarListaItems()
}

// aqui a lista de items é atualizada. Ela sempre é gerada novamente.
function atualizarListaItems(){
  var listaItems = $("#lista-items")

  // apaga todos os items do ul
  listaItems.innerHTML = ""

  // itera pela lista de items e cria um li para cada um deles e adiciona no ul
  itemsArray.map((element, index) => {
    var liItem = document.createElement("li")
    liItem.innerHTML = `${element} <i class='bx bx-basket' data-value='${element}' data-index='${index}' id='item=${index}' onclick='addItemCarrinho(event)'></i></i>`
    
    listaItems.appendChild(liItem)
  });

}

// adiciona item ao carrinho, e retira da lista de items
function addItemCarrinho(e){
  var li = $_id(e.target.id)
  var liId = Number.parseInt(e.target.dataset.index)
  var itemValue = e.target.dataset.value

  // retira o item da lista de items
  itemsArray.splice(liId, 1)
  atualizarListaItems()

  // adiciona o item selecionado ao carrinho
  itemsCarrinho.push(itemValue)
  atualizaItemsCarrinho()
}

// remove o item do carrinho e coloca novamente na lista de items
function removeItemCarrinho(e){
  var li = $_id(e.target.id)
  var liId = Number.parseInt(e.target.dataset.index)
  var itemValue = e.target.dataset.value

  // retira item do carrinho e atualiza o carrinho
  itemsCarrinho.splice(liId, 1)
  atualizaItemsCarrinho()
  
  // coloca novamente o item na lista de items e atualiza a lista
  itemsArray.push(itemValue)
  atualizarListaItems()
}

// atualiza os items do carrinho. A lista sempre é gerada novamente.
function atualizaItemsCarrinho(){
  var carrinho = $("#carrinho-items")

  carrinho.innerHTML = ""

  itemsCarrinho.map((element, index) => {
    var liItem = document.createElement("li")
    liItem.innerHTML = `${element} <i class='bx bx-trash' data-value='${element}' data-index='${index}' id='item=${index}' onclick='removeItemCarrinho(event)'></i></i>`
    
    carrinho.appendChild(liItem)
  });
}

// conclui o pedido e exibe a página de pedido concluído.
function concluirPedido(){
  // valida se o carrinho está vazio
  if(itemsCarrinho.length <= 0){
    alert("Seu carrinho está vazio!")
    return
  }

  // esconde o container dos items e carrinho
  var containerCarrinho = $("#carrinho-container")
  containerCarrinho.classList.add("hidden")

  // mostra o container do pedido concluído
  var containerPedido = $("#pedido-container")
  containerPedido.classList.add("show")

  // exibi a lista dos items do carrinho que foram comprados
  var listaPedido = $("#lista-pedido")

  itemsCarrinho.map((element) => {
    var liItem = document.createElement("li")
    liItem.innerHTML = `${element}`
    
    listaPedido.appendChild(liItem)
  });
}

// zera o carrinho e exibe novamente a lista de items para fazer um novo pedido
function novoPedido(){

  /* o pop retira o ultimo item do array e retorna esse exato item. Com isso já é feito o push
     para a lista de items novamente. Assim o carrinho será zerado novamente
  */
  while(itemsCarrinho.length){
    itemsArray.push(itemsCarrinho.pop())
  }
  
  // mostra novamente o container dos items e carrinho
  var containerCarrinho = $("#carrinho-container")
  containerCarrinho.classList.remove("hidden")

  // esconde o container do pedido concluído
  var containerPedido = $("#pedido-container")
  containerPedido.classList.remove("show")

  // renderiza novamente as lista
  atualizaItemsCarrinho()
  atualizarListaItems()
}