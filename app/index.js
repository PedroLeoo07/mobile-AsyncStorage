import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Keyboard, Alert, Platform } from 'react-native';
import TaskItem from '../components/TaskItem';
import { getTasks, saveTasks, clearTasks } from '../utils/storage';

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await getTasks();
      setTasks(stored);
      setLoading(false);
    })();
  }, []);

  const addTask = useCallback(() => {
    const title = input.trim();
    if (!title) return;
    const newTask = { id: Date.now().toString(), title };
    const next = [newTask, ...tasks];
    setTasks(next);
    saveTasks(next);
    setInput('');
    Keyboard.dismiss();
  }, [input, tasks]);

  const deleteTask = useCallback((id) => {
    const next = tasks.filter(t => t.id !== id);
    setTasks(next);
    saveTasks(next);
  }, [tasks]);

  const clearAll = useCallback(() => {
    if (tasks.length === 0) return;

    // Web: usar window.confirm para evitar erro de MIME ou ausência de Alert nativo completo
    if (Platform.OS === 'web') {
      const ok = typeof window !== 'undefined' && window.confirm('Tem certeza que deseja remover TODAS as tarefas?');
      if (!ok) return;
      (async () => {
        try {
          await clearTasks();
        } finally {
          setTasks([]);
        }
      })();
      return;
    }

    // Mobile: Alert nativo
    Alert.alert('Limpar tudo', 'Tem certeza que deseja remover todas as tarefas?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'OK',
        style: 'destructive',
        onPress: async () => {
          try {
            await clearTasks();
          } finally {
            setTasks([]);
          }
        }
      }
    ]);
  }, [tasks]);

  const renderItem = ({ item }) => (
    <TaskItem item={item} onDelete={deleteTask} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Nova tarefa"
          value={input}
          onChangeText={setInput}
          style={styles.input}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTask} disabled={!input.trim()}> 
          <Text style={styles.addText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionsBar}>
        <Text style={styles.count}>{tasks.length} tarefa(s)</Text>
        <TouchableOpacity onPress={clearAll} disabled={tasks.length === 0} style={[styles.clearBtn, tasks.length === 0 && { opacity: 0.4 }]}> 
          <Text style={styles.clearText}>Limpar Tudo</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text style={styles.empty}>Carregando...</Text>
      ) : tasks.length === 0 ? (
        <Text style={styles.empty}>Nenhuma tarefa ainda. Adicione a primeira!</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
            renderItem={renderItem}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a8f0faff',
    paddingHorizontal: 20,
    paddingTop: 60
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 16,
    color: '#000000ff'
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10
  },
  input: {
    flex: 1,
    backgroundColor: '#838383ff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#fff0f0ff'
  },
  addBtn: {
    backgroundColor: '#1ba000ff',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  addText: {
    color: '#fff',
    fontWeight: '600'
  },
  actionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
    marginBottom: 12
  },
  count: { fontSize: 14, color: '#555' },
  clearBtn: {
    backgroundColor: '#6b7280',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8
  },
  clearText: { color: '#fff', fontWeight: '600' },
  empty: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 16,
    color: '#666'
  }
});
