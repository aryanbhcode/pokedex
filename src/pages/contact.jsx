import { useState } from "react";
import "../styles/App.css";
import { Link } from "react-router-dom";
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for reaching out, ${form.name}!`);
    setForm({ name: "", email: "", message: "" });
  };

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
        <section className="text-center py-12 bg-gradient-to-r from-blue-800 via-indigo-900 to-purple-700 text-white p-6">
          <h2 className="text-4xl font-extrabold mb-4">Contact Us</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Have feedback, questions, or suggestions? Send us a message!
          </p>
        </section>

        {/* Contact Form */}
        <main className="container mx-auto py-10 px-6 flex-1">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 p-6 rounded-lg shadow-md max-w-lg mx-auto"
          >
            <div className="mb-4">
              <label className="block mb-1 text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-300">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-semibold"
            >
              Send Message
            </button>
          </form>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 text-center py-4 mt-auto">
          <p>© {new Date().getFullYear()} Pokédex. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
