import { HomeState } from "../Screens/Home/Home.codebehind"
import { AuthState } from "../Services/Auth/Auth.codebehind"
import { HeaderBarState } from '../Containers/HeaderBar/HeaderBar.codebehind';
import { SplashState } from '../Screens/Splash/Splash.codebehind';
import { EntityState } from '../Services/Entity/Entity.codebehind';
//!!nextstateimport


export const Home_Update = 'Home_Update'
export const Auth_Update = 'Auth_Update'
export const HeaderBar_Update = 'HeaderBar_Update';
export const Splash_Update = 'Splash_Update';
export const Entity_Update = 'Entity_Update';
//!!nextdefinition


export interface Home_Update_Action { type: typeof Home_Update, payload: HomeState}
export interface Auth_Update_Action { type: typeof Auth_Update, payload: AuthState}
export interface HeaderBar_Update_Action { type: typeof HeaderBar_Update, payload: HeaderBarState}
export interface Splash_Update_Action { type: typeof Splash_Update, payload: SplashState}
export interface Entity_Update_Action { type: typeof Entity_Update, payload: EntityState}
//!!nextactiontype
