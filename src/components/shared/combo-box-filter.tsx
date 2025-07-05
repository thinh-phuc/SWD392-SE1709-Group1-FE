import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

interface ComboBoxFilterProps {
  onFilter: (value) => void;
}

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' }
];

function FrameworkPopover({
  open,
  setOpen,
  value,
  setValue,
  placeholder,
  disabled
}) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          disabled={disabled}
        >
          {value
            ? frameworks.find((fw) => fw.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Tìm kiếm..." />
          <CommandList>
            <CommandEmpty>Không tìm thấy dữ liệu</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={() => {
                    setValue(framework.value === value ? '' : framework.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === framework.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default function ComboBoxFilter({ onFilter }: ComboBoxFilterProps) {
  const [state, setState] = React.useState({
    value1: '',
    value2: '',
    open1: false,
    open2: false
  });

  React.useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      value2: !prevState.value1 ? '' : prevState.value2
    }));
  }, [state.value1, state.value2]);

  return (
    <div className="flex-cols flex space-x-3">
      <div className="flex flex-col space-y-1">
        <FrameworkPopover
          open={state.open1}
          setOpen={(open) => setState((prev) => ({ ...prev, open1: open }))}
          value={state.value1}
          setValue={(value) => setState((prev) => ({ ...prev, value1: value }))}
          placeholder="Chọn cơ sở..."
          disabled={false}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <FrameworkPopover
          open={state.open2}
          setOpen={(open) => setState((prev) => ({ ...prev, open2: open }))}
          value={state.value2}
          setValue={(value) => setState((prev) => ({ ...prev, value2: value }))}
          placeholder="Chọn lớp..."
          disabled={!state.value1}
        />
      </div>
      <Button
        variant="outline"
        className="bg-green-600 text-white"
        onClick={() => {
          onFilter({
            school: state.value1,
            class: state.value2
          });
        }}
      >
        Lọc
      </Button>
    </div>
  );
}
