// src/App.js
import React from 'react';
//import SearchBarFilter from './OptionsPage.js';
import QRCodeForm from './QRCodeForm.js';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Catalogo de articulos para viñetas</h1>
      <QRCodeForm />
    </div>
  );
}

export default App;

