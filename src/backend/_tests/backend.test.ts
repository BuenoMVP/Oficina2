import request from 'supertest';
import mongoose from 'mongoose';
import { server } from '../config/server';
import { connectDB } from '../config/connectDB';

// Test data
const testUsuario = {
    nome: 'Test User',
    email: 'test@example.com',
    senha: 'test123'
};

const testIntegrante = {
    nome: 'Test Member',
    email: 'member@example.com',
    telefone: '1234567890',
    dataNascimento: 'DD/MM/AAAA',
    escola: 'Municipal'
};

let usuarioId: string;
let integranteId: string;

beforeAll(async () => {
    await connectDB();
    await mongoose.connection.collection('usuarios').deleteMany({});
    await mongoose.connection.collection('integrantes').deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.collection('usuarios').deleteMany({});
    await mongoose.connection.collection('integrantes').deleteMany({});
    await mongoose.connection.close();
});

describe('Conexão com o BD', () => {
    it('Deve conectar ao BD', () => {
        expect(mongoose.connection.readyState).toBe(1);
    });
});

describe('Rotas', () => {
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
        const response = await request(server)
            .post('/api/usuarios')
            .send(testUsuario);
        
        expect(response.status).toBe(201);
        expect(response.body.objUsuario).toHaveProperty('_id');
        expect(response.body.msg).toBe('Usuário criado!');
        usuarioId = response.body.objUsuario._id;
    });

    it('Deve retornar todos os usuários', async () => {
        const response = await request(server).get('/api/usuarios');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    it('Deve atualizar um usuário', async () => {
        const updatedData = { ...testUsuario, nome: 'Novo nome' };
        const response = await request(server)
            .put(`/api/usuarios/${usuarioId}`)
            .send(updatedData);
        
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Usuário atualizado!');
    });

    it('Deve deletar um usuário', async () => {
        const response = await request(server)
            .delete(`/api/usuarios/${usuarioId}`);
        
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Usuário deletado!');
    });
});

describe('Rotas de Integrantes', () => {
    it('Deve criar um novo integrante', async () => {
        const response = await request(server)
            .post('/api/integrantes')
            .send(testIntegrante);
        
        expect(response.status).toBe(201);
        expect(response.body.objIntegrante).toHaveProperty('_id');
        expect(response.body.msg).toBe('Integrante criado!');
        integranteId = response.body.objIntegrante._id;
    });

    it('Deve retornar todos os integrantes', async () => {
        const response = await request(server).get('/api/integrantes');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    it('Deve atualizar um integrante', async () => {
        const updatedData = { ...testIntegrante, nome: 'Novo membro' };
        const response = await request(server)
            .put(`/api/integrantes/${integranteId}`)
            .send(updatedData);
        
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Integrante atualizado!');
    });

    it('Deve deletar um integrante', async () => {
        const response = await request(server)
            .delete(`/api/integrantes/${integranteId}`);
        
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Integrante deletado!');
    });
});

describe('Tratamento de erros', () => {
    it('Deve tratar erro ao criar um usuário', async () => {
        const invalidUsuario = { nome: 'Invalid' };
        const response = await request(server)
            .post('/api/usuarios')
            .send(invalidUsuario);
        
        expect(response.status).toBe(400);
    });

    it('Deve tratar erro ao criar um integrante', async () => {
        const invalidIntegrante = { nome: 'Invalid' };
        const response = await request(server)
            .post('/api/integrantes')
            .send(invalidIntegrante);
        
        expect(response.status).toBe(400);
    });
}); 