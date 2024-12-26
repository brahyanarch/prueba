"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { X, Edit, Trash2, CirclePlus } from "lucide-react";
import { useState, useEffect } from "react";
import { API_SUBUNIDADES } from "@/config/apiconfig";
import { Skeleton } from "@/components/ui/skeleton";
// import BreadcrumbItems from "@/components/breadcrumb";
type Permission = {
  id_subuni: number;
  n_subuni: string;
};

function renderPaginationButtons(
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void
) {
  const pageButtons = [];

  if (totalPages <= 5) {
    // Mostrar todas las páginas si son 5 o menos
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <Button
          key={i}
          variant="outline"
          size="sm"
          onClick={() => onPageChange(i)}
          className={currentPage === i ? "bg-blue-500 text-white" : ""}
        >
          {i}
        </Button>
      );
    }
  } else {
    // Mostrar paginación dinámica con "..."
    if (currentPage <= 3) {
      // Mostrar las primeras 3 páginas y "..."
      for (let i = 1; i <= 3; i++) {
        pageButtons.push(
          <Button
            key={i}
            variant="outline"
            size="sm"
            onClick={() => onPageChange(i)}
            className={currentPage === i ? "bg-blue-500 text-white" : ""}
          >
            {i}
          </Button>
        );
      }
      pageButtons.push(
        <span key="start-ellipsis" className="px-2">
          ...
        </span>
      );
      pageButtons.push(
        <Button
          key={totalPages}
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </Button>
      );
    } else if (currentPage > 3 && currentPage < totalPages - 2) {
      // Mostrar páginas con "..." en ambos extremos
      pageButtons.push(
        <Button
          key={1}
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
        >
          1
        </Button>
      );
      pageButtons.push(
        <span key="middle-ellipsis-left" className="px-2">
          ...
        </span>
      );

      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageButtons.push(
          <Button
            key={i}
            variant="outline"
            size="sm"
            onClick={() => onPageChange(i)}
            className={currentPage === i ? "bg-blue-500 text-white" : ""}
          >
            {i}
          </Button>
        );
      }

      pageButtons.push(
        <span key="middle-ellipsis-right" className="px-2">
          ...
        </span>
      );
      pageButtons.push(
        <Button
          key={totalPages}
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </Button>
      );
    } else {
      // Mostrar las últimas 3 páginas y "..."
      pageButtons.push(
        <Button
          key={1}
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
        >
          1
        </Button>
      );
      pageButtons.push(
        <span key="end-ellipsis" className="px-2">
          ...
        </span>
      );

      for (let i = totalPages - 2; i <= totalPages; i++) {
        pageButtons.push(
          <Button
            key={i}
            variant="outline"
            size="sm"
            onClick={() => onPageChange(i)}
            className={currentPage === i ? "bg-blue-500 text-white" : ""}
          >
            {i}
          </Button>
        );
      }
    }
  }

  return pageButtons;
}

// Modal para agregar un nuevo Permiso
export const EditModal = ({ isOpen, closeModal, onAddPermission }: any) => {
  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newPer = {
      nombre: name,
      abreviatura: abbreviation,
    };

    try {
      const response = await fetch(API_SUBUNIDADES, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPer),
      });

      if (response.ok) {
        const addedPermission = await response.json();
        onAddPermission(addedPermission);
        closeModal();
      } else {
        console.error("Error al agregar el permiso");
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-gray-800 p-6 rounded-lg shadow-xl w-[50%] h-[60%]">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-white">Agregar Permiso</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Permiso"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="abbreviation"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Abreviatura
            </label>
            <input
              type="text"
              id="abbreviation"
              value={abbreviation}
              onChange={(e) => setAbbreviation(e.target.value)}
              placeholder="Ins o Vacío"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Component() {
  const [Permisos, setPermisos] = useState<Permission[]>([]); // Define el tipo de Permisos
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  useEffect(() => {
    const fetchPermisos = async () => {
      try {
        const response = await fetch(API_SUBUNIDADES);
        if (!response.ok) {
          throw new Error("Error al obtener los Permisos");
        }
        const data = await response.json();
        setPermisos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPermisos();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const addPermission = (newPermission: Permission) => {
    setPermisos((prevPermisos) => [...prevPermisos, newPermission]); // Usa el tipo definido
  };

  const deletePermission = async (id: number) => {
    try {
      const response = await fetch(`${API_SUBUNIDADES}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPermisos((prevPermisos) =>
          prevPermisos.filter((permiso) => permiso.id_subuni !== id)
        );
        console.log("Permiso eliminado correctamente");
      } else {
        console.error("Error al eliminar el permiso");
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPermisos = Permisos.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-4 w-12" />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="w-[90%] m-4 p-4 space-y-4 text-white min-h-screen">
      <h1 className="text-2xl font-bold text-black dark:text-white">
        Sub Unidad
      </h1>
      <Button variant="secondary" size="sm" onClick={toggleModal}>
        <CirclePlus className="h-4 w-4" />
        Nuevo
      </Button>
      <div className="bg-[#E3E6ED] rounded-lg">
        <Table className="w-[90%] mx-auto my-6">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Opciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-gray-900">
            {currentPermisos.map((permission: any, index) => (
              <TableRow key={permission.id_subuni}>
                <TableCell>{permission.id_subuni}</TableCell>
                <TableCell>{permission.n_subuni}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deletePermission(permission.id_subuni)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        {renderPaginationButtons(
          currentPage,
          Math.ceil(Permisos.length / itemsPerPage),
          paginate
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(Permisos.length / itemsPerPage)}
        >
          Siguiente
        </Button>
      </div>
      <EditModal
        isOpen={isModalOpen}
        closeModal={toggleModal}
        onAddPermission={addPermission}
      />
    </div>
  );
}
