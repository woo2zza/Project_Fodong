import cv2
import mediapipe as mp
import numpy as np

# FaceMesh 객체를 초기화합니다.
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh()

# Function to get face landmarks using Mediapipe Face Mesh
def get_face_landmarks(image, face_mesh):
    results = face_mesh.process(image)
    landmarks = results.multi_face_landmarks
    return landmarks

# Function to get convex hull and minimum bounding rectangle with smoothing
def get_convex_hull_min_rect(image, landmarks, history, num_frames=5, smoothing_factor=0.5):
    frame_with_landmarks = image.copy()

    if landmarks:
        for face_landmarks in landmarks:
            # Convert face landmarks coordinates to NumPy array
            landmarks_array = np.array([(lm.x * image.shape[1], lm.y * image.shape[0]) for lm in face_landmarks.landmark], dtype=np.int32)

            # Convex hull
            hull = cv2.convexHull(landmarks_array, returnPoints=True)

            # Draw convex hull
            cv2.drawContours(frame_with_landmarks, [hull], 0, (255, 0, 255), 2)

            # Calculate the bounding box of the convex hull
            x, y, w, h = cv2.boundingRect(hull)

            # Create a rectangle from the bounding box
            rect = np.array([[x, y], [x+w, y], [x+w, y+h], [x, y+h]], dtype=np.int32)

            # Calculate smoothed bounding box
            smoothed_rect = np.mean(np.array(history[-num_frames:] + [rect]), axis=0, dtype=np.int32)
            
            # Update history
            history.append(smoothed_rect)

            # Draw the rectangle on the image
            cv2.polylines(frame_with_landmarks, [smoothed_rect], isClosed=True, color=(0, 255, 0), thickness=2)

    return frame_with_landmarks, history


# Initialize video capture
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Camera could not be opened.")
else:
    # Bounding box history
    bounding_box_history = []

    while cap.isOpened():
        ret, frame = cap.read()

        if not ret:
            print("Error: Frame could not be read.")
            break

        # Get face landmarks
        landmarks = get_face_landmarks(frame, face_mesh)

        # Check if landmarks are detected
        if landmarks:
            # Get frame with convex hull and smoothed bounding box
            frame_with_convex_hull_rect, bounding_box_history = get_convex_hull_min_rect(frame, landmarks, bounding_box_history)
            # Show the frame with annotations
            cv2.imshow('Real-time Face Detection with Convex Hull and Min Rect (Face Mesh)', frame_with_convex_hull_rect)
        else:
            # Show the frame without annotations if no face is detected
            cv2.imshow('Real-time Face Detection with Convex Hull and Min Rect (Face Mesh)', frame)

        if cv2.waitKey(1) & 0xFF == 27:  # Press 'ESC' to exit
            break

    cap.release()
    cv2.destroyAllWindows()
