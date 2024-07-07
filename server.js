import dotenv from 'dotenv';
import AWS from 'aws-sdk';

dotenv.config();

AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const table = process.env.TABLE_NAME;

const insertDatatoDb = () => {
  return {
    TableName: table,
    Item: {
      id: '1Ash',
      client: 'client_' + Math.random(),
      Department: 'Manager',
      Status: true,
      json: {
        address: {
          company: 'Mynation',
          city: 'Pune',
          street: 'Jc road',
          pin: '598045'
        }
      }
    }
  };
};

const putItem = async () => {
  const params = insertDatatoDb();
  return new Promise((resolve, reject) => {
    dynamoDb.put(params, (err, data) => {
      if (err) {
        console.log(err, 'There was a problem');
        reject(err);
      } else {
        console.log(data, 'This is the response');
        resolve(data);
      }
    });
  });
};


const scanTable = async () =>{
    const params = {
        TableName : table,
    }

    return new Promise ((resolve,reject)=>{
        dynamoDb.scan(params,(err,data)=>{
            if(err){
                reject(err);
                console.log('There is a problem reading the table ')
            }else{
                resolve(data.Items);
                console.log(data,'This is the data ')
                console.log(data.Items,'items');
            }
        })
    })

}

const getSpecificItem = async()=>{
    const id = '1Ash'
    const params = {
        TableName:table,
        Key:{
            id:id,
        }
    }

    return new Promise((resolve,reject)=>{
        dynamoDb.get(params,(err,data)=>{
            if(err){
                console.log(err,'Cant read this specific data');
                reject(err);
            }else{
                console.log(data,'this is the response')
                resolve(data)
            }
        })
    })


}

const queryItem =async(idName)=>{
    const params = {
        TableName : table,
        KeyConditionExpression:'id = :idName',
        ExpressionAttributeValues:{
            ':idName':idName
        }
    }
    return new Promise((resolve,reject)=>{
        dynamoDb.query(params,(err,data)=>{
            if(err){
                reject(err)
                console.log(err,'there is a problem querying the item')
            }else{
                resolve(data);
                console.log(data,'this is the response data');
            }
        })
    })
};

const updateItem = async () => {
    const params = {
      TableName: table,
      Key: {
        id: '1Ash'
      },
      UpdateExpression: 'set #d = :d',
      ExpressionAttributeNames: {
        '#d': 'Department'
      },
      ExpressionAttributeValues: {
        ':d': 'Director'
      },
      ReturnValues: 'UPDATED_NEW'
    };
  
    return new Promise((resolve, reject) => {
      dynamoDb.update(params, (err, data) => {
        if (err) {
          console.log(err, 'There was a problem updating the item');
          reject(err);
        } else {
          console.log(data, 'This is the response');
          resolve(data);
        }
      });
    });
  };


  const deleteItem = async () => {
    const params = {
      TableName: table,
      Key: {
        id: '1Ash'
      }
    };
  
    return new Promise((resolve, reject) => {
      dynamoDb.delete(params, (err, data) => {
        if (err) {
          console.log(err, 'There was a problem deleting the item');
          reject(err);
        } else {
          console.log(data, 'This is the response');
          resolve(data);
        }
      });
    });
  };
  



const main = async () => {
  try {
    // const result = await putItem();
    // console.log(result);

    // const scanResult = await scanTable();
    // console.log(scanResult,'Result');

    // const getItemResult = await getSpecificItem();
    // console.log("GetItemResult data : ",getItemResult) 

    // const queryItemResult = await queryItem('1Ash');
    // console.log(queryItemResult,'this is the final output');


    // const updateResult = await updateItem();
    // console.log(updateResult, 'Update Result');
 

    // const deleteResult = await deleteItem();
    // console.log(deleteResult, 'Delete Result');
 
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

main();


//no items in DB since th one item that is created is finally deleted