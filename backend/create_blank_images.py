from PIL import Image
import os

# Create folder if it doesn't exist
os.makedirs("student_images", exist_ok=True)

# List of dummy student image filenames
students = ["amit.jpg","riya.jpg","arjun.jpg","neha.jpg","karan.jpg",
            "tina.jpg","vivek.jpg","sara.jpg","rahul.jpg","priya.jpg"]

# Create blank images
for name in students:
    img = Image.new('RGB', (100, 100), color = (255, 255, 255))  # white 100x100 image
    img.save(f"student_images/{name}")

print("10 blank student images created in student_images/ folder")
