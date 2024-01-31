import cv2
import numpy as np
import dlib
import matplotlib.pyplot as plt

img = cv2.imread("grasshopper.jpg")
img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
mask = np.zeros_like(img_gray)

detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")
faces = detector(img_gray)

for face in faces:
    landmarks = predictor(img_gray, face)
    
    landmarks_points = []
    for n in range(0, 68):
        x = landmarks.part(n).x
        y = landmarks.part(n).y
        landmarks_points.append((x, y))
     
        cv2.circle(img, (x, y), 3, (0, 0, 255), -1)
    print(landmarks_points)    
    points = np.array(landmarks_points, np.int32)
    convexhull = cv2.convexHull(points)
    # cv2.polylines(img, [convexhull], True, (255, 0, 0), 3)
    cv2.fillConvexPoly(mask, convexhull, 255)
    cv2.imshow("img",img)
    cv2.waitKey(0)
    face_image_1 = cv2.bitwise_and(img, img, mask=mask)
plt.axis("off")
plt.imshow(cv2.cvtColor(face_image_1, cv2.COLOR_BGR2RGB))
plt.show()    