// Navbar scroll blur
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 80) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

// Hero image slider
const heroImage = document.getElementById("heroImage");
const bars = document.querySelectorAll(".bar");
const images = [
  "./img/hero.svg",
  "./img/form.svg",
  "./img/boka.svg"
];
let index = 0;
setInterval(() => {
  index = (index + 1) % images.length;
  heroImage.style.backgroundImage = `url('${images[index]}')`;
  // Fixed syntax
  bars.forEach((b, i) => b.classList.toggle("active", i === index));
}, 5000);

// Burger menu
const burger = document.getElementById("burger");
const navLinks = document.querySelector(".header__links"); // Barcha linklarni o'z ichiga olgan asosiy ul

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  navLinks.classList.toggle("menu-open"); // Toggle a class to show/hide menu
});

// **YANGI: Linkni bosganda menyuni yopish**
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    // Agar menyu ochiq bo'lsa, uni yopamiz
    if (navLinks.classList.contains("menu-open")) {
      burger.classList.remove("active");
      navLinks.classList.remove("menu-open");
    }
  });
});













 /**
     * ContactContainer — класс с методом bam()
     * bam() — переключает воспроизведение и анимацию.
     */
    class ContactContainer {
      constructor(rootEl) {
        this.root = rootEl;
        this.playBtn = this.root.querySelector('#playBtn');
        this.spotifyLogo = this.root.querySelector('#spotifyLogo');
        this.nowPlaying = this.root.querySelector('#nowPlaying');
        this.playBtnText = this.root.querySelector('#playBtnText');
        this.audio = document.getElementById('bgAudio');

        // bind
        this.playBtn.addEventListener('click', () => this.bam());
        // когда трек закончился — вернуть статус
        this.audio.addEventListener('ended', () => this._onEnded());
      }

      bam() {
        // если сейчас ставится на паузу -> воспроизвести, иначе поставить на паузу
        if (this.audio.paused) {
          this._play();
        } else {
          this._pause();
        }
      }

      _play() {
        // попытка воспроизвести
        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            this.spotifyLogo.classList.add('playing');
            this.playBtn.setAttribute('aria-pressed','true');
            this.playBtnText.textContent = 'Pause';
            this.nowPlaying.textContent = 'Playing — Jingle bells';
          }).catch((err) => {
            console.warn('Playback prevented:', err);
            // если autoplay блокируется — попросим пользователя кликнуть ещё раз
            this.nowPlaying.textContent = 'Click to allow playback';
          });
        } else {
          // старые браузеры
          this.spotifyLogo.classList.add('playing');
          this.playBtn.setAttribute('aria-pressed','true');
          this.playBtnText.textContent = 'Pause';
          this.nowPlaying.textContent = 'Playing';
        }
      }

      _pause() {
        this.audio.pause();
        this.spotifyLogo.classList.remove('playing');
        this.playBtn.setAttribute('aria-pressed','false');
        this.playBtnText.textContent = 'Play on Spotify';
        this.nowPlaying.textContent = 'Paused';
      }

      _onEnded() {
        // вернуть в исходное состояние
        this.spotifyLogo.classList.remove('playing');
        this.playBtn.setAttribute('aria-pressed','false');
        this.playBtnText.textContent = 'Play on Spotify';
        this.nowPlaying.textContent = 'Stopped';
      }
    }

    // Инициализация:
    document.addEventListener('DOMContentLoaded', () => {
      const container = new ContactContainer(document.getElementById('contact-root'));

      // Можно получить ссылку на экземпляр, если нужно из консоли:
      window.contactContainer = container;
    });