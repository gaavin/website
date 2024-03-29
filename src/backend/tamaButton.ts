import { broadcastMessage } from "../pages/api/events";
import { tamaTalk } from "./tamaTalk";

// opt out of prerendering
export const prerender = false;

type Button = "A" | "B" | "C";
type Buttons = Record<Button, number | null>;

const buttons: Buttons = {
  A: null,
  B: null,
  C: null,
};

export const buttonPress = (button: Button) => {
  const timer = +setTimeout(() => {
    buttons[button] = null;
    broadcastMessage(`${button}-release`);
  }, 500);

  if (buttons[button]) {
    clearTimeout(buttons[button]!);
  }

  buttons[button] = timer;

  broadcastMessage(`${button}-press`);
  tamaTalk(button);
};
