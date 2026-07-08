const CONFIG = {
    // No ambiente de produção (Netlify), buscamos da variável de ambiente.
    // Para testes locais, você pode colar temporariamente sua chave aqui.
    API_KEY: window.env?.OPENROUTER_API_KEY || "SUA_CHAVE_OPENROUTER_AQUI",
    BASE_URL: "https://openrouter.ai/api/v1/chat/completions"
};