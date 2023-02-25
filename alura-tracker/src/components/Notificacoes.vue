<template>
  <div class="notificacoes">
    <article
      class="message"
      :class="contexto[notificacao.tipo]"
      v-for="notificacao in notificacoes"
      :key="notificacao.id"
    >
      <div class="message-header">{{ notificacao.titulo }}</div>
      <div class="message-body">{{ notificacao.texto }}</div>
    </article>
  </div>
</template>

<script lang="ts">
import { TipoNotificao } from "../Interfaces/INotificacao";
import { computed, defineComponent } from "vue";
import { useStore } from "../store";

export default defineComponent({
  name: "alerta-notificacao",
  data(){
    return {
        contexto: {
            [TipoNotificao.SUCESSO]: 'is-success',
            [TipoNotificao.ATENCAO]: 'is-warning',
            [TipoNotificao.FALHA]: 'is-danger'
        }
    }
  },
  setup() {
    const store = useStore();
    return {
      notificacoes: computed(() => store.state.notificacoes),
    };
  },
});
</script>

<style scoped>
.notificacoes {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
  z-index: 105;
}
</style>
