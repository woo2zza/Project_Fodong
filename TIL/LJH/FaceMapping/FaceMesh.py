import cv2
import mediapipe as mp

# Mediapipe Face Mesh 인스턴스 생성
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh()

# 카메라 캡처 객체 생성
cap = cv2.VideoCapture(0)  # 0은 기본 카메라

# 원하는 이미지 읽기
luffy_img = cv2.imread('luffy.png')  # 이미지 경로에 맞게 수정

while cap.isOpened():
    # 프레임 읽기
    ret, frame = cap.read()
    if not ret:
        print("카메라에서 프레임을 읽을 수 없습니다.")
        break

    # BGR 이미지를 RGB 이미지로 변환
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Face Mesh 적용
    results = face_mesh.process(rgb_frame)

    # Face Mesh 결과 그리기
    if results.multi_face_landmarks:
        for face_landmarks in results.multi_face_landmarks:
            for landmark in face_landmarks.landmark:
                h, w, c = frame.shape
                x, y = int(landmark.x * w), int(landmark.y * h)
                cv2.circle(frame, (x, y), 2, (0, 255, 0), -1)

    # 원하는 이미지를 프레임에 추가
    luffy_height, luffy_width, _ = luffy_img.shape
    frame[0:luffy_height, 0:luffy_width] = luffy_img

    # 결과 화면에 표시
    cv2.imshow('Face Mesh', frame)

    # 종료 키 체크
    if cv2.waitKey(1) & 0xFF == 27:  # 'ESC' 키를 누르면 종료
        break

# 리소스 해제
cap.release()
cv2.destroyAllWindows()
