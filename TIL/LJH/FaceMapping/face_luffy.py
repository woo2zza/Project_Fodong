import cv2
import mediapipe as mp

# Mediapipe Face Mesh 인스턴스 생성
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh()

# 카메라 캡처 객체 생성
cap = cv2.VideoCapture(0)  # 0은 기본 카메라

# 이미지 읽기
luffy_img = cv2.imread('luffy.png')  # 이미지 경로에 맞게 수정

# 얼굴 랜드마크를 이미지에 그리는 함수
def draw_landmarks(image, landmarks):
    for landmark in landmarks:
        x, y = int(landmark.x * image.shape[1]), int(landmark.y * image.shape[0])
        cv2.circle(image, (x, y), 2, (0, 255, 0), -1)

while cap.isOpened():
    # 프레임 읽기
    ret, frame = cap.read()
    if not ret:
        print("카메라에서 프레임을 읽을 수 없습니다.")
        break

    # BGR 이미지를 RGB 이미지로 변환
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # 카메라에서 얼굴 랜드마크 추출
    results = face_mesh.process(rgb_frame)
    if results.multi_face_landmarks:
        for face_landmarks in results.multi_face_landmarks:
            draw_landmarks(frame, face_landmarks.landmark)

    # Luffy 이미지에 얼굴 랜드마크 그리기
    rgb_luffy_img = cv2.cvtColor(luffy_img, cv2.COLOR_BGR2RGB)
    luffy_results = face_mesh.process(rgb_luffy_img)
    if luffy_results.multi_face_landmarks:
        for face_landmarks in luffy_results.multi_face_landmarks:
            draw_landmarks(luffy_img, face_landmarks.landmark)

    # 두 이미지의 높이를 맞춤
    min_height = min(frame.shape[0], luffy_img.shape[0])
    frame = frame[:min_height, :]
    luffy_img = luffy_img[:min_height, :]

    # 두 이미지를 가로로 결합
    combined_image = cv2.hconcat([frame, luffy_img])

    # 결과 화면에 표시
    cv2.imshow('Combined Image', combined_image)

    # 종료 키 체크
    if cv2.waitKey(1) & 0xFF == 27:  # 'ESC' 키를 누르면 종료
        break

# 리소스 해제
cap.release()
cv2.destroyAllWindows()
