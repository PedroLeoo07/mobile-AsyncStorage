# ToDo App (Expo Router + AsyncStorage)

Aplicativo simples de Lista de Tarefas criado com React Native (Expo) e Expo Router.
> Foco: persistência local, organização mínima e UI customizável.

## Badges
![Expo](https://img.shields.io/badge/Expo-~-%23000020) ![React Native](https://img.shields.io/badge/React%20Native-Mobile-blue) ![Status](https://img.shields.io/badge/Status-Ativo-brightgreen)

## Funcionalidades
- Adicionar / listar / excluir tarefas
- Limpar todas as tarefas
- Persistência local com AsyncStorage
- Interface estilizada (suporte a gradiente opcional)
- Contador dinâmico
- Feedback de estados (carregando / vazio)

## Tecnologias
- Expo / Expo Router
- React Native
- AsyncStorage (via util personalizado)
- (Opcional) expo-linear-gradient para efeitos visuais

## Pré-requisitos
- Node LTS
- npm ou yarn
- Expo (CLI local via npx é suficiente)

## Instalação
```bash
git clone <url-do-repo>
cd mobile-AsyncStorage
npm install
```

Executar:
```bash
npm start          # menu interativo
npm run android    # emulador / device
npm run ios        # macOS somente
npm run web        # versão web
```

Se quiser gradiente:
```bash
npx expo install expo-linear-gradient
# Reverter comentários no index.js (import e JSX <LinearGradient>)
```

## Estrutura Principal
```text
app/_layout.js       -> Stack root (Expo Router)
app/index.js         -> Tela inicial / lógica principal
components/TaskItem  -> Item de tarefa (render FlatList)
utils/storage.js     -> Persistência (get/save/clear)
assets/favicon.png   -> Favicon web
```

## Fluxo de Armazenamento
1. Montagem: getTasks() lê JSON do AsyncStorage.
2. Ações: adicionar / remover atualiza estado e persiste com saveTasks().
3. Limpeza: clearTasks() apaga chave armazenada.

## Personalização Rápida
| Objetivo | Onde |
|----------|------|
| Cor de fundo | styles.gradient em app/index.js |
| Botão adicionar | styles.addBtnGradient |
| Mensagem vazia | bloco empty em index.js |
| Favicon web | app.json -> web.favicon |

## Favicon
Arquivo configurado em app.json: `"web": { "favicon": "./assets/favicon.png" }`.
Trocar imagem mantendo o nome ou atualizar o caminho.

## Troubleshooting
| Problema | Causa | Solução |
|----------|-------|---------|
| LinearGradient is not defined | Pacote não instalado | `npx expo install expo-linear-gradient` ou manter fallback View |
| Lista não atualiza | Mutação incorreta | Garantir novo array `[...tasks]` (já aplicado) |
| Cache web mostrando ícone antigo | Cache do navegador | Forçar reload Ctrl+F5 |
| AsyncStorage vazio após reload | App limpo / clearTasks usado | Verificar se saveTasks não foi removido |

## Teste Manual
1. Adicionar 2 tarefas.
2. Fechar app / recarregar (dev tools). Elas devem persistir.
3. Remover uma; contador deve decrementar.
4. Limpar tudo; lista fica vazia.

## Roadmap
- [ ] Marcar tarefa como concluída
- [ ] Filtro (todas / ativas / concluídas)
- [ ] Animações de entrada (Reanimated / LayoutAnimation)
- [ ] Tema claro/escuro
- [ ] Testes (Jest + @testing-library/react-native)

## Licença
MIT - use e modifique livremente.

## Contribuição
Fork + branch + PR pequeno e objetivo.

Bom código.
