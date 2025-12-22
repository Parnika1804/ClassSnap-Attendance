import pandas as pd
from datetime import date
import os

# Load students database
students = pd.read_csv("students.csv")

# Simulated face recognition output (IDs detected)
recognized_ids = ["S001", "S003", "S003", "S005"]

# Remove duplicates
recognized_ids = set(recognized_ids)

# Mark attendance
students["Status"] = students["ID"].apply(
    lambda x: "Present" if x in recognized_ids else "Absent"
)

# Add date
students["Date"] = date.today()

# Keep only required columns
attendance = students[["ID", "Name", "Date", "Status"]]

# Save / append to Excel
file_name = "attendance.xlsx"

if os.path.exists(file_name):
    old_data = pd.read_excel(file_name)
    attendance = pd.concat([old_data, attendance], ignore_index=True)

attendance.to_excel(file_name, index=False)

print("Attendance generated successfully.")
