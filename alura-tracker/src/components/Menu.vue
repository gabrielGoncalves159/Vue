<template>
  <nav class="panel mt-5">
    <ul>
      <li>
        <router-link to="/" class="link">
          <i class="fas fa-tasks"></i>
          Tarefas
        </router-link>
      </li>
      <li>
        <router-link to="/projetos" class="link">
          <i class="fas fa-project-diagram"></i>
          Projetos
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "menu-opcoes",
});
</script>

<style>
.panel li {
  margin: 8px 0;
}
.link {
  color: #fff;
}
.link:hover {
  color: #faf0ca;
}
.link.router-link-active {
  color: #faf0ca;
}
</style>
