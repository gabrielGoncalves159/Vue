<template>
  <section class="projetos">
    <router-link to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo projeto</span>
    </router-link>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
          <td>
            <router-link :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
            <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "../../store";
import { OBTER_PROJETOS, REMOVER_PROJETO } from "../../store/tipo-acoes";
import useNotificador from "../../hooks/notificador";
import { TipoNotificao } from "../../Interfaces/INotificacao";

export default defineComponent({
  name: "projetos-tracker",
  methods: {
    excluir(id: string) {
      this.store.dispatch(REMOVER_PROJETO, id)
      .then(() => {
        this.notificar("Sucesso", "O projeto foi excluido", TipoNotificao.SUCESSO);
      });
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    // chamando a actions para trazer os projetos
    store.dispatch(OBTER_PROJETOS);
    return {
      projetos: computed(() => store.state.projetos),
      store,
      notificar,
    };
  },
});
</script>
