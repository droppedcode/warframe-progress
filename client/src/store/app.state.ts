import { NavigationState } from './state/core/navigation';
import { UserState } from './state/core/user';

export interface IAppState {
  navigation: NavigationState;
  user: UserState;
}
