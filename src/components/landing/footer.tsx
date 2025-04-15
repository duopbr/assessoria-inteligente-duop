
export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-duop-blue text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-4">
            <img
              src="/lovable-uploads/b10b2b1a-83ce-47f4-8f30-3b76dcd797c3.png"
              alt="Duop Logo"
              className="h-12 mr-3"
            />
            <div className="font-bold text-3xl text-white">Duop</div>
          </div>
          
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
