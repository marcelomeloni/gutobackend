// Teste do endpoint de webhook de voluntários
import http from 'http';

const payload = JSON.stringify({
  nome: 'Maria Oliveira Teste',
  nome_preferido: 'Mari',
  data_nascimento: '1985-03-22',
  email: 'maria.teste.webhook@email.com',
  telefone: '(19) 98888-7777',
  redes_sociais: '@mari_tiktok',
  estado: 'SP',
  cidade: 'Campinas',
  bairro: 'Taquaral',
  abrangencia: 'Onde houver necessidade',
  conexoes_cidades: ['Valinhos', 'Vinhedo'],
  adesivo_perfurado_veiculo: false,
  consent_privacidade: true,
  consent_sensiveis: true,
  consent_comunicacao: true,
  website: ''
});

// Test 1: Sem API Key → deve dar 401
console.log('=== TESTE 1: Sem API Key ===');
const test1 = http.request({
  hostname: 'localhost',
  port: 3333,
  path: '/api/webhooks/voluntarios',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}, (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Body: ${body}`);
    console.log('');

    // Test 2: Com API Key → deve criar o lead
    console.log('=== TESTE 2: Com API Key válida ===');
    const test2 = http.request({
      hostname: 'localhost',
      port: 3333,
      path: '/api/webhooks/voluntarios',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': 'wh_guto_voluntarios_2026_s3cur3K3y!'
      }
    }, (res2) => {
      let body2 = '';
      res2.on('data', d => body2 += d);
      res2.on('end', () => {
        console.log(`Status: ${res2.statusCode}`);
        console.log(`Body: ${JSON.stringify(JSON.parse(body2), null, 2)}`);
        console.log('');

        // Test 3: Campos faltando → deve dar 400
        console.log('=== TESTE 3: Campos faltando ===');
        const test3 = http.request({
          hostname: 'localhost',
          port: 3333,
          path: '/api/webhooks/voluntarios',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-webhook-secret': 'wh_guto_voluntarios_2026_s3cur3K3y!'
          }
        }, (res3) => {
          let body3 = '';
          res3.on('data', d => body3 += d);
          res3.on('end', () => {
            console.log(`Status: ${res3.statusCode}`);
            console.log(`Body: ${body3}`);
          });
        });
        test3.write(JSON.stringify({ nome: 'Teste' }));
        test3.end();
      });
    });
    test2.write(payload);
    test2.end();
  });
});
test1.write(payload);
test1.end();
