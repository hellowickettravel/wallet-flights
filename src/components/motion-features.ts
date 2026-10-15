// Loaded after hydration by MotionProvider's LazyMotion, so the animation
// engine (including layout animations: the trip-type pill and deal filters)
// stays out of the first JavaScript every page needs.
import { domMax } from "motion/react";

export default domMax;
