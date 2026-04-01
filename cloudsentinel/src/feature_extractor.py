import json
import pandas as pd
from pathlib import Path

# Input file from Step 2 (log_parser.py)
INPUT_PARSED_FILE = Path("data/raw_logs/parsed_logs.json")
# Output file containing only the extracted features
OUTPUT_FEATURES_FILE = Path("data/raw_logs/extracted_features.csv")

# A list of High-Risk API calls often used by attackers
SUSPICIOUS_EVENTS = {
    "ConsoleLogin", "DeleteTrail", "StopLogging", 
    "CreateUser", "AttachUserPolicy", "DeleteBucket"
}

def extract_features():
    """
    Reads the parsed JSON logs, keeps only security-relevant columns,
    and adds some basic feature engineering (e.g., checking if the action is risky).
    """
    print("--- Starting Feature Extractor ---")
    
    if not INPUT_PARSED_FILE.exists():
        print(f"[!] Error: {INPUT_PARSED_FILE} not found.")
        print("    Did you run 'python src/log_parser.py' first?")
        return
        
    # Read the JSON file into a Pandas DataFrame (a data table, like Excel)
    with open(INPUT_PARSED_FILE, "r") as f:
        data = json.load(f)
        
    if not data:
        print("[!] No data to process.")
        return
        
    df = pd.DataFrame(data)
    print(f"[i] Loaded {len(df)} parsed events.")

    # Feature Engineering Component: Create a new column 'is_suspicious'
    # It evaluates to 1 if the event is in our suspicious list, otherwise 0
    df["is_suspicious"] = df["event_name"].apply(lambda e: 1 if e in SUSPICIOUS_EVENTS else 0)
    
    # Feature 2: Is it an AWS Console login from a root account?
# (Root accounts shouldn't be used for daily tasks)
    df["is_root_login"] = df.apply(
        lambda row: 1 if row.get("user_name") == "root" and row.get("event_name") == "ConsoleLogin" else 0,
        axis=1
    )

    # We only want to save these specific columns for the detection engine
    core_columns = [
        "event_time", "event_name", "aws_region", "source_ip", 
        "user_name", "user_type", "error_code", "is_suspicious", "is_root_login"
    ]
    
    # Make sure all columns exist (in case our data was missing some)
    for col in core_columns:
        if col not in df.columns:
            df[col] = "Unknown"

    final_df = df[core_columns]
    
    # Save the cleaned dataset as a CSV (much easier for Machine Learning models to read)
    OUTPUT_FEATURES_FILE.parent.mkdir(parents=True, exist_ok=True)
    final_df.to_csv(OUTPUT_FEATURES_FILE, index=False)
    
    print(f"[+] Saved extracted features to {OUTPUT_FEATURES_FILE}")
    print("\n--- Feature Preview (First 5 Rows) ---")
    print(final_df.head(5).to_string())

if __name__ == "__main__":
    extract_features()
