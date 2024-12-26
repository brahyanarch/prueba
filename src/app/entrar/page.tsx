import ProductTable from '@/components/ProductTable';
import { fetchProducts } from '@/app/actions';

export default async function ProductListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = Number(searchParams.page) || 1;
  const search = typeof searchParams.search === 'string' ? searchParams.search : '';
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'name';
  const order = typeof searchParams.order === 'string' ? searchParams.order : 'asc';

  const { products, totalPages } = await fetchProducts({ page, search, sort, order });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>
      <ProductTable 
        products={products} 
        totalPages={totalPages}
        currentPage={page}
        search={search}
        sort={sort}
        order={order}
      />
    </div>
  );
}

