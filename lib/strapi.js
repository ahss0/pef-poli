// lib/strapi.js
// Camada de acesso à API do Strapi.
// Como o formato da resposta muda entre Strapi v4 (data.attributes.*)
// e v5 (campos direto em data.*), normalizeProfessor() trata os dois casos
// automaticamente, então esse código funciona nas duas versões sem alteração.


function formataData(data) {

  var data_limpa = data.substring(0, 10);
  var array_data = data_limpa.split("-");
  var formatada = array_data[2] + "/" + array_data[1] + "/" + array_data[0];

  return formatada;
}



const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Resolve a URL de uma mídia do Strapi (campo de imagem/arquivo),
 * cobrindo o formato v4 (media.data.attributes.url) e v5 (media.url).
 */

export function getStrapiMedia(media) {

  if (!media) return null;

  let mediaTarget = media;

  if (Array.isArray(media)) {
    if (media.length === 0) return null;
    mediaTarget = media[0];
  }

  else if (Array.isArray(media?.data)) {
    if (media.data.length === 0) return null;
    mediaTarget = media.data[0];
  }

  const url = mediaTarget?.url ?? mediaTarget?.attributes?.url ?? mediaTarget?.data?.attributes?.url ?? null;

  if (!url) return null;

  return url.startsWith("/") ? `${STRAPI_URL}${url}` : url;
}

/**
 * Igual a getStrapiMedia, mas retorna a lista inteira de arquivos de um
 * campo de mídia múltipla, com url, nome, mime e extensão — usado na página
 * de notícia para renderizar pdfs, imagens e outros arquivos de forma
 * diferente conforme o tipo. Cobre v4 (media.data[].attributes) e v5
 * (media[] direto).
 */
export function getStrapiMediaList(media) {

  if (!media) return [];

  let items;
  if (Array.isArray(media)) {
    items = media;
  } else if (Array.isArray(media?.data)) {
    items = media.data;
  } else if (media?.data) {
    items = [media.data];
  } else {
    items = [media];
  }

  return items
    .map((item) => {
      const attrs = item?.attributes ?? item;
      const url = attrs?.url ?? null;
      if (!url) return null;

      return {
        url: url.startsWith("/") ? `${STRAPI_URL}${url}` : url,
        nome: attrs?.name ?? "",
        mime: attrs?.mime ?? "",
        ext: attrs?.ext ?? "",
      };
    })
    .filter(Boolean);
}

//########################################### NORMALIZAR ####################################################
//######################################################################################################

export function normalizeProfessor(item) {
  // No Strapi v5 os campos já vêm direto na raiz (item), na v4 vêm em item.attributes
  const attrs = item.attributes ?? item;

  return {
    id: item.id,
    nome: attrs.nome ?? "",
    telefone: attrs.telefone ?? "",
    lattes: attrs.lattes ?? null,
    site: attrs.site ?? null,
    email: attrs.email ?? null,
    linkedin: attrs.linkedin ?? null,
    foto: getStrapiMedia(attrs.foto), // Passa o array de foto para ser tratado
  };
}

export function normalizeNoticia(item) {

  const attrs = item.attributes ?? item;

  return {

    id: item.documentId ?? item.id,
    titulo: attrs.titulo ?? "",
    corpo_texto: attrs.corpo_texto ?? "",
    data_postagem: formataData(attrs.createdAt) ?? null,
    // Lista de arquivos (pdfs, imagens, docs etc.) exibidos na área de
    // arquivos da página de notícia, cada um com url/nome/mime/ext.
    arquivos: getStrapiMediaList(attrs.arquivos),
    // Campo novo (ainda precisa ser criado no Content-Type "noticias" no Strapi).
    // Usado pelo HeroSlider como imagem de fundo do slide.
    imagem: getStrapiMedia(attrs.imagem),
    links: (attrs.link ?? []).map((link) => {
      const linkAttrs = link.attributes ?? link;
      return {
        label: linkAttrs.label || linkAttrs.url,
        url: linkAttrs.url,
      };
    }),
  };
}

export function normalizeSimples(item) {

  // No Strapi v5 os campos já vêm direto na raiz (item), na v4 vêm em item.attributes
  const attrs = item.attributes ?? item;

  return {
    titulo: attrs.titulo,
    conteudo: attrs.conteudo
  };
}

//########################################### FETCH ####################################################
//######################################################################################################

/**
 * Busca a lista de professores no Strapi.
 * populate=foto garante que a imagem venha junto na mesma resposta.
 */

export async function fetchProfessores() {

  const res = await fetch(
    `${STRAPI_URL}/api/professors?populate=foto&sort=nome:asc`
  );

  if (!res.ok) {
    throw new Error(`Erro ao buscar professores (status ${res.status})`);
  }
  const json = await res.json();
  const lista = json.data ?? [];
  return lista.map(normalizeProfessor);
}

export async function fetchExtensao() {

  const res = await fetch(
    `${STRAPI_URL}/api/extensao`
  );

  if (!res.ok) {
    throw new Error(`Erro ao buscar conteudo (status ${res.status})`);
  }
  const json = await res.json();
  return normalizeSimples(json.data);
}

export async function fetchPesquisa() {

  const res = await fetch(
    `${STRAPI_URL}/api/pesquisa`
  );

  if (!res.ok) {
    throw new Error(`Erro ao buscar conteudo (status ${res.status})`);
  }
  const json = await res.json();
  return normalizeSimples(json.data);
}


export async function fetchIC() {

  const res = await fetch(
    `${STRAPI_URL}/api/ic`
  );

  if (!res.ok) {
    throw new Error(`Erro ao buscar conteudo (status ${res.status})`);
  }
  const json = await res.json();
  return normalizeSimples(json.data);
}

export async function fetchLab() {

  const res = await fetch(
    `${STRAPI_URL}/api/laboratorio`
  );

  if (!res.ok) {
    throw new Error(`Erro ao buscar conteudo (status ${res.status})`);
  }
  const json = await res.json();
  return normalizeSimples(json.data);
}

export async function fetchPosdoc() {

  const res = await fetch(
    `${STRAPI_URL}/api/posdoc`
  );

  if (!res.ok) {
    throw new Error(`Erro ao buscar conteudo (status ${res.status})`);
  }
  const json = await res.json();
  return normalizeSimples(json.data);
}

export async function fetchTeses() {

  const res = await fetch(
    `${STRAPI_URL}/api/tese`
  );

  if (!res.ok) {
    throw new Error(`Erro ao buscar conteudo (status ${res.status})`);
  }
  const json = await res.json();
  return normalizeSimples(json.data);
}

/**
 * Busca uma única notícia pelo id, usada na página de detalhe
 * (app/noticias/[id]/page.js). Retorna null se não existir (404),
 * o que a página usa para acionar notFound().
 */
export async function fetchNoticiaById(id) {

  const res = await fetch(
    `${STRAPI_URL}/api/noticias/${id}?populate[0]=imagem&populate[1]=arquivos&populate[2]=link`
  );

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Erro ao buscar notícia (status ${res.status})`);
  }

  const json = await res.json();
  if (!json.data) return null;

  return normalizeNoticia(json.data);
}

/**
 * Busca as notícias marcadas como "destaque" (alta importância) para
 * exibição no HeroSlider da home. populate=imagem garante que a imagem
 * venha junto na mesma resposta; o filtro só retorna as notícias em destaque.
 */
export async function fetchNoticias() {

  const res = await fetch(
    `${STRAPI_URL}/api/noticias?populate=imagem&filters[destaque][$eq]=true`
  );

  if (!res.ok) {
    throw new Error(`Erro ao buscar notícias (status ${res.status})`);
  }
  const json = await res.json();
  const lista = json.data ?? [];
  return lista.map(normalizeNoticia);
}
