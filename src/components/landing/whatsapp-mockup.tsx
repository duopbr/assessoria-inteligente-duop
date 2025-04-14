
export function WhatsAppMockup() {
  return (
    <div className="relative mx-auto mt-12 max-w-xs">
      <div className="bg-[#075E54] text-white rounded-t-xl p-3">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <span className="text-duop-purple text-xl font-bold">D</span>
          </div>
          <div className="ml-3">
            <div className="font-medium">Duop Assistente</div>
            <div className="text-xs">Online</div>
          </div>
        </div>
      </div>

      <div className="bg-[#ECE5DD] p-3 h-96 overflow-y-auto flex flex-col gap-2 rounded-b-xl border border-gray-200 shadow-lg">
        <div className="bg-white p-2 rounded-lg self-start max-w-[85%] shadow-sm">
          <p className="text-sm">Olá! Notei uma oscilação atípica no ativo ABCD3 que está na carteira de 3 clientes. Deseja que prepare um relatório?</p>
          <span className="text-xs text-gray-500 block text-right">09:32</span>
        </div>
        
        <div className="bg-[#DCF8C6] p-2 rounded-lg self-end max-w-[85%] shadow-sm">
          <p className="text-sm">Sim, por favor! Preciso avisar os clientes.</p>
          <span className="text-xs text-gray-500 block text-right">09:33</span>
        </div>
        
        <div className="bg-white p-2 rounded-lg self-start max-w-[85%] shadow-sm">
          <p className="text-sm">Pronto! Aqui está a análise do ABCD3:
          <br/><br/>
          • Queda de 5% após divulgação de resultados
          <br/>
          • Lucro abaixo do esperado (-3%)
          <br/>
          • Recomendação: manter posição, movimento técnico</p>
          <span className="text-xs text-gray-500 block text-right">09:35</span>
        </div>
        
        <div className="bg-[#DCF8C6] p-2 rounded-lg self-end max-w-[85%] shadow-sm">
          <p className="text-sm">Perfeito! Vou encaminhar para os clientes agora.</p>
          <span className="text-xs text-gray-500 block text-right">09:36</span>
        </div>
      </div>
    </div>
  );
}
