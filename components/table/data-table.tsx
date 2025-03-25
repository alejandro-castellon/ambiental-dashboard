"use client";

import * as React from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

async function createRegistro(data: any) {
  try {
    const res = await fetch("http://localhost:1880/create-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Error al crear registro en Node-RED");
    }

    return await res.json();
  } catch (error) {
    console.error("Error creando registro:", error);
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });
  const router = useRouter();
  const [date, setDate] = React.useState(
    new Date().toISOString().split("T")[0]
  );
  const [time, setTime] = React.useState(
    new Date().toISOString().split("T")[1].slice(0, 5)
  );
  const [tempAmb, setTempAmb] = React.useState("");
  const [temp, setTemp] = React.useState("");
  const [oxygen, setOxygen] = React.useState("");
  const [ph, setPh] = React.useState("");
  const [conductivity, setConductivity] = React.useState("");
  const [turbidity, setTurbidity] = React.useState("");
  const [solid, setSolid] = React.useState("");
  const [dbo5, setDbo5] = React.useState("");
  const [nitrogen, setNitrogen] = React.useState("");
  const [phosphorus, setPhosphorus] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");

  return (
    <div>
      <div className="flex items-center pb-4 gap-2">
        <Label
          htmlFor="date-filter"
          className="text-sm font-medium text-gray-700"
        >
          Filtrar por fecha:
        </Label>
        <Input
          id="date-filter"
          type="date"
          placeholder="Filter by date..."
          value={(table.getColumn("date")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("date")?.setFilterValue(event.target.value)
          }
          className="w-40"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-700 hover:bg-green-500">Agregar</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Agrega un registro</DialogTitle>
              <DialogDescription>
                Introduce los valores del nuevo registro. Presiona guardar
                cuando termines.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-5 sm:grid-cols-8 items-center gap-2">
                <Label htmlFor="date" className="col-span-1 sm:col-span-2">
                  Fecha y hora
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="col-span-2 sm:col-span-3"
                />
                <Input
                  type="time"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="col-span-2 sm:col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="temp_amb">Temperatura ambiente</Label>
                <Input
                  id="temp_amb"
                  type="number"
                  value={tempAmb}
                  onChange={(e) => setTempAmb(e.target.value)}
                  className="col-span-1"
                />
                <Label htmlFor="temp">Temperatura</Label>
                <Input
                  id="temp"
                  type="number"
                  value={temp}
                  onChange={(e) => setTemp(e.target.value)}
                  className="col-span-1"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="oxygen">Oxígeno</Label>
                <Input
                  id="oxygen"
                  type="number"
                  value={oxygen}
                  onChange={(e) => setOxygen(e.target.value)}
                  className="col-span-1"
                />
                <Label htmlFor="ph">PH</Label>
                <Input
                  id="ph"
                  type="number"
                  value={ph}
                  onChange={(e) => setPh(e.target.value)}
                  className="col-span-1"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="conductivity">Conductivi- dad</Label>
                <Input
                  id="conductivity"
                  type="number"
                  value={conductivity}
                  onChange={(e) => setConductivity(e.target.value)}
                  className="col-span-1"
                />
                <Label htmlFor="turbidity">Turbidez</Label>
                <Input
                  id="turbidity"
                  type="number"
                  value={turbidity}
                  onChange={(e) => setTurbidity(e.target.value)}
                  className="col-span-1"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="solid">Sólidos totales</Label>
                <Input
                  id="solid"
                  type="number"
                  value={solid}
                  onChange={(e) => setSolid(e.target.value)}
                  className="col-span-1"
                />
                <Label htmlFor="dbo5">DBO5</Label>
                <Input
                  id="dbo5"
                  type="number"
                  value={dbo5}
                  onChange={(e) => setDbo5(e.target.value)}
                  className="col-span-1"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nitrogen">Nitrógeno</Label>
                <Input
                  id="nitrogen"
                  type="number"
                  value={nitrogen}
                  onChange={(e) => setNitrogen(e.target.value)}
                  className="col-span-1"
                />
                <Label htmlFor="phosphorus">Fósforo</Label>
                <Input
                  id="phosphorus"
                  type="number"
                  value={phosphorus}
                  onChange={(e) => setPhosphorus(e.target.value)}
                  className="col-span-1"
                />
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row">
              <Label htmlFor="pass">Contraseña:</Label>
              <Input
                type="password"
                id="pass"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
              <Button
                type="button"
                onClick={async () => {
                  if (passwordInput !== "12345") {
                    alert("Contraseña incorrecta");
                    return;
                  }

                  const newRecord = {
                    date,
                    time,
                    tempAmb: parseFloat(tempAmb),
                    temp: parseFloat(temp),
                    oxygen: parseFloat(oxygen),
                    ph: parseFloat(ph),
                    conductivity: parseFloat(conductivity),
                    turbidity: parseFloat(turbidity),
                    solid: parseFloat(solid),
                    dbo5: parseFloat(dbo5),
                    nitrogen: parseFloat(nitrogen),
                    phosphorus: parseFloat(phosphorus),
                  };

                  const success = await createRegistro(newRecord);
                  if (success) {
                    router.refresh();
                  } else {
                    alert("Error al actualizar");
                  }
                }}
              >
                Guardar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
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
  );
}
