import { TipoNotificao } from "@/Interfaces/INotificacao"
import { store } from "@/store"
import { NOTIFICAR } from "@/store/tipo-multacoes"

export const notificacaoMixin = {
    methods: {
        notificar (titulo: string, texto: string, tipo: TipoNotificao): void{
            store.commit(NOTIFICAR, {
              titulo,
              texto,
              tipo
            })
          }
    },
}