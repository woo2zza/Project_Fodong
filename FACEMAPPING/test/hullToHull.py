import cv2
import mediapipe as mp
import numpy as np
import csv

# 선택된 랜드마크 인덱스
selected_indices = [151, 108, 69, 104, 68, 71, 139, 34, 227, 137, 177, 215, 138, 135, 169, 170, 140, 171, 175, 396, 369, 395, 394, 364, 367, 435, 401, 366, 447, 264, 368, 301, 298, 333, 299, 337]
print("cam:", len(selected_indices))

# CSV 파일에서 랜드마크를 읽는 함수
def load_landmarks(annotation_file):
    try:
        with open(annotation_file) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=",")
            points = []
            for i, row in enumerate(csv_reader):
                # skip header or empty line if it's there
                try:
                    x, y = int(row[1]), int(row[2])
                    points.append((x, y))
                except ValueError:
                    continue
            print("image:", len(points))
            return points
    except FileNotFoundError:
        print(f"The file {annotation_file} was not found.")
        return None

# MediaPipe 얼굴 검출기 초기화
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh()

# 웹캠 초기화
cap = cv2.VideoCapture(0)

# PNG 이미지와 랜드마크 불러오기
png_image = cv2.imread('grasshopper.png')
png_landmarks = load_landmarks('grasshopper2.csv')

# 이전 랜드마크 위치를 저장할 변수 초기화
prev_landmarks = None

# 무게 이동 평균의 가중치 설정
alpha = 0.5

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        continue

    # 좌우 반전
    frame = cv2.flip(frame, 1)

    # MediaPipe를 위한 이미지 처리
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result = face_mesh.process(rgb_frame)

    if result.multi_face_landmarks and png_landmarks:
        for face_landmarks in result.multi_face_landmarks:
            # 웹캠에서 얼굴 랜드마크 검출
            detected_landmarks = np.array([(lm.x, lm.y) for lm in face_landmarks.landmark]) * [frame.shape[1], frame.shape[0]]

            if prev_landmarks is not None:
                # 무게 이동 평균을 사용하여 랜드마크 위치 안정화
                detected_landmarks = (1 - alpha) * detected_landmarks + alpha * prev_landmarks

            # 이전 랜드마크 위치 업데이트
            prev_landmarks = detected_landmarks

            # 선택된 인덱스의 랜드마크만 사용
            selected_landmarks = detected_landmarks[selected_indices]

            # 웹캠의 선택된 랜드마크를 PNG 이미지의 랜드마크에 맞게 변환
            # png_landmarks도 동일한 개수의 랜드마크를 사용해야 합니다.
            M, _ = cv2.findHomography(selected_landmarks, np.array(png_landmarks))
            transformed_face = cv2.warpPerspective(frame, M, (png_image.shape[1], png_image.shape[0]))

            # 마스크 생성 및 적용
            mask = np.zeros(png_image.shape[:2], dtype=np.uint8)
            cv2.fillConvexPoly(mask, np.array(png_landmarks).astype(int), 255)
            inv_mask = cv2.bitwise_not(mask)
            bg = cv2.bitwise_and(png_image, png_image, mask=inv_mask)
            fg = cv2.bitwise_and(transformed_face, transformed_face, mask=mask)
            combined = cv2.add(bg, fg)

            # 결과 이미지 출력
            cv2.imshow('Face Insertion', combined)
            if cv2.waitKey(5) & 0xFF == 27:
                break

cap.release()
cv2.destroyAllWindows()
