<template>
  <section class="projetos">
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
        <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto" />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "../../store";
import { TipoNotificao } from "../../Interfaces/INotificacao";
import useNotificador from "../../hooks/notificador";
import { CADASTRAR_PROJETO, EDITAR_PROJETO } from "../../store/tipo-acoes";
import { useRouter } from "vue-router";

// import { notificacaoMixin } from "../../mixins/notificar"; importação para utilizar o mixin

export default defineComponent({
  name: "formulario-projetos",
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    // refaturando para conposition API
    const router = useRouter();
    const store = useStore();
   
    // importando a notificação utilizando o metodo hook
    const { notificar } = useNotificador();
    const nomeDoProjeto = ref("");
    
    if (props.id) {
      const projeto = store.state.projeto.projetos.find((proj) => proj.id == props.id);
      nomeDoProjeto.value = projeto?.nome || "";
      console.log(projeto);
    }

    const lidarComSucesso = (texto: string) => {
      nomeDoProjeto.value = "";
      notificar("Sucesso", texto, TipoNotificao.SUCESSO);
      router.push("/projetos");
    }

    const salvar = () => {
      if (props.id) {
        store
          .dispatch(EDITAR_PROJETO, {
            id: props.id,
            nome: nomeDoProjeto.value,
          })
          .then(() => {
            lidarComSucesso("O Projeto foi alterado");
          });
      } else {
        // estrutura para chamar uma action
        store
          .dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
          .then(() => {
            lidarComSucesso("O Projeto foi adicionado");
          })
          .catch(() => {
            notificar("Erro", "Erro ao adicionado um projeto", TipoNotificao.FALHA);
          });
      }
    }

    return {
      nomeDoProjeto,
      salvar,
    };
  },
});
</script>
