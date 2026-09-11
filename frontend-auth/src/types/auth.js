/**
 * Tipos de domínio de autenticação (JSDoc).
 * Os tipos de formulário são inferidos dos schemas Zod em utils/validators.js.
 */

/**
 * @typedef {Object} AuthUser
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 */

/**
 * Resposta esperada do backend (Spring Boot + JWT).
 * @typedef {Object} AuthResponse
 * @property {string} token       JWT de acesso
 * @property {string} [refreshToken]
 * @property {AuthUser} user
 */

/**
 * Payload de cadastro enviado ao backend (camelCase, CPF só dígitos).
 * @typedef {Object} RegisterDTO
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} cpf
 * @property {string} password
 */

export {}
