import cv2
import mediapipe as mp

# Mediapipe Face Mesh 인스턴스 생성
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh()

# 카메라 캡처 객체 생성
cap = cv2.VideoCapture(0)  # 0은 기본 카메라

# 원하는 이미지 읽기
luffy_img = cv2.imread('luffy.png')  # 이미지 경로에 맞게 수정

# 눈, 코, 입에 해당하는 landmark 인덱스 정의
eye_landmarks_indices = list(range(33, 48)) + list(range(263, 280))
# nose_landmarks_indices = list(range(160, 200))
nose_landmarks_indices = list(range(160, 168))  # 코 부분에 해당하는 랜드마크만 추가
mouth_landmarks_indices = list(range(61, 92)) + list(range(291, 322))

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

    # 눈, 코, 입에 해당하는 랜드마크 추출
    eye_landmarks = []
    nose_landmarks = []
    mouth_landmarks = []

    if results.multi_face_landmarks:
        for face_landmarks in results.multi_face_landmarks:
            for i, landmark in enumerate(face_landmarks.landmark):
                if i in eye_landmarks_indices:
                    eye_landmarks.append(landmark)
                elif i in nose_landmarks_indices:
                    nose_landmarks.append(landmark)
                elif i in mouth_landmarks_indices:
                    mouth_landmarks.append(landmark)

    # 랜드마크 그리기 함수
    def draw_landmarks(image, landmarks, color=(0, 255, 0)):
        for landmark in landmarks:
            h, w, c = image.shape
            x, y = int(landmark.x * w), int(landmark.y * h)
            cv2.circle(image, (x, y), 2, color, -1)

    # 랜드마크 그리기
    draw_landmarks(frame, eye_landmarks)
    draw_landmarks(frame, nose_landmarks, color=(20, 0, 0))
    draw_landmarks(frame, mouth_landmarks, color=(0, 0, 255))

    # 원하는 이미지를 프레임에 추가
    # luffy_height, luffy_width, _ = luffy_img.shape
    # frame[0:luffy_height, 0:luffy_width] = luffy_img

    # 결과 화면에 표시
    cv2.imshow('Face Mesh with Landmarks', frame)

    # 종료 키 체크
    if cv2.waitKey(1) & 0xFF == 27:  # 'ESC' 키를 누르면 종료
        break

# 리소스 해제
cap.release()
cv2.destroyAllWindows()
