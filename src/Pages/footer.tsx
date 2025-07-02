import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-black border-t border-gray-500 mt-8">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1: Newsletter */}
        <div>
          <h3 className="uppercase font-semibold text-sm mb-4">
            Get 10% Off Your Next Order
          </h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border-b border-black text-sm py-2 focus:outline-none bg-transparent"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border-b border-black text-sm py-2 focus:outline-none bg-transparent"
            />
            <button
              type="submit"
              className="w-full bg-black text-white text-sm font-semibold py-3 uppercase"
            >
              Subscribe to our newsletter
            </button>
            <p className="text-[11px] mt-2 text-black">
              *By signing up, you agree to receive emails about Rocspace and our{" "}
              <span className="underline">other terms</span>.
            </p>
          </form>
        </div>

        {/* Column 2: Shop Here */}
        <div>
          <h3 className="uppercase font-semibold text-sm mb-4">Shop Here</h3>
          <ul className="space-y-2 text-sm">
            <li>All Items</li>
            <li>Men</li>
            <li>Female</li>
            <li>Accessories</li>
            <li>Collections</li>
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div>
          <h3 className="uppercase font-semibold text-sm mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Our Walk-In Store</li>
            <li>FAQs</li>
            <li>Policies</li>
            <li>Your Account</li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div>
          <h3 className="uppercase font-semibold text-sm mb-4">Contact</h3>
          <p className="text-sm mb-2 leading-relaxed">
           LAGOS NIGERIA     </p>
          <p className="text-sm mb-2">Operating Hours:</p>
          <p className="text-sm mb-1">Mon – Sat: 10am – 10pm</p>
          <p className="text-sm mb-2">Sun: 12pm – 10pm</p>
          <p className="text-sm mb-4">+234 0000000000</p>
          <div className="flex gap-4 text-lg">
            <a
              href="https://instagram.com/rocspace"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/2349131058119"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black text-center py-4 text-xs">
        &copy; {new Date().getFullYear()} Rocspace Clothing. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
