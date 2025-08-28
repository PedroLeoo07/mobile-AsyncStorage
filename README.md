# ToDo App (Expo Router + AsyncStorage)

Aplicativo simples de Lista de Tarefas criado com React Native (Expo) e Expo Router.

## Funcionalidades
- Adicionar tarefa
- Listar tarefas (FlatList)
- Excluir tarefa individual
- Limpar todas as tarefas (desafio extra)
- Persistência local com AsyncStorage

## Estrutura Principal
```
app/_layout.js       -> Stack root (Expo Router)
app/index.js         -> Tela inicial
components/TaskItem  -> Item de tarefa
utils/storage.js     -> Funções de persistência
```

## Executar
Instale as dependências (certifique-se de ter o Expo CLI):

```
npm install
npm start
```

Use o aplicativo Expo Go no dispositivo ou emulador.

## Observações
Projeto em JavaScript conforme solicitado. Sinta-se livre para ajustar estilos.
