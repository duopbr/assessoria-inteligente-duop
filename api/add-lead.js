
// Importa a biblioteca do Google APIs
import { google } from 'googleapis';

// Função principal que a Vercel executará (usando export default para ES Modules)
export default async function handler(req, res) {
  // 1. Verificar se o método é POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  // 2. Obter dados do corpo da requisição
  const { phoneNumber, name, source } = req.body;

  // Validação básica dos dados recebidos
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return res.status(400).json({ success: false, message: 'phoneNumber é obrigatório e deve ser uma string.' });
  }

  const timestamp = new Date().toISOString();
  const leadSource = typeof source === 'string' ? source : 'Desconhecida';
  const leadName = typeof name === 'string' ? name : '';

  // 3. Obter credenciais e IDs das Variáveis de Ambiente
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  // A substituição \n por \n é importante para chaves privadas multilinhas
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\n/g, '\n');
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID_LEADS;
  const sheetName = process.env.GOOGLE_SHEET_NAME_LEADS;

  if (!clientEmail || !privateKey || !spreadsheetId || !sheetName) {
    console.error('Variáveis de ambiente do Google Sheets não configuradas corretamente.');
    return res.status(500).json({ success: false, message: 'Erro interno do servidor: Configuração incompleta.' });
  }

  try {
    // 4. Autenticar com a API do Google Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'], // Escopo necessário
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // 5. Preparar a linha para adicionar (agora incluindo o nome)
    const newRow = [
      timestamp,
      phoneNumber,
      leadName,
      leadSource
    ];

    // 6. Adicionar a linha à planilha
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: `${sheetName}!A1`, // Adiciona após a última linha na aba especificada
      valueInputOption: 'USER_ENTERED', // Interpreta dados como entrada do usuário
      requestBody: {
        values: [newRow],
      },
    });

    console.log('Lead adicionado com sucesso:', response.data);
    return res.status(200).json({ success: true, message: 'Lead adicionado com sucesso!' });

  } catch (error) {
    console.error('Erro ao adicionar linha no Google Sheets:', error);
    // Tenta extrair uma mensagem de erro mais específica da resposta da API do Google
    const errorMessage = error?.response?.data?.error?.message || error.message || 'Erro desconhecido.';
    return res.status(500).json({ success: false, message: `Erro ao salvar na planilha: ${errorMessage}` });
  }
} 
