export const popperSameWidth = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }: any) => {
    state.styles.popper.width = `${state.rects.reference.width}px`
  },
  effect: ({ state }: any) => {
    state.elements.popper.style.width = `${state.elements.reference.offsetWidth
    }px`
  }
}


export const popperCenterModifier = {
  name: 'computeStyles',
  enabled: true,
  fn({ state }: any) {
    const {
      rects: {
        reference: { width: rW, height: rH, x: rX, y: rY },
        popper: { width: pW, height: pH }
      }
    } = state
    state.styles.popper = {
      ...state.styles.popper,
      position: 'fixed',
      left: `${rX + (rW - pW) * 0.5}px`,
      top: `${rY + (rH - pH) * 0.5}px`
    }

    return state
  }
}
