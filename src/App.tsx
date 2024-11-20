import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography
} from '@mui/material';
import axios from 'axios';

interface Employee {
  id?: number;
  name: string;
  salary: number;
  year: number;
}

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [formData, setFormData] = useState<Employee>({
    name: '',
    salary: 0,
    year: new Date().getFullYear()
  });

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://9wade1xxrl.execute-api.us-east-2.amazonaws.com/dev/employee');
      const employees = JSON.parse(response.data.body);
      setEmployees(employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' ? value : Number(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://9wade1xxrl.execute-api.us-east-2.amazonaws.com/dev/employee',
        { body: JSON.stringify(formData) },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      console.log('Response:', response.data);
      
      setFormData({
        name: '',
        salary: 0,
        year: new Date().getFullYear()
      });
      
      fetchEmployees();
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Employee Management System
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Salary"
          name="salary"
          type="number"
          value={formData.salary}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Year"
          name="year"
          type="number"
          value={formData.year}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <Button 
          variant="contained" 
          type="submit" 
          sx={{ mt: 2 }}
        >
          Add Employee
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Salary</TableCell>
              <TableCell align="right">Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={employee.id || index}>
                <TableCell>{employee.name}</TableCell>
                <TableCell align="right">${employee.salary.toLocaleString()}</TableCell>
                <TableCell align="right">{employee.year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;
