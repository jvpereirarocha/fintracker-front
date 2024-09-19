<template>
  <div class="filters">
    <div>
      <label for="yearFilter">Selecione o Ano:</label>
      <select id="yearFilter">
        <option value="2022">2022</option>
        <option value="2023" selected>2023</option>
        <option value="2024">2024</option>
      </select>
    </div>
    <div>
      <label for="typeFilter">Filtrar por:</label>
      <select id="typeFilter">
        <option value="both" selected>Despesas e Receitas</option>
        <option value="despesas">Somente Despesas</option>
        <option value="receitas">Somente Receitas</option>
      </select>
    </div>
  </div>
</template>