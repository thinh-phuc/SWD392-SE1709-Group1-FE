import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Back to top */}
      <div className="bg-gray-700 py-4 text-center">
        <Button variant="ghost" className="text-white hover:text-gray-300">
          Back to top
        </Button>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Get to Know Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Amazon
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Investor Relations
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Amazon Devices
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Make Money with Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Sell products on Amazon
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Sell on Amazon Business
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Sell apps on Amazon
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Become an Affiliate
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Advertise Your Products
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Amazon Payment Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Amazon Business Card
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shop with Points
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Reload Your Balance
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Amazon Currency Converter
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Let Us Help You</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Amazon and COVID-19
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Your Account
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Your Orders
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shipping Rates & Policies
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Returns & Replacements
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <h2 className="text-xl font-bold">amazon</h2>
            <select className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-sm">
              <option>🇺🇸 English</option>
              <option>🇪🇸 Español</option>
              <option>🇫🇷 Français</option>
            </select>
            <select className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-sm">
              <option>$ USD - U.S. Dollar</option>
              <option>€ EUR - Euro</option>
              <option>£ GBP - British Pound</option>
            </select>
            <select className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-sm">
              <option>🇺🇸 United States</option>
              <option>🇨🇦 Canada</option>
              <option>🇬🇧 United Kingdom</option>
            </select>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-6">
          <div className="flex flex-wrap justify-center space-x-6 text-xs text-gray-400">
            <a href="#" className="hover:underline">
              Conditions of Use
            </a>
            <a href="#" className="hover:underline">
              Privacy Notice
            </a>
            <a href="#" className="hover:underline">
              Your Ads Privacy Choices
            </a>
            <span>© 1996-2024, Amazon.com, Inc. or its affiliates</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
