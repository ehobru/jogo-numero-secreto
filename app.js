let listaNumeros = [];
let numeroLimite = 10;
let numeroSecreto = numeroAleatorio();
let tentativas = 1;

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.5; 
        utterance.volume = 0.4;
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function mensagemInicial() {
    exibirTexto("h1", "Jogo do Número Secreto");
    exibirTexto("p", "Escolha um número entre 1 e 10");
}
mensagemInicial();

function verificarChute() {
    let chute = document.querySelector("input").value;

    if (chute == numeroSecreto) {
        exibirTexto("h1", "Parabéns!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o Número Secreto com ${tentativas} ${palavraTentativa}`;
        exibirTexto("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroSecreto) {
            exibirTexto("p", "O Número Secreto é menor");
        } else {
            exibirTexto("p", "O Número Secreto é maior");
        }
        tentativas++;
        limparCampo();
    }
}

function numeroAleatorio() {
    let numeroSecreto = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeNumeros = listaNumeros.length;

    if (quantidadeNumeros == numeroLimite) {
        listaNumeros = [];
    }
    if (listaNumeros.includes(numeroSecreto)) {
        return numeroAleatorio();
    } else {
        listaNumeros.push(numeroSecreto);
        console.log(listaNumeros);
        return numeroSecreto;
    }
}

    function limparCampo() {
        chute = document.querySelector("input");
        chute.value = " ";
    }

    function reiniciarJogo() {
        numeroSecreto = numeroAleatorio();
        limparCampo();
        tentativas = 1;
        mensagemInicial();
        document.getElementById("reiniciar").setAttribute("disabled", true);
    }