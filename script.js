const RSVP_ENDPOINT = "";
const MIN_SUBMIT_MS = 1500;
const EVENT_DATE_KST = "2026-07-11T12:00:00+09:00";
const DEST_NAME = "메리빌리아 더프레스티지 수원 2층 가든홀";
const DEST_ADDRESS = "경기도 수원시 권선구 세화로 116";
const DEST_LAT = 37.264573;
const DEST_LNG = 127.00184;

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=320&q=80",
    alt: "갤러리 사진 1",
  },
  {
    src: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=320&q=80",
    alt: "갤러리 사진 2",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=320&q=80",
    alt: "갤러리 사진 3",
  },
  {
    src: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=320&q=80",
    alt: "갤러리 사진 4",
  },
];

let activeGalleryIndex = 0;

const $ = (id) => document.getElementById(id);

function setFeedback(element, message, type = "") {
  element.textContent = message;
  element.classList.remove("success", "error");
  if (type) {
    element.classList.add(type);
  }
}

function initReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach((el) => {
      el.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  targets.forEach((el) => {
    observer.observe(el);
  });
}

function validateRSVP(formData) {
  const name = (formData.get("name") || "").toString().trim();
  const attendance = formData.get("attendance");
  const guestCount = Number(formData.get("guestCount"));
  const message = (formData.get("message") || "").toString();
  const honeypot = (formData.get("honeypot") || "").toString().trim();
  const openedAt = Number(formData.get("formOpenedAt"));

  if (!name) {
    return { ok: false, message: "성함을 입력해 주세요." };
  }
  if (!attendance || (attendance !== "yes" && attendance !== "no")) {
    return { ok: false, message: "참석 여부를 선택해 주세요." };
  }
  if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 10) {
    return { ok: false, message: "인원은 1명 이상 10명 이하로 입력해 주세요." };
  }
  if (message.length > 300) {
    return { ok: false, message: "메시지는 300자 이내로 작성해 주세요." };
  }
  if (honeypot) {
    return { ok: false, message: "잘못된 요청입니다." };
  }
  if (!openedAt || Date.now() - openedAt < MIN_SUBMIT_MS) {
    return { ok: false, message: "입력 후 잠시 뒤 제출해 주세요." };
  }

  return { ok: true };
}

function makePayload(formData) {
  return {
    name: formData.get("name").toString().trim(),
    attendance: formData.get("attendance"),
    guestCount: Number(formData.get("guestCount")),
    meal: (formData.get("meal") || "").toString(),
    message: (formData.get("message") || "").toString().trim(),
    submittedAt: new Date().toISOString(),
    locale: navigator.language || "ko-KR",
    honeypot: "",
  };
}

async function submitRSVP(payload) {
  if (!RSVP_ENDPOINT) {
    throw new Error("RSVP endpoint is not configured");
  }

  const response = await fetch(RSVP_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const result = await response.json().catch(() => ({ success: true }));
  if (result.success === false) {
    throw new Error(result.message || "Submission failed");
  }
}

function initAddressCopy() {
  const button = $("copy-address");
  const feedback = $("address-feedback");
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(DEST_ADDRESS);
      setFeedback(feedback, "주소가 복사되었습니다.", "success");
    } catch {
      setFeedback(feedback, "복사에 실패했습니다. 수동으로 복사해 주세요.", "error");
    }
  });
}

function buildCalendarLinks() {
  const startDate = new Date(EVENT_DATE_KST);
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

  const toUtcCompact = (date) =>
    date.toISOString().replaceAll("-", "").replaceAll(":", "").replace(".000", "");

  const title = "김태완 & 우지현 결혼식";
  const details = `${DEST_NAME}에서 뵙겠습니다.`;
  const start = toUtcCompact(startDate);
  const end = toUtcCompact(endDate);

  const googleUrl = new URL("https://calendar.google.com/calendar/render");
  googleUrl.searchParams.set("action", "TEMPLATE");
  googleUrl.searchParams.set("text", title);
  googleUrl.searchParams.set("dates", `${start}/${end}`);
  googleUrl.searchParams.set("details", details);
  googleUrl.searchParams.set("location", DEST_ADDRESS);

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//KR",
    "BEGIN:VEVENT",
    "UID:wedding-invitation-20260711@example.com",
    `DTSTAMP:${toUtcCompact(new Date())}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${details}`,
    `LOCATION:${DEST_ADDRESS}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  $("google-calendar").href = googleUrl.toString();
  const icalLink = $("ical-download");
  icalLink.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
}

function initDDay() {
  const target = $("d-day");
  const now = new Date();
  const event = new Date(EVENT_DATE_KST);
  const days = Math.ceil((event.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (days > 0) {
    target.textContent = `D-${days} days`;
    return;
  }
  if (days === 0) {
    target.textContent = "D-day today!";
    return;
  }
  target.textContent = `D+${Math.abs(days)} days`;
}

function initMapLinks() {
  const encodedName = encodeURIComponent(DEST_NAME);
  const encodedAddress = encodeURIComponent(DEST_ADDRESS);
  const appName = encodeURIComponent(window.location.origin);

  $("naver-map-link").href = `https://map.naver.com/v5/search/${encodedAddress}`;
  $("kakao-map-link").href = `https://map.kakao.com/link/search/${encodedAddress}`;
  $("google-map-link").href = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  $("naver-navi-link").href = `nmap://navigation?dlat=${DEST_LAT}&dlng=${DEST_LNG}&dname=${encodedName}&appname=${appName}`;
  $("tmap-navi-link").href = `tmap://route?rGoName=${encodedName}&rGoX=${DEST_LNG}&rGoY=${DEST_LAT}`;
}

function setupSimpleToggle(buttonId, panelId) {
  const toggle = $(buttonId);
  const panel = $(panelId);
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    panel.hidden = expanded;
  });
}

function initShare() {
  const shareBtn = $("share-link");
  const copyBtn = $("copy-link");
  const feedback = $("share-feedback");

  const shareData = {
    title: "김태완 & 우지현 결혼식",
    text: "모바일 청첩장으로 초대드립니다.",
    url: window.location.href,
  };

  shareBtn.addEventListener("click", async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setFeedback(feedback, "공유가 완료되었습니다.", "success");
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setFeedback(feedback, "공유 중 문제가 발생했습니다.", "error");
        }
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setFeedback(feedback, "링크가 복사되었습니다.", "success");
    } catch {
      setFeedback(feedback, "링크 복사에 실패했습니다.", "error");
    }
  });

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setFeedback(feedback, "링크가 복사되었습니다.", "success");
    } catch {
      setFeedback(feedback, "링크 복사에 실패했습니다.", "error");
    }
  });
}

function initMusicControl() {
  const audio = $("bgm");
  const button = $("music-toggle");
  const barButton = $("bar-sound");
  const barIcon = $("bar-sound-icon");
  const barText = $("bar-sound-text");

  const syncState = (isPlaying) => {
    button.textContent = isPlaying ? "음악 정지" : "음악 재생";
    button.setAttribute("aria-pressed", String(isPlaying));
    if (barButton && barIcon && barText) {
      barButton.setAttribute("aria-pressed", String(isPlaying));
      barButton.setAttribute("aria-label", isPlaying ? "사운드 끄기" : "사운드 켜기");
      barIcon.textContent = isPlaying ? "🔊" : "🔇";
      barText.textContent = isPlaying ? "Sound On" : "Sound Off";
    }
  };

  const toggleAudio = async () => {
    if (audio.paused) {
      try {
        await audio.play();
        syncState(true);
      } catch {
        button.textContent = "재생 실패 - 다시 시도";
      }
      return;
    }

    audio.pause();
    syncState(false);
  };

  button.addEventListener("click", toggleAudio);
  barButton?.addEventListener("click", toggleAudio);
  syncState(false);
}

function initBottomControls() {
  const menuButton = $("bar-menu");
  const menuPanel = $("bottom-menu-panel");
  const menuIcon = $("bar-menu-icon");
  const menuLinks = document.querySelectorAll(".menu-link");
  const barLink = $("bar-link");

  const shareSheet = $("share-sheet");
  const shareClose = $("share-sheet-close");
  const kakaoButton = $("share-kakao");
  const copyButton = $("share-copy");
  const qrButton = $("share-qr");

  const copyAlert = $("copy-alert");
  const qrSheet = $("qr-sheet");
  const qrClose = $("qr-close");
  const qrDownload = $("qr-download");
  const qrImage = $("qr-image");

  const qrFallbackUrl = `https://api.qrserver.com/v1/create-qr-code/?size=480x480&data=${encodeURIComponent(window.location.href)}`;
  qrImage?.addEventListener("error", () => {
    qrImage.src = qrFallbackUrl;
    if (qrDownload) {
      qrDownload.href = qrFallbackUrl;
      qrDownload.removeAttribute("download");
    }
  });

  const openMenu = () => {
    menuPanel.classList.add("open");
    menuPanel.setAttribute("aria-hidden", "false");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "메뉴 닫기");
    menuIcon.textContent = "✕";
  };

  const closeMenu = () => {
    menuPanel.classList.remove("open");
    menuPanel.setAttribute("aria-hidden", "true");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "메뉴 열기");
    menuIcon.textContent = "☰";
  };

  menuButton?.addEventListener("click", () => {
    if (menuPanel.classList.contains("open")) {
      closeMenu();
      return;
    }
    openMenu();
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  const openShareSheet = () => {
    shareSheet.hidden = false;
  };

  const closeShareSheet = () => {
    shareSheet.hidden = true;
  };

  barLink?.addEventListener("click", openShareSheet);
  shareClose?.addEventListener("click", closeShareSheet);
  shareSheet?.addEventListener("click", (event) => {
    if (event.target === shareSheet) {
      closeShareSheet();
    }
  });

  kakaoButton?.addEventListener("click", () => {
    const targetUrl = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("모바일 청첩장 링크를 확인해 주세요");
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile && navigator.share) {
      navigator
        .share({ title: "김태완 ♥ 우지현 결혼식", text: "모바일 청첩장 링크를 확인해 주세요", url: window.location.href })
        .catch(() => {});
      return;
    }
    window.open(`https://story.kakao.com/s/share?url=${targetUrl}&text=${text}`, "_blank", "noopener,noreferrer");
  });

  copyButton?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      const input = document.createElement("input");
      input.value = window.location.href;
      document.body.append(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }

    closeShareSheet();
    copyAlert.hidden = false;
  });

  copyAlert?.addEventListener("click", () => {
    copyAlert.hidden = true;
  });

  qrButton?.addEventListener("click", () => {
    closeShareSheet();
    qrSheet.hidden = false;
  });

  qrClose?.addEventListener("click", () => {
    qrSheet.hidden = true;
  });

  qrSheet?.addEventListener("click", (event) => {
    if (event.target === qrSheet) {
      qrSheet.hidden = true;
    }
  });

  qrDownload?.addEventListener("click", () => {
    qrSheet.hidden = true;
  });
}

function renderGallery(index) {
  const len = GALLERY_IMAGES.length;
  activeGalleryIndex = ((index % len) + len) % len;
  const image = GALLERY_IMAGES[activeGalleryIndex];
  const mainImage = $("gallery-main-image");
  mainImage.src = image.src;
  mainImage.alt = image.alt;

  const modalImage = $("modal-image");
  modalImage.src = image.src;
  modalImage.alt = image.alt;

  const thumbs = document.querySelectorAll("#gallery-thumbs button");
  thumbs.forEach((btn, idx) => {
    btn.classList.toggle("active", idx === activeGalleryIndex);
  });
}

function initGallery() {
  const thumbWrap = $("gallery-thumbs");
  GALLERY_IMAGES.forEach((item, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-label", `${idx + 1}번 사진 보기`);
    const img = document.createElement("img");
    img.loading = "lazy";
    img.src = item.thumb;
    img.alt = item.alt;
    btn.append(img);
    btn.addEventListener("click", () => renderGallery(idx));
    thumbWrap.append(btn);
  });

  const openModal = () => {
    $("gallery-modal").hidden = false;
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    $("gallery-modal").hidden = true;
    document.body.style.overflow = "";
  };

  $("gallery-main").addEventListener("click", openModal);
  $("gallery-prev").addEventListener("click", () => renderGallery(activeGalleryIndex - 1));
  $("gallery-next").addEventListener("click", () => renderGallery(activeGalleryIndex + 1));
  $("modal-prev").addEventListener("click", () => renderGallery(activeGalleryIndex - 1));
  $("modal-next").addEventListener("click", () => renderGallery(activeGalleryIndex + 1));
  $("gallery-close").addEventListener("click", closeModal);
  $("gallery-modal").addEventListener("click", (event) => {
    if (event.target === $("gallery-modal")) {
      closeModal();
    }
  });

  let touchStartX = 0;
  let touchEndX = 0;
  const swipeArea = $("gallery-main-image");
  swipeArea.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0]?.clientX ?? 0;
  });
  swipeArea.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0]?.clientX ?? 0;
    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) < 30) {
      return;
    }
    renderGallery(delta > 0 ? activeGalleryIndex - 1 : activeGalleryIndex + 1);
  });

  renderGallery(0);
}

function initRSVP() {
  const form = $("rsvp-form");
  const feedback = $("rsvp-feedback");
  const submitButton = $("submit-rsvp");
  $("formOpenedAt").value = String(Date.now());

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const valid = validateRSVP(formData);
    if (!valid.ok) {
      setFeedback(feedback, valid.message, "error");
      return;
    }

    submitButton.disabled = true;
    setFeedback(feedback, "전송 중입니다...", "");

    try {
      const payload = makePayload(formData);
      await submitRSVP(payload);
      setFeedback(feedback, "참석 의사가 정상적으로 전달되었습니다. 감사합니다.", "success");
      form.reset();
      $("formOpenedAt").value = String(Date.now());
    } catch {
      setFeedback(feedback, "전송에 실패했습니다. 잠시 후 다시 시도해 주세요.", "error");
    } finally {
      submitButton.disabled = false;
    }
  });
}

function init() {
  initReveal();
  initAddressCopy();
  buildCalendarLinks();
  initDDay();
  initMapLinks();
  setupSimpleToggle("toggle-wreath", "wreath-panel");
  initGallery();
  initShare();
  initMusicControl();
  initBottomControls();
  initRSVP();
}

document.addEventListener("DOMContentLoaded", init);
