<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempoEmSegundos="tempoEmSegundos" />
    <Botao :texto="'play'" :icone="'fas fa-play'" :desabilitado="cronometroRodar" @clicado="iniciarContagem"/>
    <Botao :texto="'stop'" :icone="'fas fa-stop'" :desabilitado="!cronometroRodar" @clicado="finalizarContagem"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";
import Botao from "./Botao.vue";

export default defineComponent({
  name: "temporizador-form",
  emits: ['aoTemporizadorFinalizado'],
  components: {
    Cronometro,
    Botao
  },
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodar: false,
    };
  },
  methods: {
    iniciarContagem() {
      this.cronometroRodar = true;
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1;
      }, 1000);
    },
    finalizarContagem() {
      this.cronometroRodar = false;
      clearInterval(this.cronometro);
      this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
      this.tempoEmSegundos = 0
    },
  },
});
</script>
