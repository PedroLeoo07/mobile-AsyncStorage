import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = 'TASKS_V1';

export async function getTasks() {
  try {
    const raw = await AsyncStorage.getItem(TASKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Erro ao ler tarefas', e);
    return [];
  }
}

export async function saveTasks(tasks) {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.warn('Erro ao salvar tarefas', e);
  }
}

export async function clearTasks() {
  try {
    await AsyncStorage.removeItem(TASKS_KEY);
  } catch (e) {
    console.warn('Erro ao limpar tarefas', e);
  }
}
