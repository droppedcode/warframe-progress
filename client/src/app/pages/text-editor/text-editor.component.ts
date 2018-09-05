import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, ElementRef, HostListener, OnDestroy, Inject } from '@angular/core';
import { AppContext } from '../../app.context';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'wfp-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextEditorComponent implements OnInit {
  title: string;
  text: string;

  constructor(private context: AppContext, private change: ChangeDetectorRef, private dialog: MatDialogRef<TextEditorComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.text = data.text;
  }

  ngOnInit() {
  }

  ok() {
    this.dialog.close(this.text);
  }

}
