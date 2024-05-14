import csv

def create_empty_csv():
    # Define the field names
    field_names = ['name', 'dob', 'gender', 'address', 'medical_history', 'current_medications']

    # Specify the filename
    filename = 'patient_data.csv'

    # Write the header row with field names to the CSV file
    with open(filename, mode='w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=field_names)
        writer.writeheader()

    print(f"Empty CSV file '{filename}' with columns created successfully.")

# create_empty_csv()
