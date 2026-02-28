const RSVP_ENDPOINT = "";
const MIN_SUBMIT_MS = 1500;

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
      threshold: 0.18,
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
    return { ok: false, message: "입력 내용을 다시 확인 후 제출해 주세요." };
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
  const text = "서울시 강남구 테헤란로 123";
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(text);
      setFeedback(feedback, "주소가 복사되었습니다.", "success");
    } catch {
      setFeedback(feedback, "복사에 실패했습니다. 수동으로 복사해 주세요.", "error");
    }
  });
}

function buildCalendarLinks() {
  const title = "민준 & 서연 결혼식";
  const details = "라온웨딩홀 3층 그랜드홀에서 뵙겠습니다.";
  const location = "서울시 강남구 테헤란로 123";
  const start = "20261031T033000Z";
  const end = "20261031T053000Z";

  const googleUrl = new URL("https://calendar.google.com/calendar/render");
  googleUrl.searchParams.set("action", "TEMPLATE");
  googleUrl.searchParams.set("text", title);
  googleUrl.searchParams.set("dates", `${start}/${end}`);
  googleUrl.searchParams.set("details", details);
  googleUrl.searchParams.set("location", location);

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//KR",
    "BEGIN:VEVENT",
    "UID:wedding-invitation-20261031@example.com",
    "DTSTAMP:20260101T000000Z",
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${details}`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const googleLink = $("google-calendar");
  googleLink.href = googleUrl.toString();

  const icalLink = $("ical-download");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  icalLink.href = URL.createObjectURL(blob);
}

function initGiftPanel() {
  const toggle = $("toggle-gift");
  const panel = $("gift-panel");
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
    title: "민준 & 서연 결혼식",
    text: "모바일 청첩장으로 초대드립니다.",
    url: window.location.href,
  };

  shareBtn.addEventListener("click", async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setFeedback(feedback, "공유가 완료되었습니다.", "success");
      } catch {
        if (error instanceof Error && error.name !== "AbortError") {
          setFeedback(feedback, "공유 중 문제가 발생했습니다.", "error");
        }
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setFeedback(feedback, "공유 기능 미지원 기기입니다. 링크를 복사했습니다.", "success");
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
  button.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
        button.textContent = "음악 정지";
        button.setAttribute("aria-pressed", "true");
      } catch {
        button.textContent = "재생 실패 - 다시 시도";
      }
      return;
    }

    audio.pause();
    button.textContent = "음악 재생";
    button.setAttribute("aria-pressed", "false");
  });
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
  initGiftPanel();
  initShare();
  initMusicControl();
  initRSVP();
}

document.addEventListener("DOMContentLoaded", init);
