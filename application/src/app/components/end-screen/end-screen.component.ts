import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.scss'],
})
export class EndScreenComponent implements OnInit {
  points: number = 0;
  incorrectQuestions: number[] = [];


  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.points = this.activatedRoute.snapshot.params['points'];
    this.incorrectQuestions = this.activatedRoute.snapshot.params['incorrectQuestions'];
  }


  backToHome(): void {
    this.router.navigate(['']);
  }
}
