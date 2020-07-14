const init = () => {
    addEvents();
    listaTelaAtividades();
}

const addEvents = () => {
    document.getElementById("btnAdd").addEventListener('click', novo)
}

const CONSTANTES = {
    STORAGE_ATIVIDADE: "__lista_de_atividades__",
    TAG_LISTA_ATIVIDADES: "listDeAtividades"
}

const carregaAtividadesStorage = () => {
    let json = [];
    const listaAtividades = sessionStorage.getItem(CONSTANTES.STORAGE_ATIVIDADE);

    if (listaAtividades !== null) {
        json = JSON.parse(listaAtividades)
    }

    return json;
}

const listaTelaAtividades = () => {
    let listaAtividades = carregaAtividadesStorage();

    if(listaAtividades.length == 0){
        console.log('vazia')
    }

    const myNode = document.getElementById(CONSTANTES.TAG_LISTA_ATIVIDADES);
    while (myNode.lastElementChild) {
        myNode.removeChild(myNode.lastElementChild);
    }

    for (let i = 0; i < listaAtividades.length; i++) {
        const atividadeStr = listaAtividades[i];
        const li = document.createElement("li");
        li.className = "alert alert-primary";
        const atividade = document.createTextNode(atividadeStr);
        li.appendChild(atividade)
        document.getElementById(CONSTANTES.TAG_LISTA_ATIVIDADES).appendChild(li);

        var span = document.createElement("SPAN");
        span.addEventListener('click', remover)
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
    }
}

const remover = (e) => {
    console.log('foi')
    let listaAtividades = carregaAtividadesStorage();
    let deletar = e.target.previousSibling.data;
    const listaAtual = listaAtividades.filter(element => element !== deletar);
    const jsonStr = JSON.stringify(listaAtual)
    sessionStorage.setItem(CONSTANTES.STORAGE_ATIVIDADE, jsonStr)
    listaTelaAtividades();
}


const novo = () => {
    let listaAtividades = carregaAtividadesStorage();
    const inputAtividade = document.getElementById("inputAtividade").value;

    if (inputAtividade === '') {
        alert("obrigatório");
    } else {
        listaAtividades.push(inputAtividade)
        const jsonStr = JSON.stringify(listaAtividades)
        sessionStorage.setItem(CONSTANTES.STORAGE_ATIVIDADE, jsonStr)
        document.getElementById("inputAtividade").value = "";
        listaTelaAtividades();
    }

}

(function () {
    init()
})();
