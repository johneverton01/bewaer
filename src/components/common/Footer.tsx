export function Footer() {
  return (
    <footer className="bg-gray-100 py-4 mt-6">
      <div className="container mx-auto text-center">
        <p className="text-xs text-gray-700 font-semibold">© {new Date().getFullYear()} Copyright BEWEAR</p>
        <p className="text-xs text-gray-400">Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}