import cv2
import numpy as np

# 배경 이미지 불러오기
background = cv2.imread('grasshopper.png')

# 웹캠 캡처 시작
cap = cv2.VideoCapture(0)

# Haar Cascade 얼굴 검출기 로드
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# 사각형 영역 정의 (x, y, width, height)
rect_x, rect_y, rect_w, rect_h = 400, 250, 350, 350  # x를 400으로 수정

# 평활화를 위한 변수 초기화
alpha = 0.2  # 평활화 파라미터 (0~1 사이의 값)
last_x, last_y, last_w, last_h = rect_x, rect_y, rect_w, rect_h

while True:
    # 웹캠에서 이미지 읽기
    ret, frame = cap.read()
    if not ret:
        break

    # 그레이스케일 이미지로 변환 (얼굴 검출 성능 향상)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # 얼굴 검출
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)

    # 배경 이미지의 복사본을 만듭니다.
    result = background.copy()

    if len(faces) > 0:
        # 첫 번째 검출된 얼굴 사용 (여러 얼굴 중 하나만 사용)
        x, y, w, h = faces[0]

        # 평활화 적용 (EWMA)
        x = int(alpha * x + (1 - alpha) * last_x)
        y = int(alpha * y + (1 - alpha) * last_y)
        w = int(alpha * w + (1 - alpha) * last_w)
        h = int(alpha * h + (1 - alpha) * last_h)

        # 현재 얼굴 위치 및 크기 업데이트
        last_x, last_y, last_w, last_h = x, y, w, h
    else:
        # 얼굴이 검출되지 않은 경우 마지막 위치 사용
        x, y, w, h = last_x, last_y, last_w, last_h

    for (x, y, w, h) in faces:
        # 얼굴 이미지 추출
        face_img = frame[y:y+h, x:x+w]

        # 얼굴 이미지의 비율 계산
        face_ratio = h / w
        rect_ratio = rect_h / rect_w

        # 사각형 영역에 맞게 얼굴 이미지 조절
        if face_ratio > rect_ratio:
            # 얼굴 이미지의 높이를 사각형 영역에 맞추고, 너비를 조절
            new_h = rect_h
            new_w = int(new_h / face_ratio)
        else:
            # 얼굴 이미지의 너비를 사각형 영역에 맞추고, 높이를 조절
            new_w = rect_w
            new_h = int(new_w * face_ratio)

        # 얼굴 이미지 크기 조절
        face_resized = cv2.resize(face_img, (new_w, new_h))

        # 원형 마스크 생성
        mask = np.zeros((new_h, new_w), dtype=np.uint8)
        center = (new_w // 2, new_h // 2)
        radius = min(center[0], center[1], new_w - center[0], new_h - center[1])
        cv2.circle(mask, center, radius, 255, -1)

        # 가장자리 부드럽게 처리
        mask = cv2.GaussianBlur(mask, (21, 21), 11)

        # 마스크 적용
        face_rounded = cv2.bitwise_and(face_resized, face_resized, mask=mask)

        # 사각형 영역에 얼굴 이미지 합성
        x_offset = rect_x + (rect_w - new_w) // 2
        y_offset = rect_y + (rect_h - new_h) // 2

        # 결과 이미지의 해당 부분에 얼굴 이미지 덮어쓰기
        for c in range(0, 3):
            result[y_offset:y_offset+new_h, x_offset:x_offset+new_w, c] = face_rounded[:, :, c] * (mask / 255) + \
            result[y_offset:y_offset+new_h, x_offset:x_offset+new_w, c] * (1 - (mask / 255))

    # 결과 이미지 출력
    cv2.imshow('Face in Rectangle', result)

    # ESC 키를 누르면 종료
    if cv2.waitKey(1) == 27:
        break

# 캡처 종료
cap.release()
cv2.destroyAllWindows()
