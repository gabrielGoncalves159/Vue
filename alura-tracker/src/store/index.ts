import { INotificacao } from "@/Interfaces/INotificacao";
import IProjetos from "@/Interfaces/IProjetos";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONAR_PROJETO, ALTERAR_PROJETO, DEFINIR_PROJETOS, EXCLUIR_PROJETO, NOTIFICAR } from "../store/tipo-multacoes"
import { CADASTRAR_PROJETO, OBTER_PROJETOS, REMOVER_PROJETO, EDITAR_PROJETO } from "./tipo-acoes";
import http from "@/http"

interface Estado {
    projetos : IProjetos []
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: []
    },
    mutations: {
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
        }
    },
    actions: {
        //criando a actions que ira trazer o dados da API
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

        }

    }
})

export function useStore() : Store<Estado> {
    return vuexUseStore(key)
}