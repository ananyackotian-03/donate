import json
import boto3
import os
import gzip
import logging

# We set up a basic logger for CloudWatch
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    """
    AWS Lambda Entry Point.
    This function will be automatically triggered by AWS whenever a new
    CloudTrail log file is saved into the S3 bucket.
    """
    logger.info("Lambda function triggered by S3 event.")
    
    # S3 triggers send an "event" dictionary containing the name of the new log file
    try:
        # Get the bucket name and the exact file key (path) that was just uploaded
        bucket_name = event['Records'][0]['s3']['bucket']['name']
        object_key = event['Records'][0]['s3']['object']['key']
        
        logger.info(f"Processing new log file: s3://{bucket_name}/{object_key}")
        
        # Connect to S3 to download the specific file
        s3 = boto3.client('s3')
        response = s3.get_object(Bucket=bucket_name, Key=object_key)
        
        # Unzip the file in memory
        compressed_data = response['Body'].read()
        uncompressed_data = gzip.decompress(compressed_data)
        log_data = json.loads(uncompressed_data)
        
        records = log_data.get('Records', [])
        logger.info(f"Successfully unpacked {len(records)} events.")
        
        # In a real environment, you would now send these records to a Database,
        # an SQS queue, or a Security Information and Event Management (SIEM) tool.
        # For now, we just print them so they show up in AWS CloudWatch logs.
        
        for record in records[:5]:  # Print first 5 just to verify
            logger.info(f"Parsed Event: {record.get('eventName')} by {record.get('userIdentity', {}).get('userName', 'unknown')}")
            
        return {
            'statusCode': 200,
            'body': json.dumps(f'Successfully processed {len(records)} events from {object_key}')
        }
        
    except Exception as e:
        logger.error(f"Error processing S3 event: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps('Error processing file.')
        }
