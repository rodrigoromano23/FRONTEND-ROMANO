

//diseño responsive================================================

import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function FooterPublic() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        
        <p className="text-sm opacity-80">
          © {new Date().getFullYear()} Conviviendo - Todos los derechos reservados.
        </p>

        {/* ICONOS */}
        <div className="flex gap-4">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
            aria-label="Facebook"
          >
            <FaFacebookF size={18} />
          </a>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}