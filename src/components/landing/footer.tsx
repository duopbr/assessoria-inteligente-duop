
export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-duop-blue text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center">
          <div className="font-bold text-3xl mb-4 text-white">Duop</div>
          
          <div className="mb-6 text-center">
            <p>A plataforma que potencializa o trabalho do assessor financeiro</p>
          </div>
          
          <div className="mt-8 text-sm text-white/70">
            &copy; {currentYear} Duop. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
