import { Injectable } from '@angular/core';

@Injectable()
export class CopierService {
  private textarea: HTMLTextAreaElement | undefined | null;

  copyText(text: string): boolean {
    this.createTextareaAndSelect(text);

    const copySuccessful = document.execCommand('copy');
    this.removeFake();

    return copySuccessful;
  }

  private createTextareaAndSelect(text: string) {
    this.textarea = document.createElement('textarea');

    this.textarea.style.fontSize = '12pt';

    this.textarea.classList.add('cdk-visually-hidden');

    const yPosition = window.pageYOffset || document.documentElement.scrollTop;
    this.textarea.style.top = yPosition + 'px';

    this.textarea.setAttribute('readonly', '');
    this.textarea.value = text;

    document.body.appendChild(this.textarea);

    this.textarea.select();
    this.textarea.setSelectionRange(0, this.textarea.value.length);
  }

  private removeFake() {
    if (this.textarea) {
      document.body.removeChild(this.textarea);
      this.textarea = null;
    }
  }
}
