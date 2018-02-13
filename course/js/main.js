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

//Listando dados Aula 3 da tabela 
function setList(list) {
    var table = '<thead><tr><td>Descrição</td><td>Quantidade</td><td>Valor</td><td>Ação</td></tr><head><tbody>';
    for (var key in list) {
        table += '<tr><td>' + formatDesc(list[key].descricao) + '</td><td>' + list[key].quantidade + '</td><td>' + formatValor(list[key].valor) + '</td><td> <button class="btn btn-primary" onclick="setUpdate(' + key + ');" > Editar </button> | <button class="btn btn-danger" onclick="excluirDados(' + key + ');" > Excluir </button> </td></tr>'; //button aula6 
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
function add() { //funcao ta no html onclick butto
    var descricao = document.getElementById("descricao").value;
    var quantidade = document.getElementById("quantidade").value;
    var valor = document.getElementById("valor").value;

    list.unshift({ "descricao": descricao, "quantidade": quantidade, "valor": valor });
    setList(list);//Esse metodo serve para Atualisando a tabela
}

//AULA 6 BUTTONS FAZ O BOTAO SALVA E CANCELAR APARECER
function setUpdate(id) {
    var obj = list[id];
    document.getElementById("descricao").value = obj.descricao;
    document.getElementById("quantidade").value = obj.quantidade;
    document.getElementById("valor").value = obj.valor;
    document.getElementById("btnAtualizar").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";

    //aula 7 Atualizando dados do formulario
    document.getElementById("inputIdAtualizar").innerHTML = '<input id="idAtualizar" type="hidden" value="' + id +  '">';

}
//cancela dados do formulario aula 6
function cancelarForm() {
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("btnAtualizar").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";

    //aula 7 limpando dado do form
    document.getElementById("inputIdAtualizar").innerHTML = "";
}
//AULA 7 criando a funcao para atualizar os dados do form
function salvarDados(){
    var id = document.getElementById("idAtualizar").value;
    var descricao = document.getElementById("descricao").value;
    var quantidade = document.getElementById("quantidade").value;
    var valor = document.getElementById("valor").value;

    list[id] = {"descricao":descricao, "quantidade":quantidade, "valor":valor};
    //Atualizando os dados 
    cancelarForm();
    setList(list);
}
//AULA 8 DELETANDO DADOS DO FORMULARIO
function excluirDados(id){
    if(confirm("Tem Serteza que Quer excluir")){
        if(id === list.length - 1) {//linpando ultimo
            list.pop(); //pop server para apagar um item 
        }else if(id === 0){//excluindo o primeiro
            list.shift();//shift apaga o primeiro item
        }else {
            var arrayInicial = list.slice(0,id);//apagando itens no meio do formulario
            var arrayFinal = list.slice(id + 1);
            list = arrayInicial.concat(arrayFinal);
        }
        setList(list);
    }

}

//rodando a função setList
setList(list);
console.log(getTotal(list));