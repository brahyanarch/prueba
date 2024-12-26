'use server'

//import { Product } from './types';
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
// Simula una base de datos de productos
const products: Product[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Producto ${i + 1}`,
  price: Math.random() * 100 + 1
}));

const ITEMS_PER_PAGE = 10;

export async function fetchProducts({ 
  page = 1, 
  search = '', 
  sort = 'name', 
  order = 'asc' 
}: { 
  page: number; 
  search: string; 
  sort: string; 
  order: string; 
}) {
  // Filtra los productos basado en la búsqueda
  let filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Ordena los productos
  filteredProducts.sort((a, b) => {
    if (sort === 'name') {
      return order === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sort === 'price') {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    }
    return 0;
  });

  // Calcula el total de páginas
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Obtiene los productos para la página actual
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return {
    products: paginatedProducts,
    totalPages
  };
}

