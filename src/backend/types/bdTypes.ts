interface usuariosProps {
    nome: string;
    email: string;
    senha: string;
}

interface integrantesProps {
    nome: string;
    dataNascimento: string;
    escola: string;
    email: string;
    telefone: string;
}

export type { usuariosProps, integrantesProps };