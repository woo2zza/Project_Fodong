import cv2
#import matplotlib.pyplot as plt
import mediapipe
import pandas as pd

img=cv2.imread("./1.jpg")
cv2.imshow("image",img)
if img is not None:
    cv2.imshow("image",img)
    mp_face_mesh=mediapipe.solutions.face_mesh
    face_mesh=mp_face_mesh.FaceMesh(static_image_mode=True)

    results=face_mesh.process(img[:,:,::-1])
    landmarks=results.multi_face_landmarks[0]
    print(landmarks)
    face_oval=mp_face_mesh.FACEMESH_FACE_OVAL
    df=pd.DataFrame(list(face_oval),columns=["p1","p2"])
    print(df.head())
    print(df.shape)
    cv2.waitKey(0)
    
    cv2.destroyAllWindows()

    
else:
    print("Error: No Camera!!!!")