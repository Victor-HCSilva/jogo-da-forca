var menssagem = document.querySelector("#menssagem") || null;
var btn = document.querySelector("#btn");
var btn_reset = document.querySelector("#btn_reset") || null;
var chute = document.querySelector("#chute") || null;
var boneco = document.querySelector("#boneco") || null;
//O botão de resete so fica visivel quando temrmina o jogo
btn_reset.style.display = "none";
var Utils = /** @class */ (function () {
    function Utils() {
    }
    //retorna um numero aleatório em um intervalo dado
    Utils.prototype.randomIndice = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    // Retorna verdadeiro se a letra/palavra está contida no array        
    Utils.prototype.contains = function (letra, array_de_palavras) {
        for (var i = 0; i < array_de_palavras.length; i++) {
            if (letra.toUpperCase() === array_de_palavras[i].toUpperCase()) {
                return true;
            }
        }
    };
    //verifica se duas palavras são iguais
    Utils.prototype.equal = function (palavra1, palavra2) {
        return palavra1.toUpperCase() === palavra2.toUpperCase();
    };
    Utils.prototype.toArray = function (palavra) {
        return palavra.split("");
    };
    return Utils;
}());
var HangMan = /** @class */ (function () {
    function HangMan(palavra) {
        this.palavra = palavra;
        this.chances = palavra.length + 4;
        this.erros = [];
    }
    //Esconde com tracos a palavra
    HangMan.prototype.hide = function () {
        var palavra_escondida = "";
        for (var i = 0; i < this.palavra.length; i++) {
            palavra_escondida += '_';
        }
        return palavra_escondida.split("");
    };
    //Funções para obter valores privados
    HangMan.prototype.getPalavra = function () {
        return this.palavra;
    };
    HangMan.prototype.getChances = function () {
        return this.chances;
    };
    HangMan.prototype.getErros = function () {
        return this.erros;
    };
    //adiciona a letra/palavra errada no vetor
    HangMan.prototype.addErro = function (e) {
        this.erros.push(e);
    };
    //Retirar chances, o tamanho do chute determina se o jogador tentou 
    //chutar de vez a palavra
    HangMan.prototype.DiminuirChances = function (flag, chute) {
        //verifica se houve erro, se não nao retira pontos
        if (flag === false) {
            if (chute.length === 1) {
                this.chances--;
            }
            else if (chute.length > 1) {
                this.chances -= 2;
            }
        }
    };
    //reset
    HangMan.prototype.resetChances = function (size) {
        this.chances = size + 4;
    };
    return HangMan;
}());
document.addEventListener("DOMContentLoaded", function () {
    //Funcoes uteis
    var utils = new Utils();
    //variaveis
    var forcaDesenhos = [
        "\n          ______\n        |      |\n        |\n        |\n        |\n        |________\n        ",
        "\n         ______\n        |      |\n        |      O\n        |\n        |\n        |________\n        ",
        "\n         ______\n        |      |\n        |      O\n        |      |\n        |\n        |________\n        ",
        "\n         ______\n        |      |\n        |      O\n        |     /|\n        |\n        |________\n        ",
        "\n         ______\n        |      |\n        |      O\n        |     /|\\\n        |\n        |________\n        ",
        "\n         ______\n        |      |\n        |      O\n        |     /|\\\n        |     / \\\n        |________\n        ",
        "\n           \\O/\n            |\n           / \\\n          -----\n        Voc\u00EA venceu!\n        ",
        "\n           \n        |----| \n        |\n        |\n        |  o-\\--C\n        --------\n        PERDEU\n        "
    ];
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
    var indice = utils.randomIndice(0, frutas.length - 1);
    var palavra_aleatoria = frutas[indice].toUpperCase();
    var hangman = new HangMan(palavra_aleatoria);
    var erros = hangman.getErros();
    var palavra_escondida = hangman.hide();
    //primeiras exibições
    menssagem.innerHTML = " Quant. de letras: <strong>".concat(palavra_escondida.length, "</strong>\n    <br>\n    ").concat(palavra_escondida.join(" "), "\n    ");
    //desenho do boneco
    boneco.innerHTML = forcaDesenhos[1];
    btn.addEventListener("click", function (event) {
        event.preventDefault();
        //flag para ver se a letra está na palavra
        var esta = false;
        //flag de vitoria
        var venceu = false;
        //valor digitado
        var valor_chute = chute.value.toUpperCase();
        //Preenchendo
        for (var i = 0; i < palavra_aleatoria.length; i++) {
            if (palavra_aleatoria[i] == valor_chute) {
                palavra_escondida[i] = valor_chute;
                esta = true;
            }
        }
        //Se escrever a palavra toda e acertar        
        if (utils.equal(valor_chute, palavra_aleatoria) || utils.equal(palavra_escondida.join(""), palavra_aleatoria)) {
            venceu = true;
        }
        //log
        console.log("chute:", valor_chute, "Chances:", hangman.getChances());
        console.log("Palavra escondida:", palavra_escondida.join(","), "palavra:", palavra_aleatoria);
        console.log("condicao; ", palavra_aleatoria === palavra_escondida.join(""));
        //diminuindo chances caso tenha errado
        hangman.DiminuirChances(esta, valor_chute);
        //Se errou o chute, a letra errada é armazenada para ser exibida
        if (!(utils.contains(valor_chute, hangman.getErros())) && esta === false) {
            hangman.addErro(valor_chute);
        }
        //Vitoria/derrota/status
        if (venceu) {
            menssagem.style.color = "white";
            menssagem.innerHTML = "Parab\u00E9ns Acertou a palavra ".concat(palavra_aleatoria, "!!!");
            boneco.innerHTML = "\n                ".concat(forcaDesenhos[forcaDesenhos.length - 2], "\n                ");
            //enquanto as chances  > 0 e var. venceu === false
        }
        else if (hangman.getChances() > 0 && venceu === false) {
            //imagem normal
            boneco.innerHTML =
                "CHANCES: <strong style=\"font-size: 3rem;\"> ".concat(hangman.getChances(), " </strong>\n            ").concat(forcaDesenhos[2], " ");
            //mensagem padrão
            menssagem.innerHTML =
                "Erros: <strong> ".concat(erros.join(" - "), " </strong>   \n            <br> \n            Chances: <strong>").concat(hangman.getChances(), "</strong>\n            <br> \n            Palavra: ").concat(palavra_escondida.join(" "), " ");
        }
        else if (hangman.getChances() <= 0) {
            //imagem de derrota
            boneco.innerHTML =
                "".concat(forcaDesenhos[forcaDesenhos.length - 1]);
            //menssagem.style.color= "darkred";
            menssagem.innerHTML = "Perdeu, a palavra era ".concat(palavra_aleatoria);
        }
        //Deixando o botão invisivel
        if (venceu === true || hangman.getChances() <= 0) {
            btn_reset.style.display = "inline";
        }
        //Removendo o valor digitado:
        chute.value = "";
        //RESETAR O JOGO
        btn_reset.addEventListener("click", function () {
            indice = utils.randomIndice(0, frutas.length - 1);
            palavra_aleatoria = frutas[indice].toUpperCase();
            hangman = new HangMan(palavra_aleatoria);
            erros = hangman.getErros();
            palavra_escondida = hangman.hide();
            btn_reset.style.display = "none";
            venceu = palavra_escondida.join("") === palavra_aleatoria;
            hangman.resetChances(palavra_aleatoria.length); //atibuindo mais chances
            // menssagem.style.color = "black";
            menssagem.innerHTML = palavra_escondida.join(" ");
            //imagem inicial
            boneco.innerHTML = "\n            ".concat(forcaDesenhos[2], "\n            ");
        });
    });
});
