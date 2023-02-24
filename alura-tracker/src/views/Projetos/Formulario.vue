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
import { useStore } from "@/store";
import { ADICIONAR_PROJETO, ALTERAR_PROJETO } from "@/store/tipo-multacoes";

export default defineComponent({
  name: "formulario-projetos",
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      nomeDoProjeto: "",
    };
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find((proj) => proj.id == this.id);
      this.nomeDoProjeto = projeto?.nome || "";
      console.log(projeto);
    }
  },
  methods: {
    salvar() {
      if (this.id) {
        this.store.commit(ALTERAR_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto,
        });
      } else {
        // estrutura para chamar uma mutations
        this.store.commit(ADICIONAR_PROJETO, this.nomeDoProjeto);
      }
      this.nomeDoProjeto = "";
      this.$router.push("/projetos");
    },
  },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
});
</script>
