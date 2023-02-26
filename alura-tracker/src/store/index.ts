import { INotificacao } from "@/Interfaces/INotificacao";
import IProjetos from "@/Interfaces/IProjetos";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONAR_PROJETO, ADICIONAR_TAREFA, ALTERAR_PROJETO, ALTERAR_TAREFA, DEFINIR_PROJETOS, DEFINIR_TAREFAS, EXCLUIR_PROJETO, NOTIFICAR } from "../store/tipo-multacoes"
import { CADASTRAR_PROJETO, OBTER_PROJETOS, REMOVER_PROJETO, EDITAR_PROJETO, OBTER_TAREFAS, CADASTRAR_TAREFA, EDITAR_TAREFA } from "./tipo-acoes";
import http from "@/http"
import ITarefa from "@/Interfaces/ITarefa";

interface Estado {
    tarefas: ITarefa[],
    projetos : IProjetos[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        tarefas: [],
        projetos: [],
        notificacoes: []
    },
    mutations: {
        //Altera estado local
        [ADICIONAR_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id : new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjetos
            state.projetos.push(projeto)
        },
        [ALTERAR_PROJETO](state, projeto: IProjetos) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        // obtendo os prjetos criados pela API
        [DEFINIR_PROJETOS](state, projetos: IProjetos []) {
            state.projetos = projetos
        },
        [NOTIFICAR](state, novaNotificacao: INotificacao) {

                novaNotificacao.id = new Date().getTime()
                state.notificacoes.push(novaNotificacao)

                setTimeout(() => {
                    state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
                }, 3000)
        },
        [DEFINIR_TAREFAS](state, tarefa: ITarefa []){
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
        //criando a actions que ira fazer a requisição para a API
        [OBTER_PROJETOS]( {commit} ) {
            http.get('projetos')
                .then(resposta => commit(DEFINIR_PROJETOS, resposta.data))
        },
        [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
            return http.post('/projetos', {
                nome: nomeDoProjeto,
            })
        },
        [EDITAR_PROJETO](contexto, projeto: IProjetos) {
            return http.put(`/projetos/${projeto.id}`, projeto)
        },
        [REMOVER_PROJETO]({commit}, id: string) {
            return http.delete(`/projetos/${id}`)
                .then(() => commit(EXCLUIR_PROJETO, id))

        },
        [OBTER_TAREFAS]( {commit}) {
            return http.get('tarefas')
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

    }
})

export function useStore() : Store<Estado> {
    return vuexUseStore(key)
}