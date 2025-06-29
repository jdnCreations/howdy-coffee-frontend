import type React from 'react';
import { useCallback, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

interface SearchBarProps {
  onSearchChange: (search: string) => void;
}

export default function SearchBar({ onSearchChange }: SearchBarProps) {
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange(event.target.value);
    },
    [onSearchChange]
  );

  const debouncedResults = useMemo(() => {
    const handler = debounce(handleSearchChange, 300);
    return handler;
  }, [handleSearchChange]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  return (
    <div>
      <input
        className='bg-amber-800 rounded rounded-md px-2 py-1 text-white placeholder:text-amber-500 focus:outline-amber-400'
        type='text'
        placeholder='Search'
        onChange={debouncedResults}
      />
    </div>
  );
}
