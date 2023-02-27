<template>
  <Box>
    <div class="columns clicavel" @click="tarefaClicada">
      <div class="column is-4">{{ tarefa?.descricao || 'Tarefa sem descrição' }}</div>
      <div class="column is-3">
        {{ tarefa?.projeto?.nome || 'N/D' }}
      </div>
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
  emits: ['aoTarefaClicada'],
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
  methods: {
  },
  setup(props, { emit }) {
    const tarefaClicada = () : void => {
      emit('aoTarefaClicada', props.tarefa)
    }

    return {
      tarefaClicada
    }
  },
});
</script>

<style scoped>
.clicavel {
  cursor: pointer;
}
</style>
