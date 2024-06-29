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
    { field: 'id', headerName: 'Number', flex: 1 },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      editable: true,
    },
    {
      field: 'available',
      headerName: 'Available Count',
      flex: 1,
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
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  <DataGrid
    sx={{ height: 600, width: '80vw', textAlign: 'center' }}
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