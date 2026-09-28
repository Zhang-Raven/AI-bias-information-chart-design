
class SoundManager {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  public async resume() {
    this.init();
    if (this.ctx?.state === 'suspended') {
      await this.ctx.resume();
    }
  }

  public playBling() {
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.playTone(1200, t, 0.1);
    this.playTone(1800, t + 0.12, 0.3);
    this.playTone(2400, t + 0.2, 0.1, 0.02);
  }

  public playExplosion() {
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, t);
    osc.frequency.exponentialRampToValueAtTime(10, t + 1);
    
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 1);

    this.playTone(800, t, 0.5, 0.1);
  }

  public playLink() {
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.playTone(2000, t, 0.1, 0.05);
    this.playTone(3000, t + 0.05, 0.2, 0.03);
  }

  private playTone(freq: number, time: number, duration: number, vol: number = 0.05) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine'; 
    osc.frequency.setValueAtTime(freq, time);
    
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(vol, time + 0.02); 
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration); 

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + duration);
  }
}

export const soundManager = new SoundManager();
