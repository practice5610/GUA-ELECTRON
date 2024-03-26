import React from 'react';
import { Stack } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

function DashboardLayout() {
  return (
    <Stack>
      <Outlet />
    </Stack>
  );
}

export default DashboardLayout;
