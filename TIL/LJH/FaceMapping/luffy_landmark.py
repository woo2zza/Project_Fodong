import cv2
import mediapipe as mp

# Mediapipe Face Mesh 인스턴스 생성
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh()

# 이미지 읽기
luffy_img = cv2.imread('luffy.png')  # 이미지 경로에 맞게 수정

# 얼굴 랜드마크를 이미지에 그리는 함수
def draw_landmarks(image, landmarks):
    for landmark in landmarks:
        x, y = int(landmark.x * image.shape[1]), int(landmark.y * image.shape[0])
        cv2.circle(image, (x, y), 2, (0, 255, 0), -1)

# 얼굴 랜드마크 추출 및 이미지에 그리기
while True:
    # BGR 이미지를 RGB 이미지로 변환
    rgb_luffy_img = cv2.cvtColor(luffy_img, cv2.COLOR_BGR2RGB)

    # Face Mesh 적용
    results = face_mesh.process(rgb_luffy_img)

    # Face Mesh 결과 그리기
    if results.multi_face_landmarks:
        for face_landmarks in results.multi_face_landmarks:
            draw_landmarks(luffy_img, face_landmarks.landmark)

    # 이미지 화면에 표시
    cv2.imshow('Image with Landmarks', luffy_img)

    # 종료 키 체크
    if cv2.waitKey(1) & 0xFF == 27:  # 'ESC' 키를 누르면 종료
        break

# 리소스 해제
cv2.destroyAllWindows()
