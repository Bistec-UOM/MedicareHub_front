import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

export default function ExportDefaultToolbar({ data }) {
  const [loading, setLoading] = React.useState(true);

  const rows = data ? data.map((item, index) => ({
    id: index,
    name: item.name,
    available: item.available,
  })) : [];

  const columns = [
    { field: 'id', headerName: 'Number', width: 500 },
    {
      field: 'name',
      headerName: 'Name',
      width: 500,
      editable: true,
    },
    {
      field: 'available',
      headerName: 'Available Count',
      width: 500,
      editable: true,
    },
  ];

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div style={{ height: 600,textAlign:'center' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
}