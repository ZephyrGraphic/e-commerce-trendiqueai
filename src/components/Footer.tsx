import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Exclusive Section */}
          <div>
            <h4 className="font-fredoka text-lg font-semibold mb-4">
              Exclusive
            </h4>
            <p className="font-noto text-sm mb-4">Subscribe</p>
            <p className="font-noto text-sm text-white/70 mb-4">
              Get 10% off your first order
            </p>
            <div className="flex items-center bg-white/10 rounded-lg overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/50 outline-none"
              />
              <button className="p-2 hover:bg-white/10 transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Support Section */}
          <div>
            <h4 className="font-fredoka text-lg font-semibold mb-4">Support</h4>
            <address className="font-noto text-sm text-white/70 not-italic space-y-2">
              <p>111 Bijoy sarani, Dhaka,</p>
              <p>DH 1515, Bangladesh.</p>
              <p>
                <a
                  href="mailto:exclusive@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  exclusive@gmail.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+8801588889999"
                  className="hover:text-white transition-colors"
                >
                  +88015-88888-9999
                </a>
              </p>
            </address>
          </div>

          {/* Account Section */}
          <div>
            <h4 className="font-fredoka text-lg font-semibold mb-4">Account</h4>
            <nav className="font-noto text-sm text-white/70 space-y-2">
              <Link
                href="/account"
                className="block hover:text-white transition-colors"
              >
                My Account
              </Link>
              <Link
                href="/login"
                className="block hover:text-white transition-colors"
              >
                Login / Register
              </Link>
              <Link
                href="/cart"
                className="block hover:text-white transition-colors"
              >
                Cart
              </Link>
              <Link
                href="/wishlist"
                className="block hover:text-white transition-colors"
              >
                Wishlist
              </Link>
              <Link
                href="/shop"
                className="block hover:text-white transition-colors"
              >
                Shop
              </Link>
            </nav>
          </div>

          {/* Quick Link Section */}
          <div>
            <h4 className="font-fredoka text-lg font-semibold mb-4">
              Quick Link
            </h4>
            <nav className="font-noto text-sm text-white/70 space-y-2">
              <Link
                href="/privacy-policy"
                className="block hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block hover:text-white transition-colors"
              >
                Terms Of Use
              </Link>
              <Link
                href="/faq"
                className="block hover:text-white transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="block hover:text-white transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Download App Section */}
          <div>
            <h4 className="font-fredoka text-lg font-semibold mb-4">
              Download App
            </h4>
            <p className="font-noto text-xs text-white/50 mb-3">
              Save $3 with App New User Only
            </p>
            <div className="flex gap-2 mb-4">
              {/* QR Code Placeholder */}
              <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary text-3xl">📱</span>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href="#"
                  className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded text-xs flex items-center gap-2 transition-colors"
                >
                  <span>▶</span>
                  <div>
                    <div className="text-[10px] text-white/70">GET IT ON</div>
                    <div className="font-medium">Google Play</div>
                  </div>
                </Link>
                <Link
                  href="#"
                  className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded text-xs flex items-center gap-2 transition-colors"
                >
                  <span>🍎</span>
                  <div>
                    <div className="text-[10px] text-white/70">
                      Download on the
                    </div>
                    <div className="font-medium">App Store</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-white/70 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-white/70 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-white/70 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-white/70 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="font-noto text-sm text-white/50">
            © Copyright Rimel 2022. All right reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
