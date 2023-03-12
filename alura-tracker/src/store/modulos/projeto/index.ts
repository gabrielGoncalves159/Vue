import http from "@/http";
import IProjetos from "@/Interfaces/IProjetos";
import { Estado } from "@/store";
import { OBTER_PROJETOS, CADASTRAR_PROJETO, EDITAR_PROJETO, REMOVER_PROJETO } from "@/store/tipo-acoes";
import { ADICIONAR_PROJETO, ALTERAR_PROJETO, DEFINIR_PROJETOS, EXCLUIR_PROJETO } from "@/store/tipo-multacoes";
import { Module } from "vuex";

export interface EstadoProjeto {
    projetos: IProjetos[]
}

export const projeto: Module<EstadoProjeto, Estado> = {
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
    },
    actions: {
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
    },
}