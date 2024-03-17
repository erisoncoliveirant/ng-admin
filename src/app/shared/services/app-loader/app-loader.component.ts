import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './app-loader.component.html',
  styleUrls: ['./app-loader.component.scss'],
})
export class AppLoaderComponent implements OnInit {
  title: any;
  message: any;

  constructor(public dialogRef: MatDialogRef<AppLoaderComponent>) {}

  ngOnInit(): void {}
}
