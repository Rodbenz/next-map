import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'age', headerName: 'Age', width: 90 },
];

const rows = [
    { id: 1, name: 'John Doe', age: 35 },
    { id: 2, name: 'Jane Smith', age: 42 },
    { id: 3, name: 'Bob Johnson', age: 28 },
];

function CustomDataGrid() {
    const [activeCellId, setActiveCellId] = React.useState(1);

    const handleCellClick = (params) => {
        setActiveCellId(params.id);
    };

    const getCellClassName = (params) => {
        console.log(params.id, activeCellId);
        if (params.id == activeCellId) {
          return 'active-cell';
        }
        return '';
    };

    return (
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                onCellClick={handleCellClick}
                // getCellClassName={getCellClassName}
                getRowClassName={getCellClassName}
                sx={{
                    '& .active-cell': {
                        color: 'red',
                        backgroundColor: '#f78801',
                        p: '1px', minWidth: '80px', textAlign: 'center'
                    }
                }}
            />
        </div>
    );
}

export default CustomDataGrid;
