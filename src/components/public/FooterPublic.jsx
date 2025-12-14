

//diseño responsive================================================

export default function FooterPublic() {
  return (
    <footer className="bg-gray-800 text-white mt-12 py-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm opacity-80">
          © {new Date().getFullYear()} Conviviendo - Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
