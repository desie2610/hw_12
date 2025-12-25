class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.timerRef = document.querySelector(selector);
    this.targetDate = targetDate;

    this.daysEl = this.timerRef.querySelector('[data-value="days"]');
    this.hoursEl = this.timerRef.querySelector('[data-value="hours"]');
    this.minsEl = this.timerRef.querySelector('[data-value="mins"]');
    this.secsEl = this.timerRef.querySelector('[data-value="secs"]');

    this.start();
  }

  start() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const time = this.targetDate - currentTime;

      if (time <= 0) {
        clearInterval(this.intervalId);
        this.updateTimer(0, 0, 0, 0);
        return;
      }

      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const mins = Math.floor(
        (time % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secs = Math.floor(
        (time % (1000 * 60)) / 1000
      );

      this.updateTimer(days, hours, mins, secs);
    }, 1000);
  }

  updateTimer(days, hours, mins, secs) {
    this.daysEl.textContent = days;
    this.hoursEl.textContent = this.pad(hours);
    this.minsEl.textContent = this.pad(mins);
    this.secsEl.textContent = this.pad(secs);
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const nextNewYear = new Date(
  new Date().getFullYear() + 1,
  0,
  1,
  0,
  0,
  0
);

new CountdownTimer({
  selector: '#timer-1',
  targetDate: nextNewYear,
});