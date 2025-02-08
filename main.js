var body = document.querySelector("body") || null;
var palavra = document.querySelector("#palavra") || null;
var menssagem = document.querySelector("#menssagem") || null;
var btn = document.querySelector("#btn");
var btn_reset = document.querySelector("#btn_reset");
var chute = document.querySelector("#chute");
var erros_label = document.querySelector("#erros");
document.addEventListener("DOMContentLoaded", function () {
    function esconde_palavra(palavra) {
        var palavra_escondida = "";
        for (var i_1 in palavra.split('')) {
            palavra_escondida = palavra_escondida + '_';
        }
        return palavra_escondida;
    }
    function tamanho_palavra(palavra) {
        var num = 0;
        for (var i_2 in palavra.split('')) {
            num += 1;
        }
        return num;
    }
    function numeroAleatorioEntre(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function existe_letra(letra, palavra) {
        var i;
        //verifica se a letra existe no vetor, a função retorna true se existir
        for (i = 0; i < palavra.length; i++) {
            if (palavra[i] === letra) {
                //console.log(`palavra na f: ${palavra}, letra: ${letra} condição : ${palavra[i] === letra}`)
                return true;
            }
            else {
                //console.log('Falso:',palavra[i] === letra)
            }
        }
        return false;
    }
    var frutas = [
        "maca",
        "banana",
        "laranja",
        "morango",
        "uva",
        "manga",
        "abacaxi",
        "melancia",
        "kiwi",
        "pessego",
        "amora",
        "coco",
        "abacate",
        "framboesa",
        "cereja",
        "goiaba",
        "graviola",
        "tangerina",
        "limao",
        "maracuja",
        "ameixa",
        "melao",
        "acerola",
        "caju",
        "roma",
        "figo",
        "damasco",
        "nectarina",
        "lichia",
        "quina",
        "tamara"
    ];
    var indice = numeroAleatorioEntre(0, frutas.length - 1);
    var palavra_aleatoria = frutas[indice]; //-> manga
    var palavra_escondida = esconde_palavra(palavra_aleatoria).split("");
    var size = tamanho_palavra(palavra_aleatoria); //size com tamanho errado
    var chances = size + 4; //sempre 4 nº de chances a mais
    var i; // p/ for
    var venceu = false;
    var tentativas = 0;
    var erros = [];
    var acertos = [];
    palavra.innerHTML = palavra_escondida.join(" ").toUpperCase();
    btn.addEventListener("click", function (event) {
        event.preventDefault();
        var chuteValue = chute.value;
        for (i = 0; i < size; i++) {
            if (palavra_aleatoria.split("")[i] == chuteValue) {
                palavra_escondida[i] = chuteValue; //.toUpperCase();
            }
        }
        if (existe_letra(chuteValue, palavra_aleatoria.split(""))) {
            acertos.push(chuteValue);
        }
        else {
            if (chuteValue) {
                if (chuteValue.length === 0) { //A primeira palavra errada sempre será adiconada
                    erros.push(chuteValue.toUpperCase());
                }
                else {
                    if (!existe_letra(chuteValue, erros)) { //verfica se o erro ja esta nos erros cometidos
                        erros.push(chuteValue.toUpperCase());
                    }
                }
            }
        }
        tentativas++;
        if (palavra_escondida.join("") === palavra_aleatoria) {
            venceu = true;
        }
        if (chances > 0 && chuteValue) {
            erros_label.innerHTML = "Erros: ".concat(erros.join(" - "));
            chances--;
            if (chances === 0 || venceu) {
                btn_reset.style.display = 'inline-block';
                var mensagem = venceu ? "Parabéns " + " voce acertou em " + tentativas +
                    " tentativas a palavra <strong>" + palavra_escondida.join(" ").toUpperCase() : "<strong/>Fim de jogo a palavra era: " + palavra_aleatoria.toUpperCase();
                if (venceu) {
                    menssagem.style.color = "green";
                }
                else {
                    menssagem.style.color = "red";
                }
                menssagem.innerHTML = mensagem;
            }
        }
        palavra.innerHTML = "".concat(palavra_escondida.join(" ").toUpperCase(), " <br><br>Chances restantes: ").concat(chances);
        chute.value = "";
    });
    function recomecar() {
        chances = size + 4;
        chute.value = "";
        indice = numeroAleatorioEntre(0, frutas.length - 1);
        palavra_aleatoria = frutas[indice]; //-> manga
        palavra_escondida = esconde_palavra(palavra_aleatoria).split("");
        palavra.innerHTML = palavra_escondida.join(" ").toUpperCase();
        menssagem.innerHTML = " ";
        venceu = false;
        erros = [];
        acertos = [];
        erros_label.innerHTML = "";
    }
    btn_reset.addEventListener("click", recomecar);
});
