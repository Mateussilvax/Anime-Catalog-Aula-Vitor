# Catálogo de Animes Mobile

**Curso:** Sistemas de Informação

Aplicativo mobile desenvolvido em **React Native** com **Expo Router**, integrado à **API do MyAnimeList (v2)**, que permite explorar rankings, acompanhar lançamentos atuais e futuros, pesquisar títulos com sinopse e metadados e jogar um quiz de adivinhação com pontuação salva localmente no dispositivo.

Aplicativo mobile desenvolvido em **React Native** com **Expo Router**, integrado à **API do MyAnimeList (v2)**, que permite explorar rankings, acompanhar lançamentos atuais e futuros, pesquisar títulos com sinopse e metadados e jogar um quiz de adivinhação com pontuação salva localmente no dispositivo.

---

## Funcionalidades e Interfaces

- **Menu Lateral (Drawer) e Tela Inicial (`Início`):** Ponto central de navegação entre a página principal, a tela de contato e as abas do catálogo.
- **Contato (`Contato`):** Apresentação do projeto e informações de contato do desenvolvedor.
- **Top Animes de Todos os Tempos (`Top Animes`):** Lista os animes mais bem avaliados da história com capa, título, nota média, estúdio e data de estreia, exibidos com animação em cascata.
- **Lançamentos da Temporada Atual (`Lançamentos`):** Exibe os animes em exibição na temporada vigente no mesmo padrão visual de cartões.
- **Próxima Temporada (`Em Breve`):** Mostra os títulos anunciados para a próxima temporada com previsão de estreia e estúdio responsável.
- **Catálogo e Busca (`Buscar`):** Carrega inicialmente animes populares ordenados de A a Z e permite pesquisa em tempo real na API (a partir de 3 caracteres), exibindo capa, nota, estúdio, data de estreia e sinopse.
- **Quiz — Adivinhe o Anime (`Game`):** Sorteia um anime principal entre os mais populares (filtrando temporadas secundárias e continuações) com a capa borrada (`blurRadius`). Valida palpites em japonês (romaji), inglês, sinônimos e nomes principais sem subtítulo, ignorando acentos e caracteres especiais. Registra o histórico de tentativas da rodada e utiliza `AsyncStorage` para salvar o total de vitórias permanentemente no dispositivo.

---

## Tecnologias Utilizadas

- **React Native** & **Expo**
- **Expo Router** (navegação com Drawer e Bottom Tabs)
- **MyAnimeList API v2** (consumo de dados via `fetch`)
- **AsyncStorage** (`@react-native-async-storage/async-storage` para persistência local)
- **Expo Vector Icons** (`@expo/vector-icons`)
- **Animated API** (nativa do React Native)

---

## Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone [https://github.com/Mateussilvax/Anime-Catalog-Aula-Vitor.git](https://github.com/Mateussilvax/Anime-Catalog-Aula-Vitor.git)

   cd Anime-Catalog-Aula-Vitor/my-app
   npm install

2. Insira a key da api na .env:
   renomeie a .env.example para .env
   e coloque a key da api

3. Inicie o servidor:   
   npx expo start




*Citação de Uso de Inteligência Artificial*
*Em conformidade com as diretrizes do trabalho, registra-se abaixo o uso de Inteligência Artificial no desenvolvimento deste projeto:*

*Ferramenta: Google Gemini*

*Finalidades:*

*Geração direta de código (Interface e Animações): Criação da estilização completa das telas (StyleSheet, padronização visual dos cartões, espaçamentos, cores e organização de layout) e geração das animações utilizando a API Animated do React Native (entrada em cascata das listas com useFocusEffect).*

*Esclarecimento de dúvidas e apoio técnico: Consulta de dúvidas pontuais durante o desenvolvimento da lógica do aplicativo, incluindo integração e cabeçalhos da API do MyAnimeList (v2), funcionamento e persistência de dados com AsyncStorage, normalização de strings e filtragem de animes principais no quiz.*