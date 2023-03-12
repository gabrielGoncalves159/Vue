import { TipoNotificao } from "@/Interfaces/INotificacao"
import { store } from "@/store"
import { NOTIFICAR } from "@/store/tipo-multacoes"

// reaproveitamento de códito qe podera ser utilizado em outras telas 
type Notificador = {
    notificar: (titulo: string, texto: string, tipo: TipoNotificao) => void
}

export default () : Notificador => {
    const notificar = (titulo: string, texto: string, tipo: TipoNotificao) : void => {
        store.commit(NOTIFICAR, {
            titulo,
            texto,
            tipo
        })
    }
    return {
        notificar
    }
}