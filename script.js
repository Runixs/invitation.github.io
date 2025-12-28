// 결혼식 날짜 설정
const weddingDate = new Date('2025-05-24T14:00:00');

// 디데이 카운터
function updateCountdown() {
    const now = new Date();
    const timeLeft = weddingDate - now;

    if (timeLeft < 0) {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// 1초마다 카운터 업데이트
setInterval(updateCountdown, 1000);
updateCountdown();

// 계좌번호 복사
function copyAccount(accountNumber) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(accountNumber).then(() => {
            alert('계좌번호가 복사되었습니다.\n' + accountNumber);
        }).catch(err => {
            console.error('복사 실패:', err);
            fallbackCopyAccount(accountNumber);
        });
    } else {
        fallbackCopyAccount(accountNumber);
    }
}

// 계좌번호 복사 대체 방법
function fallbackCopyAccount(accountNumber) {
    const textArea = document.createElement('textarea');
    textArea.value = accountNumber;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        alert('계좌번호가 복사되었습니다.\n' + accountNumber);
    } catch (err) {
        console.error('복사 실패:', err);
        alert('계좌번호: ' + accountNumber);
    }

    document.body.removeChild(textArea);
}

// 방명록 저장 (로컬 스토리지 사용)
let messages = [];

// 페이지 로드 시 저장된 메시지 불러오기
function loadMessages() {
    const savedMessages = localStorage.getItem('weddingMessages');
    if (savedMessages) {
        messages = JSON.parse(savedMessages);
        displayMessages();
    }
}

// 메시지 표시
function displayMessages() {
    const messageList = document.getElementById('messageList');
    messageList.innerHTML = '';

    // 최신 메시지부터 표시
    messages.slice().reverse().forEach((message, index) => {
        const messageItem = document.createElement('div');
        messageItem.className = 'message-item';
        messageItem.innerHTML = `
            <div class="message-header">
                <span class="message-author">${escapeHtml(message.name)}</span>
                <span class="message-date">${message.date}</span>
            </div>
            <div class="message-content">${escapeHtml(message.message)}</div>
        `;
        messageList.appendChild(messageItem);
    });
}

// HTML 이스케이프 (XSS 방지)
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 메시지 제출
function submitMessage() {
    const nameInput = document.getElementById('guestName');
    const messageInput = document.getElementById('guestMessage');

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name) {
        alert('이름을 입력해주세요.');
        nameInput.focus();
        return;
    }

    if (!message) {
        alert('메시지를 입력해주세요.');
        messageInput.focus();
        return;
    }

    // 메시지 객체 생성
    const newMessage = {
        name: name,
        message: message,
        date: new Date().toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })
    };

    // 메시지 추가 및 저장
    messages.push(newMessage);
    localStorage.setItem('weddingMessages', JSON.stringify(messages));

    // 입력 필드 초기화
    nameInput.value = '';
    messageInput.value = '';

    // 메시지 목록 갱신
    displayMessages();

    // 성공 메시지
    alert('축하 메시지가 등록되었습니다. 감사합니다!');
}

// 카카오톡 공유
function shareKakao() {
    // 카카오톡 공유 기능은 Kakao SDK 설정이 필요합니다
    // 실제 사용 시 https://developers.kakao.com 에서 앱 키를 발급받아야 합니다
    alert('카카오톡 공유 기능은 Kakao SDK 설정이 필요합니다.\n개발자 도구에서 Kakao API 키를 설정해주세요.');

    // 실제 구현 예시:
    /*
    if (typeof Kakao !== 'undefined' && Kakao.isInitialized()) {
        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: '민수 ♥ 지영 결혼합니다',
                description: '2025년 5월 24일 토요일 오후 2시',
                imageUrl: 'YOUR_IMAGE_URL',
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href
                }
            },
            buttons: [
                {
                    title: '청첩장 보기',
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href
                    }
                }
            ]
        });
    }
    */
}

// URL 복사
function shareURL() {
    const url = window.location.href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            alert('링크가 복사되었습니다!\n친구들에게 공유해보세요.');
        }).catch(err => {
            console.error('복사 실패:', err);
            fallbackShareURL(url);
        });
    } else {
        fallbackShareURL(url);
    }
}

// URL 복사 대체 방법
function fallbackShareURL(url) {
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        alert('링크가 복사되었습니다!\n친구들에게 공유해보세요.');
    } catch (err) {
        console.error('복사 실패:', err);
        prompt('이 링크를 복사하세요:', url);
    }

    document.body.removeChild(textArea);
}

// 갤러리 이미지 클릭 시 확대 보기
document.addEventListener('DOMContentLoaded', function() {
    loadMessages();

    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img && img.src) {
                // 간단한 이미지 확대 (실제로는 라이트박스 라이브러리 사용 권장)
                window.open(img.src, '_blank');
            }
        });
    });

    // 스크롤 애니메이션
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
});

// Enter 키로 메시지 제출 (Shift+Enter는 줄바꿈)
document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('guestMessage');
    if (messageInput) {
        messageInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitMessage();
            }
        });
    }
});
