const palavras = [
    "bravo", "velho", "caixa", "duplo", "fugir", "gelar", "monte", "digno", "tecla", 
  "surdo", "risco", "tigre", "blusa", "falar", "rocha", "pique", "lento", "turma", 
  "vapor", "bicho", "trevo", "zelar", "banjo", "morro", "ninja", "veloz", "farol", 
  "larva", "trono", "balde", "feroz", "gueto", "festa", "vadio", "salto", "vigor", 
  "balsa", "burro", "pavor", "torta", "verde", "prego", "corte", "firma", "pular", 
  "saber", "baixa", "graxa", "ceder", "porta", "grato", "tenso", "salva", "claro", 
  "rival", "cinto", "largo", "fosco", "valer", "cisne", "fazer", "ruivo", "trena", 
  "molar", "berro", "pulso", "rosto", "vazio", "frota", "musgo", "lenda", "custo", 
  "nevar", "medir", "mural", "furar", "troca", "astro", "poeta", "navio", "bazar", 
  "tenaz", "vulto", "folha", "fisco", "sonho", "touro", "trama", "misto", "nobre", 
  "ferro", "trovo", "vagar", "haste", "areia", "fugaz", "botao", "cobra", "prata", 
  "feixe", "corpo", "linha", "lugar", "roubo", "troco", "torne", "reino", "praia", 
  "raios", "manso", "cesta", "olhar", "focar", "sinal", "rodar", "pinho", "fruta", 
  "livro", "duque", "noite", "fardo", "ruido", "sarau", "livre", "final", "quota", 
  "cravo", "marca", "salve", "servo", "drama", "preco", "golpe", "maior", "morfo", 
  "pouco", "pesco", "criar", "jovem", "batom", "casca", "plano", "frear", "praga", 
  "justo", "couro", "torso", "carro", "danar", "letra", "tempo", "rumor", "bruma", 
  "saiba", "canil", "brasa", "molho", "tutor", "jogar", "naval", "truco", "coral", 
  "suave", "esqui", "trigo", "folia", "lutar", "molde", "fosso", "papel", "anual", 
  "botas", "grave", "mover", "saldo", "cifra", "manto", "danos", "horda", "surto", 
  "valsa", "casco", "plena", "trave", "mapas", "primo", "aroma", "bater", "modas", 
  "brisa", "nevoa", "traje", "parar", "longo", "carpa", "manja", "reves", "ganho", 
  "ruina", "impar", "valor", "temor", "prado", "aviso", "dente", "curva", "padre", 
  "canto", "prumo", "ruiva", "ninho", "torre", "modos", "faixa", "banco", "lapis", 
  "moral", "motim", "corvo", "pinto", "pavio", "bolsa", "grana", "forca", "grota", 
  "viver"
]
let saidaAlert = document.getElementById('saidaAlert')
const palavraCerta = palavras[Math.floor(Math.random() * palavras.length)];

console.log(palavraCerta);

function moveToNext(current, nextFieldID) {
    if (current.value.length >= current.maxLength) {
        document.getElementById(nextFieldID).focus();
    }
}

let tentativa = 1;

function tentativas() {
    if (tentativa > 6) {
        disableAllInput();
        saidaAlert.innerHTML = `Você perdeu!<br> A palavra era: ${palavraCerta}`
        showAlert()
        return;
    }

    let acertou = verificarResposta(tentativa);

    if (acertou) {
        saidaAlert.innerHTML = 'Parabéns!<br>Você acertou!'
        showAlert()
        disableAllInput();
    } else {
        // Desbloquear a próxima linha para escrita
        if (tentativa < 6) {
            toggleInputState(tentativa + 1, true); // Ativa a próxima linha
        }
    }

    tentativa++;
}

function verificarResposta(numero) {
    // Ativa apenas a linha atual
    const inputs = Array.from({ length: 5 }, (_, i) => document.getElementById(`letter${numero}${i + 1}`));
    const tentativaLetras = inputs.map(input => input.value.toLowerCase());
    const palavraArray = palavraCerta.split('');
    const usadas = {};

    let acertou = true;

    // Primeiro, verifica e aplica a classe "certo"
    tentativaLetras.forEach((letra, index) => {
        const input = inputs[index];
        if (letra === palavraArray[index]) {
            input.classList.add('certo');
            usadas[letra] = (usadas[letra] || 0) + 1;
        } else {
            acertou = false;
        }
    });

    // Verifica e aplica a classe "quase"
    tentativaLetras.forEach((letra, index) => {
        const input = inputs[index];
        if (!input.classList.contains('certo')) {
            if (palavraArray.includes(letra)) {
                const quantidadeNaPalavraCerta = palavraArray.filter(l => l === letra).length;
                const quantidadeUsadas = usadas[letra] || 0;

                if (quantidadeUsadas < quantidadeNaPalavraCerta) {
                    input.classList.add('quase');
                    usadas[letra] = quantidadeUsadas + 1;
                } else {
                    input.classList.add('disabled');
                    input.disabled = true;
                }
            } else {
                input.classList.add('disabled');
                input.disabled = true;
            }
        }
    });

    return acertou;
}

function disableAllInput() {
    for (let i = 1; i <= 6; i++) {
        for (let j = 1; j <= 5; j++) {
            document.getElementById(`letter${i}${j}`).disabled = true;
        }
    }
    
}

function toggleInputState(tentativa, state) {
    // Desativa todas as linhas
    disableAllInput();

    // Ativa apenas a linha da tentativa especificada
    if (tentativa <= 6) {
        const inputs = Array.from({ length: 5 }, (_, i) => document.getElementById(`letter${tentativa}${i + 1}`));
        inputs.forEach(input => input.disabled = !state);
    }
}

// Inicializa desbloqueando a primeira linha
toggleInputState(1, true);

function Desistir(){
    tentativa = 10
    tentativas()
}

// Função para abrir o alerta
function showAlert() {
    document.getElementById('alert-background').style.display = 'flex';
  }

  // Função para fechar o alerta
  function closeAlert() {
    document.getElementById('alert-background').style.display = 'none';
  }

  // Exemplo de como abrir o alerta
  window.onload = function() {
    showAlert(); // Abre o alerta quando a página carrega
  }


