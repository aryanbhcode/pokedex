import "../styles/App.css";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <header className="bg-purple-800 text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <img src="pokeball.png" alt="Pokeball" className="w-10 h-10" />
            <h1 className="text-2xl font-bold">Pokédex</h1>
          </div>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link to="/" className="hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
        {/* Hero Section */}
        <section className="text-center py-12 bg-gradient-to-r from-purple-700 via-indigo-900 to-blue-800 text-white p-6">
          <h2 className="text-4xl font-extrabold mb-4">About This Project</h2>
          <p className="text-lg max-w-2xl mx-auto">
            This Pokédex is built using React, TailwindCSS, and the{" "}
            <a
              href="https://pokeapi.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-300 underline"
            >
              PokéAPI
            </a>
            . It allows you to browse, search, and filter Pokémon with an
            interactive UI.
          </p>
        </section>

        {/* Content */}
        <main className="container mx-auto py-10 px-6 flex-1">
          <h3 className="text-2xl font-bold mb-6 text-purple-400">Features</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-300 ">
            <li>Browse 200 Pokémon with images, stats, and abilities</li>
            <li>Search and filter by type or favorites</li>
            <li>Save your favorite Pokémon with local storage sync</li>
            <li>Pagination for smooth navigation</li>
            <li>Pop-up modal with detailed Pokémon info</li>
          </ul>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 text-center py-4 mt-auto">
          <p>© {new Date().getFullYear()} Pokédex. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
