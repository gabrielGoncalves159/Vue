import http from "@/http"
import ITarefa from "@/Interfaces/ITarefa"
import { Estado } from "@/store"
import { OBTER_TAREFAS, CADASTRAR_TAREFA, EDITAR_TAREFA } from "@/store/tipo-acoes"
import { DEFINIR_TAREFAS, ADICIONAR_TAREFA, ALTERAR_TAREFA } from "@/store/tipo-multacoes"
import { Module } from "vuex"

export interface EstadoTarefa {
    tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    mutations: {
        [DEFINIR_TAREFAS](state, tarefa: ITarefa[]){
            state.tarefas = tarefa
        },
        [ADICIONAR_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
        [ALTERAR_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(x => x.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
    },
    actions: {
        [OBTER_TAREFAS]( {commit}, filtro: string) {
            let url = 'tarefas'
            if(filtro){
                url += '?descricao=' + filtro
            }

            return http.get(url)
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
        },
        [CADASTRAR_TAREFA]({commit}, tarefa: ITarefa) {
            return http.post('/tarefas', tarefa)
                .then(resposta => commit(ADICIONAR_TAREFA, resposta.data))
        },
        [EDITAR_TAREFA]({commit}, tarefa: ITarefa) {
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(() => commit(ALTERAR_TAREFA, tarefa))
        },
    },
}