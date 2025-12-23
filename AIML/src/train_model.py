import face_recognition
import os
import pickle

DATA_DIR = "data/students"
MODEL_PATH = "models/encodings.pkl"

known_encodings = []
known_names = []

for student_name in os.listdir(DATA_DIR):
    student_folder = os.path.join(DATA_DIR, student_name)
    if not os.path.isdir(student_folder):
        continue
    
    for img_file in os.listdir(student_folder):
        img_path = os.path.join(student_folder, img_file)
        image = face_recognition.load_image_file(img_path)
        encodings = face_recognition.face_encodings(image)
        if len(encodings) > 0:
            known_encodings.append(encodings[0])
            known_names.append(student_name)

# Save encodings
os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
with open(MODEL_PATH, "wb") as f:
    pickle.dump({"encodings": known_encodings, "names": known_names}, f)

print("[INFO] Training complete and encodings saved!")
