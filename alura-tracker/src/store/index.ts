import { INotificacao } from "@/Interfaces/INotificacao";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { NOTIFICAR } from "../store/tipo-multacoes"
import { EstadoProjeto, projeto } from "./modulos/projeto";
import { EstadoTarefa, tarefa } from "./modulos/tarefa";

//estado global da aplicação
export interface Estado {
    notificacoes: INotificacao[]
    // estado filho de projetos
    projeto: EstadoProjeto,
    tarefa: EstadoTarefa
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        notificacoes: [],
        projeto: {
            projetos: []
        },
        tarefa: {
            tarefas: [],
        },
    },
    mutations: {
        //Altera estado local
        [NOTIFICAR](state, novaNotificacao: INotificacao) {

            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        },
    },
    actions: {
        //criando a actions que ira fazer a requisição para a API
    },
    modules: {
        projeto,
        tarefa
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}