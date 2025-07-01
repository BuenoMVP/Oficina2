import request from 'supertest';
import { server } from '../config/server';

describe('Rotas básicas', () => {
    it('Deve retornar Funcionou', async () => {
        const response = await request(server).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Funcionou');
    });

    it('Deve retornar Página inicial da api', async () => {
        const response = await request(server).get('/api');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Página inicial da api');
    });
});

describe('Rotas de Usuarios', () => {
    it('Deve criar um novo usuário', async () => {
        const novoUsuario = {
            nome: 'Novo Usuario Teste',
            email: 'novo@test.com',
            senha: 'senha123'
        };
        const response = await request(server)
            .post('/api/usuarios')
            .send(novoUsuario);
        expect([201, 400]).toContain(response.status);
    });

    it('Deve negar acesso sem token ao listar usuários', async () => {
        const response = await request(server).get('/api/usuarios');
        expect(response.status).toBe(401);
    });

    it('Deve negar acesso sem token ao atualizar usuário', async () => {
        const response = await request(server)
            .put('/api/usuarios/507f1f77bcf86cd799439011')
            .send({ nome: 'Test' });
        expect(response.status).toBe(401);
    });

    it('Deve negar acesso sem token ao deletar usuário', async () => {
        const response = await request(server)
            .delete('/api/usuarios/507f1f77bcf86cd799439011');
        expect(response.status).toBe(401);
    });
});

describe('Rotas de Integrantes', () => {
    it('Deve negar acesso sem token ao criar integrante', async () => {
        const response = await request(server)
            .post('/api/integrantes')
            .send({ nome: 'Test Member' });
        expect(response.status).toBe(401);
    });

    it('Deve negar acesso sem token ao listar integrantes', async () => {
        const response = await request(server)
            .get('/api/integrantes');
        expect(response.status).toBe(401);
    });

    it('Deve negar acesso sem token ao atualizar integrante', async () => {
        const response = await request(server)
            .put('/api/integrantes/507f1f77bcf86cd799439011')
            .send({ nome: 'Updated Member' });
        expect(response.status).toBe(401);
    });

    it('Deve negar acesso sem token ao deletar integrante', async () => {
        const response = await request(server)
            .delete('/api/integrantes/507f1f77bcf86cd799439011');
        expect(response.status).toBe(401);
    });
});

describe('Rotas de Certificados', () => {
    it('Deve negar acesso sem token ao gerar certificado', async () => {
        const response = await request(server)
            .get('/api/certificados')
            .send({ nome: 'Test', projeto: 'Test Project', horas: 10 });
        expect(response.status).toBe(401);
    });
});

describe('Rota de Login', () => {
    it('Deve tratar login com credenciais inválidas', async () => {
        const response = await request(server)
            .post('/')
            .send({ email: 'inexistente@test.com', senha: 'senha_errada' });
        expect([404, 400]).toContain(response.status);
    });
});

describe('Tratamento de erros', () => {
    it('Deve tratar erro ao criar usuário com dados inválidos', async () => {
        const invalidUsuario = { nome: 'Invalid' };
        const response = await request(server)
            .post('/api/usuarios')
            .send(invalidUsuario);
        expect(response.status).toBe(400);
    });

    it('Deve negar acesso com token inválido', async () => {
        const response = await request(server)
            .get('/api/usuarios')
            .set('Authorization', 'Bearer token_invalido');
        expect(response.status).toBe(401);
    });
});