import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Table} from "./Table.js";


export default function App() {
  return (
    <View style={styles.container}>
        <div className="github-repositories">
            <Table />
        </div>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
