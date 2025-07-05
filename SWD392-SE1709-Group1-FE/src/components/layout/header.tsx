import { Search, ShoppingCart, MapPin, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { LanguageSelector } from '@/components/ui/language-selector';
import { set } from 'date-fns';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import __helpers from '@/helpers';
import { useRouter } from '@/routes/hooks';

const suggestionNames = [
  'John Smith',
  'Emma Johnson',
  'Michael Williams',
  'Sophia Brown',
  'James Jones',
  'Olivia Davis',
  'Robert Miller',
  'Ava Wilson',
  'William Taylor',
  'Isabella Anderson'
];

export function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [listProductLocalStorage, setListProductLocalStorage] = useState([]);
  const { listProduct } = useSelector((state: RootState) => state.order);
  const infoUser = __helpers.localStorage_get('infoUser');
  const router = useRouter();

  useEffect(() => {
    const storedProducts = window.localStorage.getItem('listProductAdded');
    if (storedProducts) {
      setListProductLocalStorage(JSON.parse(storedProducts));
    }
  }, [listProduct]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSuggestions([]);
    } else {
      const filtered = suggestionNames.filter((name) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
    setShowSuggestions(
      searchTerm.trim() !== '' && filteredSuggestions.length > 0
    );
  }, [searchTerm, filteredSuggestions.length]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const container = document.getElementById('searchContainerId');
      if (container && !container.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  return (
    <header className="bg-gray-900 text-white">
      {isSearchFocused && (
        <div
          onClick={() => setIsSearchFocused(false)}
          className="fixed -inset-4 z-40 bg-black/60 bg-opacity-20"
        />
      )}
      {/* Top bar */}
      <div className="relative z-50 bg-gray-800 px-4 py-2 text-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-4">
            <span>Free shipping on orders over $25</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Customer Service</span>
            <span>Registry</span>
            <span>Gift Cards</span>
            <span>Sell</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="relative z-50 px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center space-x-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold">amazon</h1>
          </div>

          {/* Deliver to */}
          <div className="hidden items-center space-x-1 text-sm md:flex">
            <MapPin className="h-4 w-4" />
            <div>
              <div className="text-xs text-gray-300">Deliver to</div>
              <div className="font-bold">New York 10001</div>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-2xl flex-1">
            <div className="relative flex" id={'searchContainerId'}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-r-none border-gray-300 bg-gray-200 px-3 text-black"
                  >
                    All
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>All Departments</DropdownMenuItem>
                  <DropdownMenuItem>Electronics</DropdownMenuItem>
                  <DropdownMenuItem>Books</DropdownMenuItem>
                  <DropdownMenuItem>Home & Garden</DropdownMenuItem>
                  <DropdownMenuItem>Fashion</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="relative flex-1">
                <Input
                  placeholder="Search Amazon"
                  className="flex-1 rounded-none border-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => {
                    setIsSearchFocused(true);
                    if (filteredSuggestions.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                />

                {showSuggestions && (
                  <div className="absolute z-10 mt-1 w-full rounded-b-md bg-white text-black shadow-lg">
                    {filteredSuggestions.map((suggestion) => (
                      <div
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                        onClick={() => handleSelectSuggestion(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button className="rounded-l-none bg-orange-400 px-4 hover:bg-orange-500">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-6">
            {/* Language */}
            <div className="hidden items-center md:flex">
              <LanguageSelector />
            </div>

            {/* Account */}
            {infoUser ? (
              <div className="flex items-center gap-4">
                <div className="hidden text-sm md:block">
                  Xin chào
                  {JSON.parse(infoUser).name || 'user'}
                </div>

                <div className="flex items-center space-x-1">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="font-bold">Cart</span>
                  <span className="rounded-full bg-orange-400 px-2 py-1 text-2xl  text-black">
                    {listProductLocalStorage.length || 0}
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <Button
                  onClick={() => {
                    router.push('/login');
                  }}
                >
                  Đăng nhập
                </Button>
              </div>
            )}

            {/* Mobile menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="bg-gray-800 px-4 py-2">
        <div className="mx-auto flex max-w-7xl items-center space-x-6 text-sm">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="p-0 px-2 text-white">
                <Menu className="mr-2 h-4 w-4" />
                All
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="border-gray-700 bg-gray-900 text-white"
            >
              <SheetHeader className="border-b border-gray-700 pb-4">
                <SheetTitle className="text-white">Hello, sign in</SheetTitle>
                <SheetDescription className="text-gray-300">
                  Browse Amazon categories and account options
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 flex flex-col space-y-4">
                <h3 className="mb-2 text-lg font-bold">Shop By Department</h3>
                <div className="grid gap-3">
                  <div className="cursor-pointer hover:text-gray-300">
                    Electronics
                  </div>
                  <div className="cursor-pointer hover:text-gray-300">
                    Computers
                  </div>
                  <div className="cursor-pointer hover:text-gray-300">
                    Smart Home
                  </div>
                  <div className="cursor-pointer hover:text-gray-300">
                    Arts & Crafts
                  </div>
                  <div className="cursor-pointer hover:text-gray-300">
                    Automotive
                  </div>
                  <div className="cursor-pointer hover:text-gray-300">Baby</div>
                  <div className="cursor-pointer hover:text-gray-300">
                    Beauty & Personal Care
                  </div>
                  <div className="cursor-pointer hover:text-gray-300">
                    Books
                  </div>
                </div>
              </div>
              <SheetFooter className="mt-6 border-t border-gray-700 pt-4">
                <Button className="w-full bg-orange-400 text-black hover:bg-orange-500">
                  Sign In
                </Button>
                <SheetClose asChild>
                  <Button
                    variant="outline"
                    className="w-full border-gray-600 text-black hover:bg-gray-800"
                  >
                    Close
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <span className="cursor-pointer hover:text-gray-300">
            Today's Deals
          </span>
          <span className="cursor-pointer hover:text-gray-300">
            Customer Service
          </span>
          <span className="cursor-pointer hover:text-gray-300">Registry</span>
          <span className="cursor-pointer hover:text-gray-300">Gift Cards</span>
          <span className="cursor-pointer hover:text-gray-300">Sell</span>
        </div>
      </div>
    </header>
  );
}
