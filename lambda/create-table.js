import { DynamoDB } from '@aws-sdk/client-dynamodb';

const client = new DynamoDB({});

const params = {
    TableName: 'Employees',
    KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' }  // Partition key
    ],
    AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' }  // String type for id
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

export const handler = async () => {
    try {
        const data = await client.createTable(params);
        console.log("Table Created", data);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Table created successfully",
                tableDescription: data.TableDescription
            })
        };
    } catch (err) {
        console.error("Error", err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Error creating table",
                error: err.message
            })
        };
    }
};
