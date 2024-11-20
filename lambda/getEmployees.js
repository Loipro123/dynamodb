import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDB({});
const dynamoDB = DynamoDBDocument.from(client);

export const handler = async (event) => {
    try {
        // DynamoDB table name
        const tableName = 'Employees';
        
        // Parameters for scanning the entire table
        const params = {
            TableName: tableName
        };
        
        // Scan the table to get all items
        const data = await dynamoDB.scan(params);
        
        // Prepare the response
        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Enable CORS for your frontend
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(data.Items)
        };
        
        return response;
        
    } catch (error) {
        console.error('Error:', error);
        
        // Return error response
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*', // Enable CORS for your frontend
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ 
                message: 'Error fetching employees',
                error: error.message 
            })
        };
    }
};
