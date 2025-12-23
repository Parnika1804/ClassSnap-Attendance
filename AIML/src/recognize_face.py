import cv2
import face_recognition
import pickle

MODEL_PATH = "models/encodings.pkl"
TEST_IMAGE = "data/test_images/class_photo.jpg"

# Load encodings
with open(MODEL_PATH, "rb") as f:
    data = pickle.load(f)

image = cv2.imread(TEST_IMAGE)
rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

boxes = face_recognition.face_locations(rgb)
encodings = face_recognition.face_encodings(rgb, boxes)

for encoding, box in zip(encodings, boxes):
    matches = face_recognition.compare_faces(data["encodings"], encoding)
    name = "Unknown"
    
    if True in matches:
        match_index = matches.index(True)
        name = data["names"][match_index]
    
    top, right, bottom, left = box
    cv2.rectangle(image, (left, top), (right, bottom), (0,255,0), 2)
    cv2.putText(image, name, (left, top-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0,255,0), 2)

cv2.imshow("Result", image)
cv2.waitKey(0)
cv2.destroyAllWindows()
