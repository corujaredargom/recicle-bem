const perguntas = [
  {
    id: 1,
    pergunta: "Qual é a principal causa da mudança climática?",
    opcoes: ["Desmatamento", "Gases de efeito estufa", "Poluição", "Reciclagem"],
    respostaCorreta: "Gases de efeito estufa",
    backgroundImage: "background-imagem.id1.jpeg"
  },
  {
    id: 2,
    pergunta: "O que é reciclável?",
    opcoes: ["Plástico", "Vidro", "Papel", "Todos os anteriores"],
    respostaCorreta: "Todos os anteriores",
    backgroundImage: "background-imagem.id2.jpeg"
  },
  {
    id: 3,
    pergunta: "O que é biodiversidade?",
    opcoes: ["Variedade de espécies", "Poluição", "Desmatamento", "Energia renovável"],
    respostaCorreta: "Variedade de espécies",
    backgroundImage: "background-image-3.jpg"
  },
  {
    id: 4,
    pergunta: "O que é uma maneira de reduzir o consumo de plástico?",
    opcoes: ["Usar sacolas reutilizáveis", "Comprar mais plástico", "Descartar plástico no lixo", "Ignorar a reciclagem"],
    respostaCorreta: "Usar sacolas reutilizáveis",
    backgroundImage: "background-image-4.jpg"
  },
  {
    id: 5,
    pergunta: "Qual é um efeito da poluição do ar?",
    opcoes: ["Aumento da biodiversidade", "Doenças respiratórias", "Conservação de água", "Crescimento econômico"],
    respostaCorreta: "Doenças respiratórias",
    backgroundImage: "background-image-5.jpg"
  },
  {
    id: 6,
    pergunta: "Qual é o principal responsável pela poluição do mar?",
    opcoes: ["Plástico", "Óleo", "Gases", "Metais"],
    respostaCorreta: "Plástico",
    backgroundImage: "background-image-5.jpg"
  },
  {
    id: 7,
    pergunta: "O que é uma fonte de energia renovável?",
    opcoes: ["Carvão", "Petróleo", "Solar", "Nuclear"],
    respostaCorreta: "Solar",
    backgroundImage: "background-image-5.jpg"
  },
  {
    id: 8,
    pergunta: "Qual é um efeito da falta de água?",
    opcoes: ["Seca", "Inundações", "Poluição", "Desmatamento"],
    respostaCorreta: "Seca",
    backgroundImage: "background-image-5.jpg"
  },
  {
    id: 9,
    pergunta: "O que é uma maneira de reduzir o consumo de água?",
    opcoes: ["Tomar banhos longos", "Fechar torneiras", "Usar água tratada", "Ignorar a falta de água"],
    respostaCorreta: "Fechar torneiras",
    backgroundImage: "background-image-5.jpg"
  },
  {
    id: 10,
    pergunta: "Qual é um efeito da mudança climática?",
    opcoes: ["Aumento da temperatura", "Diminuição da temperatura", "Aumento da biodiversidade", "Diminuição da poluição"],
    respostaCorreta: "Aumento da temperatura",
    backgroundImage: "background-image-5.jpg"
  },
];

let perguntaAtual = 0;
let pontuacao = 0;
let acertos = 0;
let erros = 0; // Contador de erros
let jogoFinalizado = false; // Variável para controlar o estado do jogo

// Sons para respostas
const somCorreto = new Audio("Acertou.mp3");
const somIncorreto = new Audio("Errou.mp3");

// Criar múltiplas folhas animadas
for (let i = 0; i < 10; i++) {
  createLeaf();
}
function createLeaf() {
  const leaf = document.querySelector('.leaf-animation').cloneNode(true);
  leaf.style.left = Math.random() * window.innerWidth + 'px';
  leaf.style.animationDuration = (Math.random() * 5 + 5) + 's'; // Entre 5 e 10 segundos
  leaf.style.animationDelay = (Math.random() * 5) + 's';
  document.body.appendChild(leaf);
}



function exibirPergunta() {
  const pergunta = perguntas[perguntaAtual];
  document.getElementById("pergunta").textContent = pergunta.pergunta;
  document.body.style.backgroundImage = `url(${pergunta.backgroundImage})`; // Atualiza a imagem de fundo

  const opcoesContainer = document.getElementById("opcoes");
  opcoesContainer.innerHTML = "";

  const resultadoElement = document.getElementById("resultado");
  resultadoElement.textContent = "";

  pergunta.opcoes.forEach((opcao) => {
    const botao = document.createElement("button");
    botao.textContent = opcao;
    botao.addEventListener("click", () => verificarResposta(opcao)); // Passa apenas a opção para
    opcoesContainer.appendChild
    opcoesContainer.appendChild(botao);
  });
}
function verificarResposta(opcao) {
  const pergunta = perguntas[perguntaAtual];
  const resultadoElement = document.getElementById("resultado");

  if (opcao === pergunta.respostaCorreta) {
    resultadoElement.textContent = "Resposta correta!";
    resultadoElement.style.color = "green";
    somCorreto.play();
    pontuacao += 10;
    acertos++;
  } else {
    resultadoElement.textContent = `Resposta incorreta. A resposta correta é ${pergunta.respostaCorreta}.`;
    resultadoElement.style.color = "red";
    somIncorreto.play();
    erros++;
  }

  document.getElementById("pontuacao").textContent = `Pontuação: ${pontuacao} - Acertos: ${acertos} - Erros: ${erros}`;

  perguntaAtual++;

  if (perguntaAtual >= perguntas.length) {
    resultadoElement.textContent = "Fim do jogo!";
    resultadoElement.style.color = "black";
    jogoFinalizado = true; // Define que o jogo foi finalizado
    document.getElementById("opcoes").innerHTML = ""; // Limpa as opções
    exibirResumoFinal(); // Chama a função para exibir o resumo final
  } else {
    if (!jogoFinalizado) { // Verifica se o jogo não foi finalizado
      setTimeout(exibirPergunta, 2000);
    }
  }
}

function pularPergunta() {
  perguntaAtual++;
  if (perguntaAtual >= perguntas.length) {
    jogoFinalizado = true; // Define que o jogo foi finalizado
    exibirResumoFinal(); // Chama a função para exibir o resumo final
  } else {
    exibirPergunta(); // Exibe a próxima pergunta
  }
}

function exibirResumoFinal() {
  const resultadoElement = document.getElementById("resultado");
  resultadoElement.textContent = `Fim do jogo! Sua pontuação final é ${pontuacao}. Acertos: ${acertos}, Erros: ${erros}.`;
  resultadoElement.style.color = "black";
  pergunta.innerHTML = "";
  document.getElementById("opcoes").innerHTML = ""; // Limpa as opções
}

// Inicia o jogo exibindo a primeira pergunta
exibirPergunta();