const fs = require("fs").promises;
const webmToMp4 = require("webm-to-mp4");

async function convertWebMToMP4(inputPath, outputPath) {
  try {
    // WebM 파일을 읽습니다.
    const webmData = await fs.readFile(inputPath);
    // webm-to-mp4를 사용하여 변환합니다.
    const mp4Data = webmToMp4(webmData);
    // 결과 MP4 파일을 저장합니다.
    await fs.writeFile(outputPath, Buffer.from(mp4Data));
    console.log("Conversion successful!");
  } catch (error) {
    console.error("Conversion failed:", error);
  }
}

// 변환 함수 사용 예
const inputPath = "path/to/input/file.webm";
const outputPath = "path/to/output/file.mp4";

convertWebMToMP4(inputPath, outputPath);
