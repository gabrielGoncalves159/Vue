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
import { defineComponent } from "vue";
import { useStore } from "../../store";
import { TipoNotificao } from "../../Interfaces/INotificacao";
import useNotificador from "../../hooks/notificador";
import { CADASTRAR_PROJETO, EDITAR_PROJETO } from "../../store/tipo-acoes";

// import { notificacaoMixin } from "../../mixins/notificar"; importação para utilizar o mixin

export default defineComponent({
  name: "formulario-projetos",
  props: {
    id: {
      type: String,
    },
  },
  // mixins: [notificacaoMixin], criando o objeto mixin
  data() {
    return {
      nomeDoProjeto: "",
    };
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projeto.projetos.find((proj) => proj.id == this.id);
      this.nomeDoProjeto = projeto?.nome || "";
      console.log(projeto);
    }
  },
  methods: {
    salvar() {
      if (this.id) {
        this.store.dispatch(EDITAR_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto,
        })
        .then(() => {this.lidarComSucesso("O Projeto foi alterado")})
      } else {
        // estrutura para chamar uma action
        this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
          .then(() => {this.lidarComSucesso("O Projeto foi adicionado")})
          .catch(() => {
            this.notificar("Erro", "Erro ao adicionado um projeto", TipoNotificao.FALHA);
          })
      }
    },
    lidarComSucesso(texto: string) {
      this.nomeDoProjeto = "";
      this.notificar("Sucesso", texto, TipoNotificao.SUCESSO);
      this.$router.push("/projetos");
    }
  },
  setup() {
    const store = useStore();
    // importando a notificação utilizando o metodo hook
    const { notificar } = useNotificador();
    return {
      store,
      notificar,
    };
  },
});
</script>
