"use client";
import DynamicTable from "@/components/dynamictable";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import { API_USER } from "@/config/apiconfig";
import { User } from "@/interfaces/interfaces";

export default function Component() {
  const [Users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1);
  const totalPages = Math.ceil(Users.length / itemsPerPage);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchPermisos = async () => {
      try {
        const response = await fetch(API_USER);
        if (!response.ok) {
          throw new Error("Error al obtener los Permisos");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPermisos();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Función para acceder a propiedades anidadas
  const getNestedProperty = (obj: any, key: string) => {
    return key.split('.').reduce((value, part) => value && value[part], obj);
  };

  // Función para ordenar los datos
  const getSortedData = () => {
    if (!sortColumn) return Users;

    return [...Users].sort((a, b) => {
      const fieldA = getNestedProperty(a, sortColumn);
      const fieldB = getNestedProperty(b, sortColumn);

      if (fieldA === undefined || fieldB === undefined) return 0;

      if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortDirection === "asc"
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
      
      if (typeof fieldA === "number" && typeof fieldB === "number") {
        return sortDirection === "asc" ? fieldA - fieldB : fieldB - fieldA;
      }

      return 0;
    });
  };

  const handleSort = (column: string) => {
    setSortColumn(column);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const sortedUsers = getSortedData();

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Configuración de la tabla
  const configurationUser = [
    {
      key: "index",
      label: "ID",
      render: (item: User) => <>{Users.indexOf(item) + 1}</>,
      sortable:true,
    },
    {
      key: "n_usu",
      label: "Nombre",
      render: (item: User) => item.n_usu,
      sortable: true,
    },
    {
      key: "rol.n_rol",
      label: "Rol",
      render: (item: User) => item.rol?.n_rol,
      sortable: true,
    },
    {
      key: "sub_uni.n_subuni",
      label: "Sub Unidad",
      render: (item: User) => item.sub_uni?.n_subuni,
      sortable: true,
    },
    {
      key: "estado",
      label: "Estado",
      render: (item: User) => (item.estado ? <Button className="bg-green-500">Activo</Button> : <Button className="bg-red-400">Desactivo</Button>),
    },
    {
      key: "opciones",
      label: "Opciones",
      render: (item: User) => (
        <>
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => console.log("Eliminar", item.dni)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      ),
    },
  ];

  const renderPaginationButtons = () => {
    const pageButtons = [];

    // Botón de "Anterior"
    pageButtons.push(
      <Button
        key="prev"
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </Button>
    );

    // Mostrar la primera página siempre
    if (currentPage > 3) {
      pageButtons.push(
        <Button
          key={1}
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(1)}
        >
          1
        </Button>
      );
      pageButtons.push(<span key="start-ellipsis" className="px-2">...</span>);
    }

    // Rango de páginas cercanas a la actual
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, currentPage + Math.floor(maxVisiblePages / 2));

    if (endPage - startPage < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <Button
          key={i}
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? "bg-blue-500 text-white" : ""}
        >
          {i}
        </Button>
      );
    }

    // Mostrar la última página siempre
    if (currentPage < totalPages - 2) {
      pageButtons.push(<span key="end-ellipsis" className="px-2">...</span>);
      pageButtons.push(
        <Button
          key={totalPages}
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Button>
      );
    }

    // Botón de "Siguiente"
    pageButtons.push(
      <Button
        key="next"
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </Button>
    );

    return pageButtons;
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Lista de Usuarios</h1>
      <DynamicTable
        configuration={configurationUser}
        data={currentItems}
        onSort={handleSort}
      />
      <div className="flex justify-center space-x-2 mt-4">
        {renderPaginationButtons()}
      </div>
    </div>
  );
}
