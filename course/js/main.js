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
    document.getElementById("totalValor").innerHTML = formatValor(total);//aula 11
}

//Listando dados Aula 3 da tabela 
function setList(list) {
    var table = '<thead><tr><td>Descrição</td><td>Quantidade</td><td>Valor</td><td>Ação</td></tr><head><tbody>';
    for (var key in list) {
        table += '<tr><td>' + formatDesc(list[key].descricao) + '</td><td>' + formatQuantidade(list[key].quantidade) + '</td><td>' + formatValor(list[key].valor) + '</td><td> <button class="btn btn-primary" onclick="setUpdate(' + key + ');" > Editar </button> | <button class="btn btn-danger" onclick="excluirDados(' + key + ');" > Excluir </button> </td></tr>'; //button aula6 
    }
    table += '</tbody>';              
    document.getElementById("listtable").innerHTML = table;
    getTotal(list);//aula 11
    saveListStorage(list);//aula13
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

    if(!validacao()){
        return;
    }

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
    //aula 9 codigo faz aparecer as frases de erros
    document.getElementById("errors").style.display = "block";//fim do codigo de erros
}
//AULA 7 criando a funcao para atualizar os dados do form
function salvarDados(){

    if(!validacao()){
        return;
    }

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

//AULA 9 VALIDACAO DE FORMULARIO
function formatQuantidade(quantidade) {
    return parseInt(quantidade);
}

function validacao(){
    var descricao = document.getElementById("descricao").value;
    var quantidade = document.getElementById("quantidade").value;
    var valor = document.getElementById("valor").value;
    var errors = "";

    document.getElementById("errors").style.display = "none";//Campos preenchido corretamente mensagem somi

    if(descricao === ""){
        errors += '<p>Preencha Todos os campos</p>';
    }
    if(quantidade === ""){
        errors += '<p>Preencha a Quantidade</p>';
    }else if(quantidade != parseInt(quantidade)){
        errors += '<p>Preencha um valor válido</p>';    
    }
    if (valor === "") {
        errors += '<p>Preencha um valor</p>';
    } else if(valor != parseFloat(valor)) {
        errors += '<p>Preencha um valor valido<p/>';
    }
    if(errors != "") {
        //aula 9 codigo faz aparecer as frases de erros
        document.getElementById("errors").style.display = "block";//fim do codigo de erros colocar esse codigo no resert form

        //pegando o css com javascript para dar estilos na mensagem de erros
        document.getElementById("errors").style.backgroundColor = "#ff0000";
        document.getElementById("errors").style.color = "#fff";
        document.getElementById("errors").style.padding = "10px";
        document.getElementById("errors").style.margin = "10px";
        document.getElementById("errors").style.borderRadius = "13px";//fim aula 9 

        document.getElementById("errors").innerHTML = "<h3>Ops Preenchas os Campos</h3>" + errors;
        return 0;
    }else {
        return 1;
    }
}

// Aula 12 deletando Lista;
function deleteList(){
    if(confirm("Tem Sertesa que deseja excluir a tabela?")){
        list = '';
        setList(list);
    }
}//fim

// aula 13 gravando dados no Storage
function saveListStorage(list){
    var jsonStr = JSON.stringify(list);//usando json para transfoma texto em uma string
    localStorage.setItem("list",jsonStr);
}

function initListStorage(){
    var testList = localStorage.getItem("list");
    if(testList){
        list = JSON.parse(testList);
    }
    setList(list);
}
initListStorage();


