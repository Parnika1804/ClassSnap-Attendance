import cv2
import os

def capture_faces(student_name, save_dir="data/students"):
    path = os.path.join(save_dir, student_name)
    os.makedirs(path, exist_ok=True)
    
    cap = cv2.VideoCapture(0)
    count = 0
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        cv2.imshow("Capture Faces - Press 'q' to Quit", frame)
        
        k = cv2.waitKey(1)
        if k % 256 == 32:  # SPACE pressed
            img_name = os.path.join(path, f"{student_name}_{count}.jpg")
            cv2.imwrite(img_name, frame)
            print(f"[INFO] Saved {img_name}")
            count += 1
        elif k & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()

# Example usage
if __name__ == "__main__":
    student_name = input("Enter student name: ")
    capture_faces(student_name)
