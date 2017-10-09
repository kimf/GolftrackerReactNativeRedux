export function selectItem(model, id) {
  return { type: 'SELECT_ITEM', model, id }
}

export function deSelectItem(model) {
  return { type: 'DE_SELECT_ITEM', model }
}
