import React, {useCallback} from 'react';

import { useTable, useSortBy, useGlobalFilter, useAsyncDebounce, Row,
    IdType } from "react-table";



import "./styles.scss";

function GlobalFilter({
          preGlobalFilteredRows,
          globalFilter,
          setGlobalFilter,
        }:{
            preGlobalFilteredRows:any,
            globalFilter:any,
            setGlobalFilter:any,
    }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
      Search:{' '}
            <input
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
                style={{
                    fontSize: '1.1rem',
                    border: '0',
                }}
            />
    </span>
    )
}


export default function Table<T extends { id: string }>({columns, data}:{columns:any, data:any}) {

    const ourGlobalFilterFunction = useCallback(

        (rows: Row<T>[], ids: IdType<T>[], query: string) => {
            return rows.filter((row) =>
                row.values['category'].includes(query) ||
                row.values['description'].includes(query)
            );
        },
        [],
    );

    const table = useTable({ columns, data, globalFilter: ourGlobalFilterFunction}, useGlobalFilter,useSortBy, );



    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        state,
        prepareRow,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = table;

    return (
        <>

            <div className="container">
                <div className="search_container">
                    <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter}/>
                </div>
                <table {...getTableProps()}>
                    <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (

                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className={
                                        column.isSorted
                                            ? column.isSortedDesc
                                            ? "desc"
                                            : "asc"
                                            : ""
                                    }
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    {/* Apply the table body props */}
                    <tbody {...getTableBodyProps()}>
                    {
                        // Loop over the table rows
                        rows.map((row) => {
                            // Prepare the row for display
                            prepareRow(row);
                            return (
                                // Apply the row props
                                <tr {...row.getRowProps()}>
                                    {
                                        // Loop over the rows cells
                                        row.cells.map((cell) => {
                                            // Apply the cell props
                                            return (
                                                <td {...cell.getCellProps()}>
                                                    {
                                                        // Render the cell contents
                                                        cell.render("Cell")
                                                    }
                                                </td>
                                            );
                                        })
                                    }
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        </>
    );
}
