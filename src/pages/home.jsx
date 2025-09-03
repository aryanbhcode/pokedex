import { useState, useEffect } from "react";
import "../styles/App.css";
import { Link } from "react-router-dom";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const [favorite, setFavorite] = useState(() => {
    const data = localStorage.getItem("synced_favorites");
    return data ? JSON.parse(data) : [];
  });

  const typeColors = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-blue-200",
    fighting: "bg-red-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-green-700",
    rock: "bg-gray-600",
    ghost: "bg-indigo-700",
    dragon: "bg-purple-700",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
    fairy: "bg-pink-300",
  };

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true);
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=200");
        const data = await res.json();

        const detailedPokemon = await Promise.all(
          data.results.map(async (p) => {
            const pokeRes = await fetch(p.url);
            const pokeData = await pokeRes.json();
            return {
              id: pokeData.id,
              name: pokeData.name,
              image: pokeData.sprites.other["official-artwork"].front_default,
              types: pokeData.types.map((t) => t.type.name),
              height: pokeData.height,
              weight: pokeData.weight,
              stats: pokeData.stats.map((s) => ({
                name: s.stat.name,
                value: s.base_stat,
              })),
              abilities: pokeData.abilities.map((a) => a.ability.name),
            };
          })
        );

        setPokemonList(detailedPokemon);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selected]);

  useEffect(() => {
    console.log("Saving favorites:", favorite);

    localStorage.setItem("synced_favorites", JSON.stringify(favorite));
  }, [favorite]);

  const filteredPokemon = pokemonList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const displayedPokemon = filteredPokemon.filter((p) => {
    if (selected === "none") return true;
    if (selected === "favorites") return favorite.includes(p.id);
    return p.types.includes(selected);
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const paginatedPokemon = displayedPokemon.slice(indexOfFirst, indexOfLast);

  const toggleFavorite = (id) => {
    if (favorite.includes(id)) {
      setFavorite(favorite.filter((favId) => favId !== id));
    } else {
      setFavorite([...favorite, id]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Navbar */}
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

      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-purple-700 via-indigo-900 to-blue-800 text-white flex flex-col items-center p-6">
        <img
          className="flex flex-col items-center mb-8 w-20 h-20 mb-6"
          src="pokepng.png"
          alt="Pokeball"
        />
        <h2 className="text-4xl font-extrabold mb-4">
          Welcome to the Pokédex!
        </h2>
        <p className="text-lg">Explore and discover all Pokémon</p>
      </section>

      {/* Search Section */}
      <section className="container mx-auto py-8 px-6">
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md p-3 rounded-lg border border-gray-700 bg-gray-800 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            className="flex justify center p-3 rounded-lg border border-gray-700 bg-gray-800 shadow-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2 px-4 py-2"
            onChange={(e) => setSelected(e.target.value)}
            value={selected}
          >
            <option value="none">Filter</option>
            <option value="favorites">Favorites</option>
            <option value="normal">Normal</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="electric">Electric</option>
            <option value="grass">Grass</option>
            <option value="ice">Ice</option>
            <option value="fighting">Fighting</option>
            <option value="poison">Poison</option>
            <option value="ground">Ground</option>
            <option value="flying">Flying</option>
            <option value="psychic">Psychic</option>
            <option value="bug">Bug</option>
            <option value="rock">Rock</option>
            <option value="ghost">Ghost</option>
            <option value="dragon">Dragon</option>
            <option value="dark">Dark</option>
            <option value="steel">Steel</option>
            <option value="fairy">Fairy</option>
          </select>

          {selected !== "none" && (
            <button
              className="ml-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-red-500 font-semibold rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-300 cursor-pointer"
              onClick={() => {
                setSelected("none");
                setSearch("");
              }}
            >
              Reset
            </button>
          )}
        </div>
      </section>

      {/* Pokémon Grid Section */}
      <main className="container mx-auto py-10 px-6 flex-1">
        <h3 className="text-2xl font-bold mb-6 text-purple-400">
          Pokémon List
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-gray-400">
              Loading...
            </div>
          ) : displayedPokemon.length === 0 ? (
            <div className="col-span-full text-center text-gray-400">
              No Pokémon found
            </div>
          ) : (
            paginatedPokemon.map((p) => (
              <div
                key={p.id}
                className="bg-gray-800 rounded-lg shadow-md p-4 hover:scale-105 transition-transform relative cursor-pointer"
                onClick={() => setSelectedPokemon(p)}
              >
                <div className="flex flex-col items-center mt-6">
                  <img src={p.image} alt={p.name} className="w-36 h-36 mb-3" />
                  <h4 className="text-2xl font-semibold capitalize">
                    {p.name}
                  </h4>
                  <p className="text-sm text-gray-300">#{p.id}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(p.id);
                    }}
                    className={`absolute top-2 right-2 text-2xl cursor-pointer ${
                      favorite.includes(p.id)
                        ? "text-yellow-400"
                        : "text-gray-400"
                    } hover:text-yellow-300 transition-colors`}
                    title={favorite.includes(p.id) ? "Unfavorite" : "Favorite"}
                  >
                    ★
                  </button>

                  {/* Types */}
                  <div className="flex gap-2 mt-2 mb-2">
                    {p.types.map((t) => (
                      <span
                        key={t}
                        className={`${
                          typeColors[t] || "bg-gray-400"
                        } text-black text-sm px-2 py-1 rounded`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Height & Weight */}
                  <p className="text-xs text-gray-400">
                    Height: {p.height / 10} m | Weight: {p.weight / 10} kg
                  </p>

                  {/* Stats */}
                  <div className="w-full mt-2">
                    {p.stats.map((s) => (
                      <div
                        key={s.name}
                        className="flex justify-between text-xs"
                      >
                        <span>{s.name}</span>
                        <span>{s.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Abilities */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.abilities.map((a) => (
                      <span
                        key={a}
                        className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {selectedPokemon && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setSelectedPokemon(null)}
          >
            <div
              className="bg-gray-800 p-6 rounded-xl max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute top-2 right-2 text-red-500 text-xl cursor-pointer"
                onClick={() => setSelectedPokemon(null)}
              >
                ✖
              </button>

              {/* Pokémon Image */}
              <img
                src={selectedPokemon.image}
                alt={selectedPokemon.name}
                className="w-32 h-32 mx-auto"
              />

              {/* Pokémon Name */}
              <h2 className="text-2xl font-bold text-center capitalize mt-4">
                {selectedPokemon.name}
              </h2>

              {/* Basic Info */}
              <p className="text-center text-gray-300">
                Height: {selectedPokemon.height / 10} m | Weight:{" "}
                {selectedPokemon.weight / 10} kg
              </p>

              {/* Types */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Types:</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedPokemon.types.map((type, idx) => (
                    <span
                      key={idx}
                      className={`${
                        typeColors[type] || "bg-gray-400"
                      } text-black text-sm px-2 py-1 rounded`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Abilities */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Abilities:</h3>
                <ul className="list-disc list-inside text-gray-300">
                  {selectedPokemon.abilities.map((ability, idx) => (
                    <li key={idx} className="capitalize">
                      {ability}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Stats:</h3>
                <ul className="text-gray-300">
                  {selectedPokemon.stats.map((stat, idx) => (
                    <li key={idx} className="capitalize">
                      {stat.name}: {stat.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50 cursor-pointer"
          >
            ← Prev
          </button>

          <span className="text-gray-300">
            Page {currentPage} of{" "}
            {Math.ceil(displayedPokemon.length / itemsPerPage)}
          </span>

          <button
            disabled={
              currentPage === Math.ceil(displayedPokemon.length / itemsPerPage)
            }
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50 cursor-pointer"
          >
            Next →
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 text-center py-4 mt-auto">
        <p>© {new Date().getFullYear()} Pokédex. All rights reserved.</p>
      </footer>
    </div>
  );
}
