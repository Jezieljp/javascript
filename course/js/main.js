//Definindo a logica da aplicação aula 2 
var list = [
    { "descricao": "caneta", "quantidade": "1", "valor": "5.40" },
    { "descricao": "caderno", "quantidade": "12", "valor": "1.99" },
    { "descricao": "livro", "quantidade": "1", "valor": "15.00" }
];
function getTotal(list) {
    var total = 0;
    //laço de repetição
    for (var key in list) {
        total += list[key].valor * list[key].quantidade;
    }
    return total;
}

//Listando dados Aula 3
function setList(list) {
    var table = '<thead><tr><td>Descrição</td><td>Quantidade</td><td>Valor</td><td>Ação</td></tr><head><tbody>';
    for (var key in list) {
        table += '<tr><td>' + formatDesc(list[key].descricao) + '</td><td>' + list[key].quantidade + '</td><td>' + formatValor(list[key].valor) + '</td><td>Editar | Excluir</td></tr>';
    }
    table += '</tbody>';
    document.getElementById("listtable").innerHTML = table;
}
//Formatando String e Valores aula 4 
function formatDesc(descricao) { //pega essa função e coloca ela na table na desc
    
    var str = descricao.toLowerCase();//transformando letras em minusculas
    str = str.charAt(0).toUpperCase() + str.slice(1);//primeira letra maiuscula
    return str;
}
//Valores numeros
function formatValor(valor) {//pega essa função e coloca ela na table no local do valoe acima 
    var num = parseFloat(valor).toFixed(2) + "";//colocar virgula depois de 2 numeros
    num = num.replace(".", ",");
    num = "R$ " + num;//colocando o sifrao antes do valor
    return num;
}
//Acrecentando produtos na tabela aula 5
function add(){ //funcao ta no html onclick butto
var descricao = document.getElementById("descricao").value;
var  quantidade = document.getElementById("quantidade").value;
var valor = document.getElementById("valor").value;

list.unshift({"descricao":descricao, "quantidade":quantidade, "valor":valor});
setList(list);//Esse metodo serve para Atualisando a tabela
}
//rodando a função setList
setList(list);
console.log(getTotal(list));