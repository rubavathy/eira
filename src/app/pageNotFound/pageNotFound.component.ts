import { ViewChildren } from '@angular/core';
import { ElementRef } from '@angular/core';
import { QueryList } from '@angular/core';
import { Component, OnInit } from '@angular/core';
// import * as anime from 'animejs';

@Component({
  selector: 'app-pageNotFound',
  templateUrl: './pageNotFound.component.html',
  styleUrls: ['./pageNotFound.component.css']
})
export class PageNotFoundComponent implements OnInit {

  @ViewChildren('star') components:QueryList<any>;

  constructor() { }

  ngAfterViewInit() {
    console.log(this.components.toArray());

    let starList = this.components.toArray();

    for (const star of starList) {
      star.nativeElement.style.animationDelay = Math.random() * 5 + 's';
    }
  }
  ngOnInit() {
    // const paths = document.querySelectorAll('path.star');
    // for (let i = 0; i < paths.length; i++) {
    //   let delay = Math.random() * i
    //   paths[i].style.animationDelay = delay + 's'
    //  }

    // anime({
    //   targets: 'path.error',
    //   strokeDashoffset: [anime.setDashoffset, 0],
    //   easing: 'easeInOutSine',
    //   duration: 1500,
    //   direction: 'alternate',
    //   loop: true
    // })


  }

}
