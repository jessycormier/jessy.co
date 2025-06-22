import { ComponentState } from '../enums/component-state.enum';

/**
 * An interface to describe stateful components.
 */
export interface StatefulComponent {
  state: ComponentState;
}
