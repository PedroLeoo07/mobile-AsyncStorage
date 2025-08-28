import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TaskItem({ item, onDelete }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{item.title}</Text>
      <TouchableOpacity accessibilityLabel={`Excluir tarefa ${item.title}`} onPress={() => onDelete(item.id)} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#333'
  },
  deleteBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#ff5252',
    borderRadius: 6
  },
  deleteText: {
    color: '#fff',
    fontWeight: '600'
  }
});
