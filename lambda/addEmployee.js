import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';

const client = new DynamoDB({});
const dynamoDB = DynamoDBDocument.from(client);

export const handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    try {
        // Handle both direct Lambda test events and API Gateway events
        let employeeData;
        
        if (event.body) {
            // API Gateway event
            const parsedBody = typeof event.body === 'string' 
                ? JSON.parse(event.body)
                : event.body;
                
            // Handle the nested body structure from the frontend
            employeeData = parsedBody.body ? JSON.parse(parsedBody.body) : parsedBody;
        } else {
            // Direct Lambda test event
            employeeData = event;
        }
            
        console.log('Parsed employee data:', employeeData);

        // Validate required fields
        if (!employeeData.name || !employeeData.salary || !employeeData.year) {
            throw new Error('Missing required fields: name, salary, and year are required');
        }
        
        // Add an ID to the employee record
        const employeeItem = {
            id: randomUUID(),
            name: employeeData.name,
            salary: Number(employeeData.salary), // Ensure salary is a number
            year: Number(employeeData.year),     // Ensure year is a number
            createdAt: new Date().toISOString()
        };
        
        console.log('Employee item to save:', employeeItem);
        
        // Parameters for putting item into DynamoDB
        const params = {
            TableName: 'Employees',
            Item: employeeItem
        };
        
        // Add the item to DynamoDB
        await dynamoDB.put(params);
        
        // Prepare the success response
        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Employee added successfully',
                employee: employeeItem
            })
        };
        
        return response;
        
    } catch (error) {
        console.error('Error:', error);
        
        // Return error response
        return {
            statusCode: error.message.includes('Missing required fields') ? 400 : 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                message: 'Error adding employee',
                error: error.message 
            })
        };
    }
};
