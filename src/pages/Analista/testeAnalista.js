const yup = require('yup');
const schema = require('./app'); // Supondo que o esquema esteja no arquivo 'app.js'

// testes de cdenf

    describe('Schema Validation', () => {

        // Testes para cdenf
        describe('cdenf validation', () => {
        test('Correct cdenf with 7 digits passes', async () => {
            const data = {
            cdenf: '1234567',
            nome: 'john doe',
            telefone: '44999758685',
            email: 'john.doe@gmail.com',
            senha: 'Batatinha1!',
            confSenha: 'Batatinha1!',
            administrador: true,
            };
    
            await expect(schema.validate(data, { abortEarly: false })).resolves.toBeTruthy();
        });
    
        test('Incorrect cdenf with less than 7 digits fails', async () => {
            const data = {
            cdenf: '123456',
            nome: 'john doe',
            telefone: '44999758685',
            email: 'john.doe@gmail.com',
            senha: 'Batatinha1!',
            confSenha: 'Batatinha1!',
            administrador: true,
            };
    
            await expect(schema.validate(data, { abortEarly: false })).rejects.toEqual(
            expect.objectContaining({
                errors: expect.arrayContaining(['Cdenf inválido']),
            })
            );
        });
    
        test('Incorrect cdenf with more than 7 digits fails', async () => {
            const data = {
            cdenf: '12345678',
            nome: 'john doe',
            telefone: '44999758685',
            email: 'john.doe@gmail.com',
            senha: 'Batatinha1!',
            confSenha: 'Batatinha1!',
            administrador: true,
            };
    
            await expect(schema.validate(data, { abortEarly: false })).rejects.toEqual(
            expect.objectContaining({
                errors: expect.arrayContaining(['Cdenf inválido']),
            })
            );
        });
    
        test('Incorrect cdenf with null value fails', async () => {
            const data = {
            cdenf: null,
            nome: 'john doe',
            telefone: '44999758685',
            email: 'john.doe@gmail.com',
            senha: 'Batatinha1!',
            confSenha: 'Batatinha1!',
            administrador: true,
            };
    
            await expect(schema.validate(data, { abortEarly: false })).rejects.toEqual(
            expect.objectContaining({
                errors: expect.arrayContaining(['Campo obrigatório']),
            })
            );
        });
        });
    
        // Testes para senha
        describe('senha validation', () => {
        test('Valid password with all required characters passes', async () => {
            const data = {
            cdenf: '1234567',
            nome: 'john doe',
            telefone: '44999758685',
            email: 'john.doe@gmail.com',
            senha: 'Batatinha1!',
            confSenha: 'Batatinha1!',
            administrador: true,
            };
    
            await expect(schema.validate(data, { abortEarly: false })).resolves.toBeTruthy();
        });
    
        test('Password without uppercase character fails', async () => {
            const data = {
            cdenf: '1234567',
            nome: 'john doe',
            telefone: '44999758685',
            email: 'john.doe@gmail.com',
            senha: 'batatinha1!',
            confSenha: 'batatinha1!',
            administrador: true,
            };
    
            await expect(schema.validate(data, { abortEarly: false })).rejects.toEqual(
            expect.objectContaining({
                errors: expect.arrayContaining(['A senha deve ter pelo menos 1 letra maiúscula.']),
            })
            );
        });
    
        test('Password without lowercase character fails', async () => {
            const data = {
            cdenf: '1234567',
            nome: 'john doe',
            telefone: '44999758685',
            email: 'john.doe@gmail.com',
            senha: 'BATATINHA1!',
            confSenha: 'BATATINHA1!',
            administrador: true,
            };
    
            await expect(schema.validate(data, { abortEarly: false })).rejects.toEqual(
            expect.objectContaining({
                errors: expect.arrayContaining(['A senha deve ter pelo menos 1 letra minúscula.']),
            })
            );
        });
    
        test('Password without digit fails', async () => {
            const data = {
            cdenf: '1234567',
            nome: 'john doe',
            telefone: '44999758685',
            email: 'john.doe@gmail.com',
            senha: 'Batatinha!',
            confSenha: 'Batatinha!',
            administrador: true,
            };
    
            await expect(schema.validate(data, { abortEarly: false })).rejects.toEqual(
            expect.objectContaining({
                errors: expect.arrayContaining(['A senha deve ter pelo menos 1 número.']),
            })
            );
        });
    
        test('Password without special character fails', async () => {
            const data = {
            cdenf: '1234567',
            nome: 'john doe',
            telefone: '44999758685',
            email: 'john.doe@gmail.com',
            senha: 'Batatinha1',
            confSenha: 'Batatinha1',
            administrador: true,
            };
    
            await expect(schema.validate(data, { abortEarly: false })).rejects.toEqual(
            expect.objectContaining({
                errors: expect.arrayContaining(['A senha deve ter pelo menos 1 caractere especial.']),
            })
            );
        });
    
        test('Password shorter than 8 characters fails', async () => {
            const data = {
            cdenf: '1234567',
            nome: 'john doe',
            telefone: '44999758685',
            email: 'john.doe@gmail.com',
            senha: 'Batat1!',
            confSenha: 'Batat1!',
            administrador: true,
            };
    
            await expect(schema.validate(data, { abortEarly: false })).rejects.toEqual(
            expect.objectContaining({
                errors: expect.arrayContaining(['A senha deve ter pelo menos 8 caracteres']),
            })
            );
        });
    
        test('ConfSenha not matching Senha fails', async () => {
            const data = {
            cdenf: '1234567',
            nome: 'john doe',
            telefone: '44999758685',
            email: 'john.doe@gmail.com',
            senha: 'Batatinha1!',
            confSenha: 'Batatinha2!',
            administrador: true,
            };
    
            await expect(schema.validate(data, { abortEarly: false })).rejects.toEqual(
            expect.objectContaining({
                errors: expect.arrayContaining(['Senhas não conferem']),
            })
            );
        });
        });
    
    });