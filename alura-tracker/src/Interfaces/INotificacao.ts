export enum TipoNotificao {
    SUCESSO,
    FALHA,
    ATENCAO
}

export interface INotificacao {
    titulo : string,
    texto: string,
    tipo: TipoNotificao,
    id: number
}