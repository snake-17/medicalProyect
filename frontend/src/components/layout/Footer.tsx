function Footer() {
  return (
    <footer className="bg-dark text-secondary py-4 mt-auto p-3">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          {/* Lado Izquierdo: Copyright */}
          <div className="mb-3 mb-md-0">
            <span className="text-light fw-bold">App Citas</span>
            <span className="ms-2">© 2026. Todos los derechos reservados.</span>
          </div>

          {/* Lado Derecho: Enlaces rápidos */}
          <ul className="nav">
            <li className="nav-item">
              <a href="#" className="nav-link link-secondary px-2">
                Soporte
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link link-secondary px-2">
                Privacidad
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link link-secondary px-2 text-primary">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
