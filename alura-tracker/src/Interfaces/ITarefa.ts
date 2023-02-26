import IProjetos from "./IProjetos";

export default interface ITarefa {
    id: number,
    duracaoEmSegundo: number,
    descricao: string,
    projeto: IProjetos
}