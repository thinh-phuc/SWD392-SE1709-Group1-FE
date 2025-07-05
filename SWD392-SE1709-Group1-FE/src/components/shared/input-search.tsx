import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SearchIcon, XIcon } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

interface InputSearchProps {
  placeholder?: string;
  onSubmit: (searchText: string) => void;
}

export const InputSearch = ({ placeholder, onSubmit }: InputSearchProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(
    searchParams.get('keyword') || ''
  );

  const handleSearch = () => {
    onSubmit(searchText);
  };

  const handleClear = () => {
    setSearchText('');
    searchParams.delete('keyword');
    setSearchParams(searchParams);
  };

  return (
    <div className="flex gap-2">
      <div className="relative w-[350px]">
        <Input
          placeholder={placeholder || 'Tìm kiếm...'}
          className="max-w-[450px] px-6"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDownEnter={handleSearch}
        />
        <SearchIcon className="absolute left-1 top-2.5 h-4 w-4" />
        {searchText && (
          <XIcon
            className="absolute right-1 top-2.5 h-4 w-4 cursor-pointer"
            onClick={handleClear}
          />
        )}
      </div>
      <Button
        className="max-w-[200px] bg-blue-500 md:w-[25%]"
        onClick={handleSearch}
      >
        Tìm kiếm
      </Button>
    </div>
  );
};
