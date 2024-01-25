import cv2
import mediapipe as mp

# Mediapipe Face Mesh 인스턴스 생성
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh()

# 카메라 캡처 객체 생성
cap = cv2.VideoCapture(0)  # 0은 기본 카메라

# 눈에 해당하는 landmark 인덱스 정의
# eye_landmarks_indices = list(range(33, 48)) + list(range(263, 280)) # green
eye_landmarks_indices = list(range(141,151))# green
# 오른쪽 눈 : 7 | 22~30 | 31,33,35 | 56 | 110, 112,130,133 | 144,145
# 오른쪽 눈썹 : 71,70,46,53,52,55,65
# 입 가운데 : 11~18 | 입 오른쪽 위 :37.39.40/41~43/57/72~74,76~78,80 | 81~90,146

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


    if results.multi_face_landmarks:
        for face_landmarks in results.multi_face_landmarks:
            for i, landmark in enumerate(face_landmarks.landmark):
                if i in eye_landmarks_indices:
                    eye_landmarks.append(landmark)
                    # 랜드마크 인덱스 화면에 표시
                    x, y = int(landmark.x * frame.shape[1]), int(landmark.y * frame.shape[0])
                    cv2.putText(frame, str(i), (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)
               
    # 랜드마크 그리기 함수
    def draw_landmarks(image, landmarks, color=(0, 255, 0)):
        for landmark in landmarks:
            h, w, c = image.shape
            x, y = int(landmark.x * w), int(landmark.y * h)
            cv2.circle(image, (x, y), 2, color, -1)

    # 랜드마크 그리기 (bgr)
    draw_landmarks(frame, eye_landmarks)

    # 결과 화면에 표시
    cv2.imshow('Face Mesh with Landmarks', frame)

    # 종료 키 체크
    if cv2.waitKey(1) & 0xFF == 27:  # 'ESC' 키를 누르면 종료
        break

# 리소스 해제
cap.release()
cv2.destroyAllWindows()
