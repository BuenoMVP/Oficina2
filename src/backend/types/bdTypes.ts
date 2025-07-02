interface usuariosProps {
    nome: string;
    email: string;
    senha: string;
}

interface senhasProps {
    email: string;
    senhaResetToken: string;
    senhaResetExpires: Date;
}

interface integrantesProps {
    nome: string;
    dataNascimento: string;
    telefone: string;
    cpf: string;
    rg: string;
    escola: string;
    nomeResponsavel: string;
    telefoneResponsavel: string;
    emailResponsavel: string;
    cpfResponsavel: string;
    endereco: string;
}

export type { usuariosProps, integrantesProps, senhasProps };