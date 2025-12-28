# 💍 웨딩 청첩장 웹사이트

GitHub Pages를 활용한 모바일 최적화 웨딩 청첩장입니다.

## 🎨 데모

이 청첩장에는 다음 기능들이 포함되어 있습니다:

- ✨ 우아한 디자인과 애니메이션
- 📱 모바일/태블릿/PC 반응형 지원
- ⏰ 실시간 디데이 카운터
- 🖼️ 사진 갤러리
- 📍 지도 및 오시는 길 안내
- 💰 축의금 계좌번호 (복사 기능)
- 📞 신랑/신부 연락처
- 💌 방명록 (로컬 저장)
- 🔗 카카오톡/링크 공유

## 🚀 GitHub Pages로 배포하기

### 1. Repository 설정

1. 이 저장소의 Settings로 이동
2. 왼쪽 메뉴에서 "Pages" 선택
3. Source에서 **main** 브랜치 선택
4. 루트(/) 디렉토리 선택
5. Save 클릭

### 2. 배포 완료

몇 분 후 `https://[username].github.io/[repository-name]/` 에서 확인 가능합니다.

## ✏️ 커스터마이징 가이드

### 📝 기본 정보 수정

**index.html** 파일을 열고 다음 정보를 수정하세요:

#### 1. 신랑/신부 이름
```html
<!-- 15-20번째 줄 근처 -->
<span class="groom-name">민수</span>
<span class="bride-name">지영</span>
```

#### 2. 결혼식 날짜 및 장소
```html
<!-- 45-58번째 줄 근처 -->
<span class="info-value">2025년 5월 24일 토요일</span>
<span class="info-value">오후 2시</span>
<span class="info-value">서울 웨딩홀 3층 그랜드볼룸</span>
<span class="info-value">서울특별시 강남구 테헤란로 123</span>
```

#### 3. 혼주 정보
```html
<!-- 37-43번째 줄 근처 -->
<span class="parent-title">김태호 · 박미정</span>
<span class="person-name">민수</span>

<span class="parent-title">이준호 · 최수진</span>
<span class="person-name">지영</span>
```

#### 4. 계좌번호
```html
<!-- 155-190번째 줄 근처 -->
<!-- 신랑측 -->
<span class="holder-name">신랑 김민수</span>
<button class="copy-btn" onclick="copyAccount('1002-123-456789')">복사</button>
<div class="account-number">우리은행 1002-123-456789</div>

<!-- 신부측 -->
<span class="holder-name">신부 이지영</span>
<button class="copy-btn" onclick="copyAccount('3333-12-3456789')">복사</button>
<div class="account-number">카카오뱅크 3333-12-3456789</div>
```

#### 5. 연락처
```html
<!-- 210-220번째 줄 근처 -->
<a href="tel:010-1234-5678" class="contact-btn">📞 전화</a>
<a href="sms:010-1234-5678" class="contact-btn">💬 문자</a>

<a href="tel:010-8765-4321" class="contact-btn">📞 전화</a>
<a href="sms:010-8765-4321" class="contact-btn">💬 문자</a>
```

### 🖼️ 사진 추가하기

1. `images/` 폴더에 다음 파일들을 추가하세요:
   - `main-photo.jpg` - 메인 대표 사진
   - `photo1.jpg ~ photo6.jpg` - 갤러리 사진들

2. 이미지 권장 사항:
   - 메인 사진: 1200px × 800px 이상
   - 갤러리: 800px × 800px (정사각형)
   - 용량: 각 1MB 이하

### 🎨 색상 테마 변경

**styles.css** 파일 상단의 색상 변수를 수정하세요:

```css
:root {
    --primary-color: #d4a574;      /* 메인 강조 색상 */
    --secondary-color: #8b7355;    /* 보조 색상 */
    --text-dark: #333;             /* 진한 텍스트 */
    --text-light: #666;            /* 연한 텍스트 */
    --background-light: #faf8f5;   /* 배경색 */
}
```

### 📅 디데이 날짜 수정

**script.js** 파일 상단의 날짜를 수정하세요:

```javascript
const weddingDate = new Date('2025-05-24T14:00:00');
```

### 🗺️ 지도 추가 (선택사항)

카카오맵 또는 네이버 지도 API를 사용하려면:

1. [카카오맵 API](https://apis.map.kakao.com/) 또는 [네이버 지도 API](https://www.ncloud.com/product/applicationService/maps) 키 발급
2. `index.html`의 지도 섹션에 API 코드 추가
3. 현재는 placeholder로 표시됨

## 📋 파일 구조

```
invitation/
├── index.html          # 메인 HTML 파일
├── styles.css          # 스타일시트
├── script.js           # JavaScript 기능
├── images/             # 이미지 폴더
│   ├── README.md      # 이미지 가이드
│   ├── main-photo.jpg # 메인 사진 (추가 필요)
│   └── photo1-6.jpg   # 갤러리 사진 (추가 필요)
└── README.md          # 이 파일
```

## 🔧 추가 커스터마이징

### 폰트 변경

Google Fonts를 사용 중입니다. 다른 폰트로 변경하려면:

1. [Google Fonts](https://fonts.google.com/)에서 원하는 폰트 선택
2. `index.html`의 `<link>` 태그 교체
3. `styles.css`의 `font-family` 수정

### 섹션 추가/제거

`index.html`에서 원하는 `<section>` 태그를 추가하거나 삭제하세요.

### 카카오톡 공유 설정

1. [Kakao Developers](https://developers.kakao.com/)에서 앱 생성
2. JavaScript 키 발급
3. `index.html`에 SDK 추가:
```html
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
```
4. `script.js`의 `shareKakao()` 함수 주석 해제 및 수정

## 💡 팁

- **모바일 테스트**: 브라우저 개발자 도구(F12)의 모바일 뷰로 확인
- **이미지 최적화**: [TinyPNG](https://tinypng.com/)로 압축하여 로딩 속도 개선
- **맞춤 도메인**: GitHub Pages 설정에서 custom domain 추가 가능

## 🐛 문제 해결

### 이미지가 안 보여요
- 파일명이 정확한지 확인 (대소문자 구분)
- 이미지 경로가 `images/` 폴더인지 확인
- GitHub에 이미지가 업로드되었는지 확인

### 색상이 이상해요
- 브라우저 캐시 삭제 후 새로고침 (Ctrl + F5)
- `styles.css` 파일이 제대로 로드되는지 확인

### 카운터가 작동하지 않아요
- `script.js`의 날짜 형식이 올바른지 확인
- 브라우저 콘솔(F12)에서 에러 확인

## 📞 지원

문제가 있거나 질문이 있으시면 GitHub Issues를 이용해주세요.

---

**Made with ❤️ for your special day**
