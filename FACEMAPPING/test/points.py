import cv2
import numpy as np
import mediapipe as mp
  
# Configuration Face Mesh.
mp_face_mesh = mp.solutions.face_mesh
face_mesh =  mp_face_mesh.FaceMesh(min_detection_confidence=0.5, min_tracking_confidence=0.5)
  
img = cv2.imread('filters/face.jpg', cv2.IMREAD_UNCHANGED)
image = cv2.cvtColor(cv2.flip(img, 1), cv2.COLOR_BGR2RGB)
# To improve performance.
image.flags.writeable = False
results =  face_mesh.process(image)
(results.multi_face_landmarks[0].landmark[205].x * image.shape[1], results.multi_face_landmarks[0].landmark[205].y * image.shape[0])