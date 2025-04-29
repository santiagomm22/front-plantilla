// src/components/administrador/UserDataTable.tsx
import { useState, useEffect } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, CalendarDays, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@/types/entities.types";
import { useApi } from "@/hooks/useApi";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export function UserDataTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { get } = useApi();

  // Fecha actual para mostrar en la cabecera
  const today = new Date();
  const formattedDate = format(today, "EEEE, dd 'de' MMMM 'de' yyyy", {
    locale: es,
  });

  // Formatear fecha
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "Nunca";
    try {
      const date = new Date(dateString);
      return format(date, "dd/MM/yyyy HH:mm", { locale: es });
    } catch (error) {
      return "Fecha inválida";
    }
  };

  // Cargar usuarios al montar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await get<User[]>("/usuarios");
        setUsers(response);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
        Notify.failure("No se pudieron cargar los usuarios");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Definir columnas
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "nombre",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nombre
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("nombre")}</div>,
    },
    {
      accessorKey: "email",
      header: "Correo",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "rol",
      header: "Rol",
      cell: ({ row }) => {
        const rol = row.original.rol;
        const rolName = typeof rol === "object" ? rol.nombre : rol;

        let badgeVariant: "default" | "secondary" | "destructive" | "outline" =
          "default";

        switch (rolName.toUpperCase()) {
          case "ADMINISTRADOR":
            badgeVariant = "destructive";
            break;
          case "USUARIO":
            badgeVariant = "secondary";
            break;
          default:
            badgeVariant = "outline";
        }

        return (
          <Badge variant={badgeVariant}>
            {typeof rol === "object" ? rol.nombre : rol}
          </Badge>
        );
      },
    },
    {
      accessorKey: "ultimo_acceso",
      header: "Último Acceso",
      cell: ({ row }) => formatDate(row.original.ultimo_acceso),
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => {
        const estado = row.getValue("estado") as number;
        return (
          <Badge
            variant={estado === 1 ? "default" : "outline"}
            className={estado === 1 ? "bg-green-500" : "bg-red-500 text-white"}
          >
            {estado === 1 ? "Activo" : "Inactivo"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({}) => {
        return (
          <Button variant="ghost" className="h-8 w-8 p-0">
            <Edit className="h-4 w-4" />
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-4">Cargando usuarios...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Listado de Usuarios
          </h2>
          <p className="text-muted-foreground flex items-center mt-1">
            <CalendarDays className="mr-1 h-4 w-4 text-foreground" />
            {formattedDate}
          </p>
        </div>

        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filtrar por nombre..."
              value={
                (table.getColumn("nombre")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("nombre")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No se encontraron resultados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredRowModel().rows.length} usuario(s) encontrado(s)
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Siguiente
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserDataTable;
