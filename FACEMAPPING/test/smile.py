import cv2
import mediapipe as mp
#import pyautogui

x1,y1,x2,y2,x3,y3,x4,y4=0,0,0,0,0,0,0,0
face_mesh=mp.solutions.face_mesh.FaceMesh(max_num_faces=2, refine_landmarks=True)
camera = cv2.VideoCapture(0)

while True:
    _,image=camera.read()
    image=cv2.flip(image,1)
    fh,fw,_=image.shape
    rgb_image=cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
    output=face_mesh.process(rgb_image)
    landmark_points=output.multi_face_landmarks
    
    if landmark_points:
        smile1,smile2=True,True
        landmarks1=landmark_points[0].landmark
        for id,landmark in enumerate(landmarks1):
            x=int(landmark.x*fw)
            y=int(landmark.y*fh)
            if id==43:
                x1=x
                y1=y
            if id==287:
                x2=x
                y2=y
        dist1=((x2-x1)**2+(y2-y1)**2)**(0.5)
        if dist1<80:
            smile1=False
        if len(landmark_points)==2:
            landmarks2=landmark_points[1].landmark
            for id,landmark in enumerate(landmarks2):
                x=int(landmark.x*fw)
                y=int(landmark.y*fh)
                if id==43:
                    x3=x
                    y3=y
                if id==287:
                    x4=x
                    y4=y
            dist2=((x4-x3)**2+(y4-y3)**2)**(0.5)
            if dist2<80:
                smile2=False
        print(smile1,smile2)
        if smile1 and smile2:
            print("Smile Detected!!")
            cv2.imwrite("smile.jpg",image)
            cv2.waitKey(2000)
    cv2.imshow("Smile Shutter",image)
    key = cv2.waitKey(100)
    if key==27:
        break
camera.release()
cv2.destroyAllWindows()
