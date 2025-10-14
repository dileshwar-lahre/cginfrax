import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-6">

        {/* Pages */}
        <div>
          <h3 className="font-semibold mb-3">Pages</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/login" className="hover:underline">Login</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/home-sell" className="hover:underline">Home Sell</a></li>
            <li><a href="/room-rent" className="hover:underline">Room Rent</a></li>
            <li><a href="/land-sell" className="hover:underline">Land Sell</a></li>
            <li><a href="/construction" className="hover:underline">Construction</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li><FaEnvelope className="inline-block mr-2" /> dileshwarlahre806@gmail.com</li>
            <li><FaWhatsapp className="inline-block mr-2" /> 9131460470</li>
          </ul>
        </div>

        {/* Social + App */}
        <div>
          <h3 className="font-semibold mb-3">Connect</h3>
          <div className="flex space-x-4 mb-4 text-xl text-gray-700">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://wa.me/919131460470" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
          </div>
          <a
            href="/pwa-download"
            className="inline-block text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Download PWA App
          </a>
        </div>
      </div>

      <div className="text-center text-xs mt-6 text-gray-500">
        © {new Date().getFullYear()} Dileshwar Lahre. All rights reserved.
      </div>
    </footer>
  );
}