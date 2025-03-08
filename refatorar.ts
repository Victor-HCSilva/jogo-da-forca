const palavra: HTMLSpanElement = document.querySelector("#palavra") || null;
const menssagem: HTMLSpanElement = document.querySelector("#menssagem") || null;
const btn: HTMLInputElement = document.querySelector("#btn");
const btn_reset: HTMLButtonElement = document.querySelector("#btn_reset") || null;
const chute: HTMLInputElement = document.querySelector("#chute") || null;
const hangman_label: HTMLInputElement = document.querySelector("#hangman") || null;


//O botão de resete so fica visivel quando temrmina o jogo
btn_reset.style.display = "none";
class Utils{

    //retorna um numero aleatório em um intervalo dado
    randomIndice(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Retorna verdadeiro se a letra/palavra está contida no array        
    contains(letra: string, array_de_palavras:Array<string>): Boolean{
        for(let i = 0; i < array_de_palavras.length; i++ ){
            if(letra.toUpperCase() === array_de_palavras[i].toUpperCase()){
    return true;
            }
        }
    }

    //verifica se duas palavras são iguais
    equal(palavra1: string, palavra2: string ): Boolean{
        return palavra1.toUpperCase() === palavra2.toUpperCase();
    }
    toArray(palavra: string): Array<string>{
        return palavra.split("");
    }

}
class HangMan {
    private palavra: string;
    private chances: number;
    private erros: Array<string>;

    constructor(palavra: string) {
        this.palavra = palavra;
        this.chances = palavra.length + 4;
        this.erros = [] ;    
    }

    //Esconde com tracos a palavra
    hide(): Array<string> {
        let palavra_escondida: string = "";

        for (let i = 0; i < this.palavra.length; i++) {
            palavra_escondida += '_';
        }
        return palavra_escondida.split("");
    }

    //Funções para obter valores privados
    getPalavra(): string {
        return this.palavra;
    }

    getChances(): number{
        return this.chances;
    }

    getErros(): Array<string>{
        return this.erros
    }

    //adiciona a letra/palavra errada no vetor
    addErro(e: string){
        this.erros.push(e);
    }

    //Retirar chances, o tamanho do chute determina se o jogador tentou 
    //chutar de vez a palavra
    DiminuirChances(flag: boolean ,chute: string){
        //verifica se houve erro, se não nao retira pontos
        if(flag === false){
             if(chute.length === 1){
                this.chances--;
            }
            else if (chute.length > 1){
                this.chances -= 2;
            }
        }
    }

    //reset
    resetChances(size: number){
        this.chances = size + 4;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    //Funcoes uteis
    const utils = new Utils()
    //adicionar
    const forcaDesenhos = [
        `
          ______
        |      |
        |
        |
        |
        |________
        `,
          `
         ______
        |      |
        |      O
        |
        |
        |________
        `,
          `
         ______
        |      |
        |      O
        |      |
        |
        |________
        `,
          `
         ______
        |      |
        |      O
        |     /|
        |
        |________
        `,
          `
         ______
        |      |
        |      O
        |     /|\\
        |
        |________
        `,
          `
         ______
        |      |
        |      O
        |     /|\\
        |     / \\
        |________
        `,
          `
           \\O/
            |
           / \\
          -----
        Você venceu!
        `
    ];

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

    let indice = utils.randomIndice(0, frutas.length - 1);
    let palavra_aleatoria = frutas[indice].toUpperCase(); 
    let hangman = new HangMan(palavra_aleatoria);
    let erros = hangman.getErros()
    let palavra_escondida: Array<string> = hangman.hide()

    btn.addEventListener("click", (event) => {

        event.preventDefault() 

        //flag para ver se a letra está na palavra
        let esta = false;

        //um array de caracteres
        let venceu = palavra_escondida.join("") === palavra_aleatoria;
        let valor_chute: string = chute.value.toUpperCase();

        //Se escrever a palavra toda e acertar        
        if(utils.equal(valor_chute, palavra_aleatoria)){
            venceu = true;
        }

        //Preenchendo
        for(let i = 0; i < palavra_aleatoria.length; i++ ){
            if(palavra_aleatoria[i] == valor_chute){
                palavra_escondida[i] = valor_chute;
                esta = true;
            }
        }

        //console.log("chute:", valor_chute, "Chances:", hangman.getChances());
        //console.log("Palavra escondida:", palavra_escondida.join(","),"palavra:", palavra_aleatoria);
        //console.log("condicao; ", palavra_aleatoria === palavra_escondida.join(""))

        //diminuindo chances caso tenha errado
       hangman.DiminuirChances(esta, valor_chute);

       //Se errou o chute, a letra errada é armazenada para ser exibida
       if(!(utils.contains(valor_chute, hangman.getErros())) && esta === false){
            hangman.addErro(valor_chute);
       }

       //Vitoria/derrota/status
        if(venceu === true){
            menssagem.style.color= "white";
            menssagem.innerHTML = `Parabéns Acertou a palavra ${palavra_aleatoria}!!!`;

        } else if(hangman.getChances() > 0 &&  venceu === false) {
            menssagem.style.color= "darkred";
            menssagem.innerHTML = 
            `Erros: ${erros.join(" - ")}
           <br> 
            Chances: ${hangman.getChances()}
           <br> 
            Palavra: ${palavra_escondida.join(" ")} `

        } else if(hangman.getChances() <= 0){
            menssagem.style.color= "black";
            menssagem.innerHTML = `Perdeu, a palavra era ${palavra_aleatoria}`;
       
        }


        //Deixando o botão invisivel
        if (venceu === true || hangman.getChances() <=0 ){
            btn_reset.style.display = "inline";
          }  
       
        //Removendo o valor digitado:
        chute.value="";

        // RESETAR O JOGO
        btn_reset.addEventListener("click", () => {
            indice = utils.randomIndice(0, frutas.length - 1);
            palavra_aleatoria = frutas[indice].toUpperCase(); 
            hangman = new HangMan(palavra_aleatoria);
            erros = hangman.getErros();
            palavra_escondida = hangman.hide();
            btn_reset.style.display = "none";
            venceu = palavra_escondida.join("") === palavra_aleatoria;
            hangman.resetChances(palavra_aleatoria.length) //atibuindo mais chances
            menssagem.innerHTML = "";         
        })
    });
});
