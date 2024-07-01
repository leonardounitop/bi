import React from 'react'
import { DataGrid, gridClasses } from '@mui/x-data-grid';

function Table({ rows, columns, onRowClick }) {
    return (
        <DataGrid
            rows={rows}
            columns={columns}
            onRowClick={onRowClick}
            sx={{
                [`& .${gridClasses.cell}`]: {
                    py: 2,
                },
            }}
            getRowHeight={() => 'auto'}
            columnBufferPx={100}
            disableRowSelectionOnClick={true}
            slotProps={{
                toolbar: {
                    showQuickFilter: true,
                },
            }} />
    )
}

export default Table