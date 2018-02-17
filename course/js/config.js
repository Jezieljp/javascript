function setConfig() {
    var texts = {
        "title":"Shopping Control obre o lar"
    };
    //setando nossa variavel
    document.title = texts.title;
    //Pegando dados do meu html 
    document.getElementById("navTitle").innerHTML = texts.title;
}
//executando nossa function
setConfig();