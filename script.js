// Mapeia cores para os tipos de Pokémon
const typeColors = {
  fire: '#f08030',       // tipo fogo
  water: '#6890f0',      // tipo água
  grass: '#78c850',      // tipo planta
  electric: '#f8d030',   // tipo elétrico
  ice: '#98d8d8',        // tipo gelo
  fighting: '#c03028',   // tipo lutador
  poison: '#a040a0',     // tipo veneno
  ground: '#e0c068',     // tipo terra
  flying: '#a890f0',     // tipo voador
  psychic: '#f85888',    // tipo psíquico
  bug: '#a8b820',        // tipo inseto
  rock: '#b8a038',       // tipo pedra
  ghost: '#705898',      // tipo fantasma
  dragon: '#7038f8',     // tipo dragão
  dark: '#705848',       // tipo sombrio
  steel: '#b8b8d0',      // tipo aço
  fairy: '#ee99ac'       // tipo fada
};

// Função principal: busca o Pokémon da API
async function buscarPokemon() {
  const nomeOuId = document.getElementById("searchInput").value.toLowerCase();
  // Pega o valor do input, converte para minúsculas e guarda em 'nomeOuId'

  const url = `https://pokeapi.co/api/v2/pokemon/${nomeOuId}`;
  // Monta a URL da API com o nome ou número do Pokémon

  try {
    const resposta = await fetch(url);
    // Faz a requisição para a API de forma assíncrona

    if (!resposta.ok) throw new Error("Pokémon não encontrado");
    // Se a resposta não for OK (ex: 404), lança um erro

    const dados = await resposta.json();
    // Converte a resposta da API para um objeto JavaScript

    mostrarPokemon(dados);
    // Chama a função que exibe os dados do Pokémon
  } catch (erro) {
    document.getElementById("pokemonContainer").innerHTML = `<p>${erro.message}</p>`;
    // Se houver erro (ex: Pokémon não encontrado), exibe a mensagem de erro na tela
  }
}

// Exibe os dados do Pokémon na tela
function mostrarPokemon(pokemon) {
  const container = document.getElementById("pokemonContainer");
  // Seleciona o container onde os dados serão exibidos

  container.innerHTML = `
    <div class="card">
      <h2>${pokemon.name.toUpperCase()}</h2>
      <!-- Nome do Pokémon em letras maiúsculas -->

      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
      <!-- Imagem frontal padrão do Pokémon -->

      <p><strong>ID:</strong> ${pokemon.id}</p>
      <!-- ID do Pokémon -->

      <div class="types">
        ${pokemon.types
          .map((tipo) => 
            `<span class="type" style="background-color: ${typeColors[tipo.type.name] || '#ccc'}">
              ${tipo.type.name}
            </span>`
          )
          .join("")}
        <!-- Lista os tipos do Pokémon com cores específicas; se o tipo não estiver no mapa, usa cinza claro -->
      </div>
    </div>
  `;
}