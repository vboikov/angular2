import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
	selector: '[appSearch]'
})
export class SearchDirective {
	@Input() appAudio: HTMLAudioElement;

	constructor(private el: ElementRef) {
	}

	@HostListener('click', ['$event'])
	onClick(event: MouseEvent) {
		const timeStamp = event.offsetX / this.el.nativeElement.offsetWidth;
		this.appAudio.currentTime = this.appAudio.duration * timeStamp;
	}
}
