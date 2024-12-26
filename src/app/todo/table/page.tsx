"use client";
import DynamicTable from "@/components/dynamictable";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Edit, Trash2 , List} from "lucide-react";
import { API_PERMISOS, API_USER } from "@/config/apiconfig";
import { Rol,Subunidad,User } from "@/interfaces/interfaces";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Permission = {
  id_per: number;
  n_per: string;
  abreviatura: string;
};

export default function Component() {
  const [Users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [itemsPerPage, setItemsPerPage] = useState(1); // Cantidad de elementos por página

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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Calcula los índices de los elementos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Users.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(Users.length / itemsPerPage);

  // Función para manejar el cambio de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Función para renderizar los botones de paginación
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

  const configurationUser = [
    {
      key: "index",
      label: "ID",
      render: (item: User) => (
        <TableCell>{Users.indexOf(item) + 1}</TableCell>
      ),
    },
    {
      key: "nombre",
      label: "Nombre",
      render: (item: User) => <TableCell>{item.n_usu}</TableCell>,
    },
    {
      key: "rol",
      label: "Rol",
      render: (item: User) => <TableCell>{item.rol.n_rol}</TableCell>,
    },
    {
      key: "subunidad",
      label: "Sub Unidad",
      render: (item: User) => <TableCell>{item.sub_uni.n_subuni}</TableCell>,
    },
    {
      key: "estado",
      label: "Estado",
      render: (item: User) => (
        <TableCell>
          {item.estado ? (
            <Button className="bg-green-600 hover:bg-green-100 hover:text-green-800">
              Activo
            </Button>
          ) : (
            <Button>Desactivo</Button>
          )}
        </TableCell>
      ),
    },
    {
      key: "opciones",
      label: "Opciones",
      render: (item: User) => (
        <TableCell>
          <div className="flex space-x-2">
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
          </div>
        </TableCell>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Lista de Usuarios</h1>
      <DynamicTable
        configuration={configurationUser}
        data={currentItems} // Mostrar solo los ítems actuales según la página
      />
      <div className="flex justify-center space-x-2 mt-4">
        {renderPaginationButtons()}
      </div>

      <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon"  >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
    </div>
  );
}
