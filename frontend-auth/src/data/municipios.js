/**
 * DADOS MOCKADOS — substituir por chamada à API quando o backend estiver pronto.
 *
 * Integração futura sugerida:
 *   GET /api/municipios            -> lista (id, nome, uf)
 *   GET /api/municipios/:id        -> objeto completo abaixo
 *   GET /api/municipios/:id/series -> séries históricas (populacao, saneamento…)
 *
 * Enquanto isso, os componentes consomem este array. Basta trocar a origem
 * (ex.: um hook useMunicipios que faz fetch) mantendo o mesmo formato.
 */

/** @typedef {Object} Municipio
 * @property {string} id
 * @property {string} nome
 * @property {string} uf
 * @property {number} anoBase
 * @property {number} populacao
 * @property {number} areaKm2
 * @property {number} idh
 * @property {number} densidade        hab/km²
 * @property {number} areaUrbanaKm2
 * @property {number} crescimentoAnual  % ao ano
 * @property {number} saneamento        % com rede
 * @property {number} arborizacao       % de cobertura
 * @property {number} bairros
 * @property {number} indicadores
 * @property {number} fontes
 * @property {string} atualizadoEm      ISO date
 * @property {number[]} popSerie        população por ano (mock)
 * @property {number[]} saneamentoSerie % saneamento por ano (mock)
 */

/** @type {Municipio[]} */
export const MUNICIPIOS = [
  {
    id: 'tiangua',
    nome: 'Tianguá',
    uf: 'CE',
    anoBase: 2022,
    populacao: 78749,
    areaKm2: 906.7,
    idh: 0.651,
    densidade: 86.8,
    areaUrbanaKm2: 24.3,
    crescimentoAnual: 1.2,
    saneamento: 31.8,
    arborizacao: 68,
    bairros: 12,
    indicadores: 48,
    fontes: 8,
    atualizadoEm: '2026-09-11',
    popSerie: [68200, 70100, 72300, 74050, 75600, 77200, 78749],
    saneamentoSerie: [22, 25, 27, 28, 30, 31, 31.8],
  },
  {
    id: 'ubajara',
    nome: 'Ubajara',
    uf: 'CE',
    anoBase: 2022,
    populacao: 34210,
    areaKm2: 420.6,
    idh: 0.635,
    densidade: 81.3,
    areaUrbanaKm2: 9.8,
    crescimentoAnual: 0.9,
    saneamento: 28.4,
    arborizacao: 74,
    bairros: 8,
    indicadores: 42,
    fontes: 7,
    atualizadoEm: '2026-09-10',
    popSerie: [30100, 31000, 31900, 32600, 33200, 33800, 34210],
    saneamentoSerie: [19, 21, 23, 25, 26, 27, 28.4],
  },
  {
    id: 'sao-benedito',
    nome: 'São Benedito',
    uf: 'CE',
    anoBase: 2022,
    populacao: 47245,
    areaKm2: 336.2,
    idh: 0.628,
    densidade: 140.5,
    areaUrbanaKm2: 12.1,
    crescimentoAnual: 1.0,
    saneamento: 26.1,
    arborizacao: 63,
    bairros: 9,
    indicadores: 40,
    fontes: 7,
    atualizadoEm: '2026-09-09',
    popSerie: [41200, 42600, 43800, 44900, 45700, 46500, 47245],
    saneamentoSerie: [17, 19, 21, 22, 24, 25, 26.1],
  },
]
