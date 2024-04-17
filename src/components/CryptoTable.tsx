import React, { useState, useEffect } from "react";
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
import { ArrowUpDown, ChevronDown } from "lucide-react";

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

const columns: ColumnDef<CryptoData>[] = [
  {
    accessorKey: "market_cap_rank", // Use market cap rank as accessor key
    header: "Market Cap Rank", // Display "Market Cap Rank" in the header
    cell: ({ row }) => <div>{row.getValue("market_cap_rank")}</div>, // Render market cap rank in the cell
  },
  {
    accessorKey: "name",
    header: "Coin",
    cell: ({ row }) => (
      <div className="flex items-center">
        <img src={row.original.image} alt={row.getValue("name")} className="w-8 h-8 mr-2" />
        <div>{row.getValue("name")}</div>
      </div>
    ),
  },
  {
    accessorKey: "current_price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>${row.getValue("current_price")}</div>,
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => <div>{row.getValue("symbol")}</div>,
  },
  {
    accessorKey: "price_change_percentage_24h",
    header: "Change (24h)",
    cell: ({ row }) => <div>{row.getValue("price_change_percentage_24h")}</div>,
  },
];

interface CryptoData {
  id: string;
  name: string;
  current_price: number;
  symbol: string;
  price_change_percentage_24h: string;
  market_cap_rank: number; // Add market_cap_rank to CryptoData interface
  image: string; // Add image property to CryptoData interface
}

const CryptoDataTable: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
      .then((response) => response.json())
      .then((data) => {
        const cryptoDataArray: CryptoData[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          current_price: item.current_price,
          symbol: item.symbol,
          price_change_percentage_24h: item.price_change_percentage_24h,
          market_cap_rank: item.market_cap_rank, // Assign market cap rank
          image: item.image, // Assign image URL
        }));
        setCryptoData(cryptoDataArray);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const table = useReactTable({
    data: cryptoData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
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
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CryptoDataTable;
