<template>
  <Box>
    <div class="columns">
      <div class="column is-7">{{ tarefa?.descricao || 'Tarefa sem descrição' }}</div>
      <div class="column">
        <Cronometro :tempoEmSegundos="tarefa?.duracaoEmSegundo" />
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import ITarefa from "../Interfaces/ITarefa";
import { defineComponent, PropType } from "vue";
import Cronometro from "./Cronometro.vue";
import Box from "./Box.vue";

export default defineComponent({
  name: "lista-tarefa",
  components: {
    Cronometro,
    Box
  },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      requited: true,
    },
  },
});
</script>
