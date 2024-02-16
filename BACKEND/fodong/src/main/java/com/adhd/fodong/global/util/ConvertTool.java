package com.adhd.fodong.global.util;

public class ConvertTool {
    public String convertToJpg(String path) {
        // 경로 확장자를 .jpg 로 바꿔주는 메서드
        int lastDotIndex = path.lastIndexOf('.');

        // '.'이 포함되어 있을 경우, 해당 위치 이전의 문자열을 가져오고 'jpg'를 추가
        if (lastDotIndex != -1) {
            String newPath = path.substring(0, lastDotIndex) + ".jpg";
            return newPath;
        } else {
            throw new RuntimeException(" 변환 불가 : . 없음 ");
        }
    }
}
