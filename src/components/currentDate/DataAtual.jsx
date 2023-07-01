import React from 'react'
import styles from "./style.module.css"

function DataAtual() {
  const diasSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
  const mesesAno = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

  const data = new Date();
  const diaSemana = diasSemana[data.getDay()];
  const dia = data.getDate();
  const mes = mesesAno[data.getMonth()];
  const ano = data.getFullYear();

  return (
    <div>      
      <h3 className={styles.time_board}>{diaSemana}, {dia} de {mes} de {ano}</h3>
    </div>
  );
}

export default DataAtual
