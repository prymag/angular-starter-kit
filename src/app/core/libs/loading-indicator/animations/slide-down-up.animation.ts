import { trigger, state, style, transition, group, animate } from '@angular/animations';

export const slideDownUp = [
  trigger('slideDownUp', [
    state('slideDown', style({
      top: '20px'
    })),
    state('slideUp', style({
      top: '-999px'
    })),
    transition('* => slideDown', animate('500ms ease-in-out')),
    transition('* => slideUp', animate('500ms ease-in-out'))
    /* state('slideDown', style({
      'max-height': '500px', 'opacity': '1', 'visibility': 'visible'
  })),
  state('slideUp', style({
      'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
  })),
  transition('in => out', [group([
      animate('400ms ease-in-out', style({
          'opacity': '0'
      })),
      animate('600ms ease-in-out', style({
          'max-height': '0px'
      })),
      animate('700ms ease-in-out', style({
          'visibility': 'hidden'
      }))
  ]
  )]),
  transition('out => in', [group([
      animate('1ms ease-in-out', style({
          'visibility': 'visible'
      })),
      animate('600ms ease-in-out', style({
          'max-height': '500px'
      })),
      animate('800ms ease-in-out', style({
          'opacity': '1'
      }))
  ]
  )]) */
]), // End
]