///Se for adicionar a mecanica de escolha do  tema é necessario criar um menu com as escolhas
//possiveis
//
const body:HTMLBodyElement = document.querySelector("body") || null;
const palavra: HTMLSpanElement = document.querySelector("#palavra") || null;
const menssagem: HTMLSpanElement = document.querySelector("#menssagem") || null;
const btn: HTMLInputElement = document.querySelector("#btn");
const btn_reset: HTMLButtonElement = document.querySelector("#btn_reset");
const chute: HTMLInputElement = document.querySelector("#chute");
const erros_label: HTMLSpanElement = document.querySelector("#erros");
const tema:HTMLSpanElement = document.querySelector("#tema");
const errou_palavra_label:HTMLSpanElement = document.querySelector("#errou_palavra");


document.addEventListener("DOMContentLoaded", () => {
    function esconde_palavra(palavra:string): string{
        let palavra_escondida:string = "";

        for( let i in palavra.split('')){
            palavra_escondida = palavra_escondida+'_';
        }

        return palavra_escondida;
    }
    function tamanho_palavra(palavra:string): number{
        let num: number = 0;

        for( let i in palavra.split('')){
            num+=1;
        }
        return num;
    }
    function numeroAleatorioEntre(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function existe_letra(letra:string, palavra:Array<string>): Boolean{
        let i: number;
        //verifica se a letra existe no vetor, a função retorna true se existir
        for(i = 0; i < palavra.length; i++){
            if(palavra[i] === letra){
                //console.log(`palavra na f: ${palavra}, letra: ${letra} condição : ${palavra[i] === letra}`)
                return true
            } else {
                //console.log('Falso:',palavra[i] === letra)
            }

        }
        return false;
    }

    let frutas: Array<string> = [
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

    let indice = numeroAleatorioEntre(0, frutas.length-1);
    let palavra_aleatoria = frutas[indice] //-> manga
    let palavra_escondida = esconde_palavra(palavra_aleatoria).split("");
    let size :number = tamanho_palavra(palavra_aleatoria);//size com tamanho errado
    let chances: number = size+4; //sempre 4 nº de chances a mais
    let i: number;// p/ for
    let venceu:boolean= false;
    let tentativas = 0;
    let erros: Array<string> = [];
    let acertos: Array<string> = [];

    palavra.innerHTML = palavra_escondida.join(" ").toUpperCase();

    btn.addEventListener("click", (event)=>{
        event.preventDefault();

        const chuteValue:string = chute.value;
        let acertou: boolean = false;//flag para perder chances

        for(i = 0; i < size; i++ ){
            if(palavra_aleatoria.split("")[i] == chuteValue){
                palavra_escondida[i] = chuteValue;//.toUpperCase();
                acertou = true;
            }
        }
        //se errou pede 1 chance
        if (acertou === false){
            chances-=1;
        }

        if(existe_letra(chuteValue, palavra_aleatoria.split(""))){
            acertos.push(chuteValue)
        } else {

            if(chuteValue && chuteValue != palavra_aleatoria){
                if(chuteValue.length === 0){//A primeira palavra errada sempre será adiconada
                    erros.push(chuteValue.toUpperCase())
                } else {
                    if(!existe_letra(chuteValue, erros) && chuteValue != palavra_aleatoria){//verfica se o erro ja esta nos erros cometidos
                        erros.push(chuteValue.toUpperCase());
                    }
                }
            }
        }
        // Se o jogador tentou uma palavra mas errou!
        if (chuteValue.length > 1 && chuteValue != palavra_aleatoria){
            chances-=1;
            errou_palavra_label.innerHTML = "Você errou a palavra, perdeu 2 chances";
        }

        if(palavra_escondida.join("") === palavra_aleatoria || chuteValue == palavra_aleatoria){
            venceu = true;
            palavra_escondida = palavra_aleatoria.split("");
        }

        erros_label.innerHTML = `Erros: ${erros.join(" - ")}`

        if(chances <= 0 || venceu){
            tentativas++;
            btn_reset.style.display = 'inline-block';
            let mensagem:string = venceu ? "Parabéns "+" voce acertou em "+ tentativas +
            " tentativa(s) a palavra <strong>"+palavra_aleatoria.toUpperCase():"<strong/>Fim de jogo a palavra era: "+palavra_aleatoria.toUpperCase();

            if(venceu){
                menssagem.style.color = "green";
            } else {
                menssagem.style.color = "red";
            }
            menssagem.innerHTML = mensagem;
        }

        palavra.innerHTML = `${palavra_escondida.join(" ").toUpperCase()} <br><br>Chances restantes: ${chances}`;
        chute.value = "";
    })

    function recomecar(){
        chances = size+4;
        chute.value = "";
        indice = numeroAleatorioEntre(0,frutas.length -1)
        palavra_aleatoria = frutas[indice] //-> manga
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
