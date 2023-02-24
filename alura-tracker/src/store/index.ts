import IProjetos from "@/Interfaces/IProjetos";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONAR_PROJETO, ALTERAR_PROJETO, EXCLUIR_PROJETO } from "../store/tipo-multacoes"

interface Estado {
    projetos : IProjetos []
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: []
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
        }
    }
})

export function useStore() : Store<Estado> {
    return vuexUseStore(key)
}