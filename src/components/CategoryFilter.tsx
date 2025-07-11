import React, { useEffect, useState } from 'react';

type Category = {
  id: number;
  name: string;
};

interface CategoryFilterProps {
  onSelectCategory: (categoryId: string) => void;
}

export default function CategoryFilter({
  onSelectCategory,
}: CategoryFilterProps) {
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [localSelectedCategory, setLocalSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiUrl = 'http://localhost:3000/api/categories';
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Array<Category> = await response.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = event.target.value;
    setLocalSelectedCategory(selectedId);
    onSelectCategory(selectedId);
  };

  return (
    <div className='text-amber-400 flex items-center gap-2'>
      <select
        className='bg-amber-800 rounded rounded-md p-1 px-2 focus:outline-amber-400'
        name='filter'
        id='filter'
        onChange={handleCategoryChange}
        value={localSelectedCategory}
      >
        <option value=''>All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
