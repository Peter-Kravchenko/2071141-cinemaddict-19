import { remove, render, replace } from '../framework/render';


export const renderUpdateComponent = (container, component, prevComponent) => {
  if (prevComponent === null) {
    render(component, container);
    return;
  }

  if (container.contains(prevComponent.element)) {
    replace(component, prevComponent);
  }

  remove(prevComponent);
};
