import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Blueprint} from 'src/app/services/blueprints/blueprint';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {

  @Input('fitContainerToParent')
  fitContainerToParent: boolean = false

  @Input('enableSettingsIcon')
  enableSettingsIcon: boolean = true

  @Input('borderSize')
  borderSize = 2

  @Input('width')
  width: number = 200

  @Input('height')
  height: number = 100

  @Input('blueprint')
  blueprint!: Blueprint

  constructor(private sanitizer: DomSanitizer, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    const bpIcon = this.sanitizer.bypassSecurityTrustUrl(this.blueprint.icon)
    this.blueprint.icon = bpIcon as string

    // setTimeout(() => {
    //   // this.blueprint.name = "Test"
    //   this.ref.detectChanges()
    // }, 3000)
  }

  onSettingsClicked(): void {
    console.log(this.blueprint.id, this.blueprint.name)
  }
}
