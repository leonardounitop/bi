import React, { lazy, Suspense } from 'react';
import TableContentLoader from '../../Helper/Skeleton/TableContentLoader';
import { gridClasses } from '@mui/x-data-grid';

// Lazy load do DataGrid
const DataGrid = lazy(() => import('@mui/x-data-grid').then(module => ({ default: module.DataGrid })));

function Table({ rows, columns, onRowClick }) {
    return (
        <Suspense fallback={<TableContentLoader />}>
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
                }}
            />
        </Suspense>
    );
}

export default Table;
