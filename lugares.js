///Se for adicionar a mecanica de escolha do  tema é necessario criar um menu com as escolhas
//possiveis
//
var body = document.querySelector("body") || null;
var palavra = document.querySelector("#palavra") || null;
var menssagem = document.querySelector("#menssagem") || null;
var btn = document.querySelector("#btn");
var btn_reset = document.querySelector("#btn_reset");
var chute = document.querySelector("#chute");
var erros_label = document.querySelector("#erros");
var tema = document.querySelector("#tema");
var errou_palavra_label = document.querySelector("#errou_palavra");
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
    const lugares = [
  "Amazonia",
  "Saara",
  "Iguacu",
  "BarreiraDeCoral",
  "Everest",
  "AuroraBoreal",
  "Fiordes",
  "MachuPicchu",
  "Pompeia",
  "EstátuaLiberdade",
  "MuralhaChina",
  "ColiseuRoma",
  "TajMahal",
  "PiramidesGize",
  "Stonehenge",
  "Moais",
  "Pantanal",
  "SalarUyuni",
  "GrandCanyon",
  "Yellowstone",
  "Kilauea",
  "PeritoMoreno",
  "Copacabana",
  "TimesSquare",
  "TorreEiffel",
  "RioNilo",
  "LagoBaikal",
  "SelvaBorneo",
  "TemplosAngkor",
  "Veneza",
  "Dubai",
  "Tokyo",
  "Chernobyl",
  "Kilimanjaro"
];

console.log(lugares);
   var indice = numeroAleatorioEntre(0, lugares.length - 1);
    var palavra_aleatoria = lugares[indice]; //-> manga
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
        var acertou = false; //flag para perder chances
        for (i = 0; i < size; i++) {
            if (palavra_aleatoria.split("")[i] == chuteValue) {
                palavra_escondida[i] = chuteValue; //.toUpperCase();
                acertou = true;
            }
        }
        //se errou pede 1 chance
        if (acertou === false) {
            chances -= 1;
        }
        if (existe_letra(chuteValue, palavra_aleatoria.split(""))) {
            acertos.push(chuteValue);
        }
        else {
            if (chuteValue && chuteValue != palavra_aleatoria) {
                if (chuteValue.length === 0) { //A primeira palavra errada sempre será adiconada
                    erros.push(chuteValue.toUpperCase());
                }
                else {
                    if (!existe_letra(chuteValue, erros) && chuteValue != palavra_aleatoria) { //verfica se o erro ja esta nos erros cometidos
                        erros.push(chuteValue.toUpperCase());
                    }
                }
            }
        }
        // Se o jogador tentou uma palavra mas errou!
        if (chuteValue.length > 1 && chuteValue != palavra_aleatoria) {
            chances -= 1;
            errou_palavra_label.innerHTML = "Você errou a palavra, perdeu 2 chances";
        }
        if (palavra_escondida.join("") === palavra_aleatoria || chuteValue == palavra_aleatoria) {
            venceu = true;
            palavra_escondida = palavra_aleatoria.split("");
        }
        erros_label.innerHTML = "Erros: ".concat(erros.join(" - "));
        if (chances <= 0 || venceu) {
            tentativas++;
            btn_reset.style.display = 'inline-block';
            var mensagem = venceu ? "Parabéns " + " voce acertou em " + tentativas +
                " tentativa(s) a palavra <strong>" + palavra_aleatoria.toUpperCase() : "<strong/>Fim de jogo a palavra era: " + palavra_aleatoria.toUpperCase();
            if (venceu) {
                menssagem.style.color = "green";
            }
            else {
                menssagem.style.color = "red";
            }
            menssagem.innerHTML = mensagem;
        }
        palavra.innerHTML = "".concat(palavra_escondida.join(" ").toUpperCase(), " <br><br>Chances restantes: ").concat(chances);
        chute.value = "";
    });
    function recomecar() {
        chances = size + 4;
        chute.value = "";
        indice = numeroAleatorioEntre(0, lugares.length - 1);
        palavra_aleatoria = lugares[indice]; 
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
