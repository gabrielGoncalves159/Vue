<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @ao-temporizador-finalizado="salvarTarefa" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Temporizador from "./Temporizador.vue";
import { useStore } from "../store";
import { NOTIFICAR } from "../store/tipo-multacoes";
import { TipoNotificao } from "../Interfaces/INotificacao";

export default defineComponent({
  name: "form-input",
  components: {
    Temporizador,
  },
  emits: ["aoSalvarTarefa"],
  setup(props, { emit }) {
    const store = useStore();

    const descricao = ref("");
    const idProjeto = ref("");

    const projetos = computed(() => store.state.projeto.projetos);

    const salvarTarefa = (tempoEmSegundos: number): void => {
      const projeto = projetos.value.find((p) => p.id == idProjeto.value); // primeiro, buscamos pelo projeto
      if (!projeto) {
        // se o projeto não existe...
        store.commit(NOTIFICAR, {
          titulo: "Ops!",
          texto: "Selecione um projeto antes de finalizar a tarefa!",
          tipo: TipoNotificao.FALHA,
        }); // notificamos o usuário
        return; // ao fazer return aqui, o restante do método salvarTarefa não será executado. chamamos essa técnica de early return :)
      }
      // se o projeto existe, seguimos normalmente...
      emit("aoSalvarTarefa", {
        duracaoEmSegundos: tempoEmSegundos,
        descricao: descricao.value,
        projeto: projeto,
      });
      descricao.value = "";
    }
    return {
      projetos,
      store,
      descricao,
      idProjeto,
      salvarTarefa,
    };
  },
});
</script>
<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>
