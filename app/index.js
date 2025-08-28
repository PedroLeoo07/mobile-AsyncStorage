import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Keyboard, Alert, Platform } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient'; // removido: evita erro enquanto o pacote não estiver instalado
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
    // Substitui <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={styles.gradient}>
    <View style={styles.gradient}>
      <View style={styles.overlay}>
        <Text style={styles.title}>
          Lista de Tarefas
          <Text style={styles.titleGlow}> ✨</Text>
        </Text>
        <Text style={styles.subtitle}>Organize seu dia com estilo</Text>

        <View style={styles.inputRow}>
          <TextInput
            placeholder="Digite e pressione Enter..."
            value={input}
            onChangeText={setInput}
            style={styles.input}
            onSubmitEditing={addTask}
            returnKeyType="done"
          />
          <TouchableOpacity style={[styles.addBtn, !input.trim() && styles.addBtnDisabled]} onPress={addTask} disabled={!input.trim()}>
            {/* Substituído LinearGradient por View para evitar erro enquanto o pacote não está instalado */}
            <View style={styles.addBtnGradient}>
              <Text style={styles.addText}>Adicionar</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.actionsBar}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{tasks.length}</Text>
          </View>
          <TouchableOpacity onPress={clearAll} disabled={tasks.length === 0} style={[styles.clearBtn, tasks.length === 0 && { opacity: 0.35 }]}>
            <Text style={styles.clearText}>Limpar Tudo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          {loading ? (
            <Text style={styles.empty}>⏳ Carregando...</Text>
          ) : tasks.length === 0 ? (
            <Text style={styles.empty}>🪄 Sem tarefas. Comece adicionando uma!</Text>
          ) : (
            <FlatList
              data={tasks}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              contentContainerStyle={{ paddingTop: 4, paddingBottom: 28 }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </View>
    // </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: '#203a43' // cor base; reinstale expo-linear-gradient para voltar ao degradê
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(255,255,255,0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8
  },
  titleGlow: {
    color: '#ffce54'
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 18,
    color: '#d1d5db',
    fontSize: 14,
    fontWeight: '500'
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    color: '#fff'
  },
  addBtn: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  addBtnDisabled: {
    opacity: 0.5
  },
  addBtnGradient: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff4d5a' // fallback; reinstale expo-linear-gradient para degradê
  },
  addText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 0.5
  },
  actionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 22
  },
  badge: {
    backgroundColor: '#22d3ee',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#22d3ee',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    elevation: 4
  },
  badgeText: {
    color: '#00323a',
    fontWeight: '700',
    fontSize: 14
  },
  clearBtn: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8
  },
  clearText: {
    color: '#fff',
    fontWeight: '600',
    letterSpacing: 0.5
  },
  card: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backdropFilter: 'blur(8px)',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6
  },
  empty: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    color: '#cbd5e1'
  }
});
