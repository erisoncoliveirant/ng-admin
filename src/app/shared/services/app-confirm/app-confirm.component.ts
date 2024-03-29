import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
@Component({
  selector: 'app-app-confirm',
  templateUrl: './app-confirm.component.html',
})
export class AppConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<AppConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
