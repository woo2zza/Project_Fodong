import cv2
import numpy as np
import csv

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
            return points
    except FileNotFoundError:
        print(f"The file {annotation_file} was not found.")
        return None

def get_convex_hull(image, landmarks):
    """Draws convex hull on the image based on the given landmarks."""
    landmarks_array = np.array(landmarks, dtype=np.int32)
    
    # Convex Hull 계산
    hull = cv2.convexHull(landmarks_array, returnPoints=True)

    # Convex Hull을 이미지에 그리기
    HULL_COLOR = (255, 0, 255) # Magenta
    cv2.drawContours(image, [hull], 0, HULL_COLOR, 2)

    return image

# 특정 이미지와 해당 이미지의 랜드마크 정보가 담긴 CSV 파일 경로
image_path = 'bear.png'
csv_path = 'bear.csv'

# 랜드마크 정보 읽어오기
landmarks_data = load_landmarks(csv_path)

if landmarks_data is not None:
    # 이미지 로드
    image = cv2.imread(image_path)
    if image is not None:
        # Convex Hull 그린 이미지 얻기
        result_image = get_convex_hull(image.copy(), landmarks_data)

        # 결과 이미지 보여주기
        cv2.imshow('Image with Convex Hull and Landmarks', result_image)
        cv2.waitKey(0)
        cv2.destroyAllWindows()
    else:
        print(f"Error: Image {image_path} could not be read.")
else:
    print("Landmarks could not be loaded.")
