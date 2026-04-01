import boto3
import os
import json
import gzip
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from a .env file (we will create this later)
load_dotenv()

# AWS Configuration
AWS_REGION = os.getenv("AWS_REGION", "ap-south-1") # Change this to your region if different
S3_BUCKET = os.getenv("S3_BUCKET_NAME", "your-cloudtrail-bucket-name")
DOWNLOAD_DIR = Path("data/raw_logs")

def get_s3_client():
    """Creates and returns an S3 client using boto3."""
    return boto3.client(
        "s3",
        region_name=AWS_REGION,
        aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    )

def list_log_files(s3_client, prefix="AWSLogs/"):
    """Lists all CloudTrail log files (.json.gz) in the S3 bucket."""
    log_files = []
    paginator = s3_client.get_paginator("list_objects_v2")
    
    # We use a paginator because an S3 bucket might have thousands of files
    try:
        for page in paginator.paginate(Bucket=S3_BUCKET, Prefix=prefix):
            for obj in page.get("Contents", []):
                if obj["Key"].endswith(".json.gz"):
                    log_files.append(obj["Key"])
        return log_files
    except Exception as e:
        except_msg = "Could not list files. Check your AWS credentials and bucket name."
        print(f"Error: {except_msg}\nDetails: {e}")
        return []

def download_and_extract(s3_client, s3_key):
    """Downloads a gzipped log file from S3 and returns the parsed JSON dictionary."""
    try:
        response = s3_client.get_object(Bucket=S3_BUCKET, Key=s3_key)
        compressed_data = response["Body"].read()
        
        # Decompress the gzip file
        uncompressed_data = gzip.decompress(compressed_data)
        
        # Parse the JSON string into a Python dictionary
        return json.loads(uncompressed_data)
    except Exception as e:
        print(f"Failed to download or parse {s3_key}: {e}")
        return None

def collect_logs(max_files=5):
    """
    Main function: Downloads a few CloudTrail logs from S3.
    Extracts them and returns a list of all raw log records.
    """
    # Create the download directory if it doesn't exist
    DOWNLOAD_DIR.mkdir(parents=True, exist_ok=True)
    
    s3 = get_s3_client()
    log_files = list_log_files(s3)
    
    if not log_files:
        print("[!] No log files found or access denied.")
        return []
        
    print(f"[+] Found {len(log_files)} log files in S3. Downloading up to {max_files}...")

    all_records = []
    # We only download 'max_files' to test, so it's fast.
    for key in log_files[:max_files]:
        data = download_and_extract(s3, key)
        if data:
            records = data.get("Records", [])
            all_records.extend(records)
            print(f"  [✓] Downloaded {key} → Found {len(records)} events")

    print(f"\n[+] Total events collected: {len(all_records)}")
    return all_records

# This block runs only if you run this file directly (e.g., `python src/log_collector.py`)
if __name__ == "__main__":
    print("--- Starting Log Collector Test ---")
    
    # Check if a sample log exists locally for offline testing
    sample_log_path = Path("data/raw_logs/sample_logs.json")
    if sample_log_path.exists():
        print("[i] Found local sample logs at {sample_log_path}. You can safely test processing offline.")
        # Load sample data directly for offline testing
        with open(sample_log_path, "r") as f:
            sample_data = json.load(f)
            records = sample_data.get("Records", [])
            print(f"[+] Successfully loaded {len(records)} events from local sample.")
            
            # Save it to the output path so the next stage can use it
            out_path = DOWNLOAD_DIR / "collected_logs.json"
            DOWNLOAD_DIR.mkdir(parents=True, exist_ok=True)
            with open(out_path, "w") as out_f:
                json.dump({"Records": records}, out_f, indent=2, default=str)
            print(f"[+] Success! Saved combined logs to {out_path}")
    else:
        print("[!] No local sample logs found.")
        
        print("\nAttempting to connect to AWS S3...")
        records = collect_logs(max_files=1) # Just grab 1 file for now to see if it works
        
        if records:
            out_path = DOWNLOAD_DIR / "collected_logs.json"
            with open(out_path, "w") as f:
                json.dump({"Records": records}, f, indent=2, default=str)
            print(f"[+] Success! Saved combined logs to {out_path}")
        else:
            print("[-] No records downloaded. Check your .env setup.")
