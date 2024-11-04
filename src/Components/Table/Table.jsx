import React, { lazy, Suspense } from 'react';
import TableContentLoader from '../../Helper/Skeleton/TableContentLoader';
import { gridClasses } from '@mui/x-data-grid';

import { ptBR } from '@mui/x-data-grid/locales';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme(
    {
        palette: {
            primary: { main: '#1976d2' },
        },
    },
    ptBR,
);
// Lazy load do DataGrid
const DataGrid = lazy(() => import('@mui/x-data-grid').then(module => ({ default: module.DataGrid })));

function Table({ rows, columns, onRowClick, hideFooter = false, autoHeight = false }) {
    return (
        <Suspense fallback={<TableContentLoader />}>
            <ThemeProvider theme={theme}>
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
                    hideFooter={hideFooter}
                    autoHeight={autoHeight}
                />
            </ThemeProvider>
        </Suspense>
    );
}

export default Table;
