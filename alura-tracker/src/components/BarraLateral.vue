<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="" />
    </h1>
    <button class="button" @click="alterarTema">
      {{ textoBotao }}
    </button>
    <Menu />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Menu from "./Menu.vue";

export default defineComponent({
  name: "BarraLateral",
  emits: ["aoTemaAlterado"],
  components: { Menu },
  data() {
    return {
      modoEscuroAtivo: false,
    };
  },
  computed: {
    textoBotao() {
      if (this.modoEscuroAtivo) {
        return "Desativar modo escuro";
      }
      return "Ativar modo escuro";
    },
  },
  methods: {
    alterarTema() {
      this.modoEscuroAtivo = !this.modoEscuroAtivo;
      this.$emit("aoTemaAlterado", this.modoEscuroAtivo);
    },
  },
});
</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>
