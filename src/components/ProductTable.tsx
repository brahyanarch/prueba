'use client'

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type Product = {
  id: number;
  name: string;
  price: number;
};

type ProductTableProps = {
  products: Product[];
  totalPages: number;
  currentPage: number;
  search: string;
  sort: string;
  order: string;
};

export default function ProductTable({ 
  products, 
  totalPages, 
  currentPage, 
  search: initialSearch, 
  sort: initialSort, 
  order: initialOrder 
}: ProductTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialSearch);

  const handleSort = (column: string) => {
    const newOrder = initialSort === column && initialOrder === 'asc' ? 'desc' : 'asc';
    updateQueryParams({ sort: column, order: newOrder, page: '1' });
  };

  const handleSearch = () => {
    updateQueryParams({ search, page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    updateQueryParams({ page: newPage.toString() });
  };

  const updateQueryParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, value);
    });
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar productos..."
          className="p-2 border rounded"
        />
        <button onClick={handleSearch} className="ml-2 p-2 bg-blue-500 text-white rounded">
          Buscar
        </button>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th 
              className="border p-2 cursor-pointer"
              onClick={() => handleSort('name')}
            >
              Nombre {initialSort === 'name' && (initialOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th 
              className="border p-2 cursor-pointer"
              onClick={() => handleSort('price')}
            >
              Precio {initialSort === 'price' && (initialOrder === 'asc' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">${product.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

